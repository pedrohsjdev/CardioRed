package com.cardiored.cardio.service;

import com.cardiored.cardio.domain.Role;
import com.cardiored.cardio.domain.User;
import com.cardiored.cardio.mapper.UserMapper;
import com.cardiored.cardio.repository.RoleRepository;
import com.cardiored.cardio.repository.UserRepository;
import com.cardiored.cardio.request.user.UserPostDTO;
import com.cardiored.cardio.request.user.UserPutDTO;

import lombok.RequiredArgsConstructor;

import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Collection;

import javax.transaction.Transactional;

@Service
@RequiredArgsConstructor
@Transactional
public class UserService implements UserDetailsService {
    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private final PasswordEncoder passwordEncoder;

    public User findByUsername(String username){
        return userRepository.findByUsername(username);
    }

    public User findById(Integer id){
        return userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found"));
    }

    public void save(UserPostDTO userPostDTO){
        userRepository.save(
                UserMapper.INSTANCE.toUser(userPostDTO)
        );
    }

    public void save(User user){
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        userRepository.save(user);
    }

    public Role saveRole(Role role) {
        return roleRepository.save(role);
    }

    public void addRoleToUser(String username, String roleName) {
        User user = userRepository.findByUsername(username);
        Role role = roleRepository.findByName(roleName);
        user.getRoles().add(role);
    }

    public void delete(Integer id){
        userRepository.delete(findById(id));
    }

    public void replace(UserPutDTO userPutDTO){
        User savedUser = findById(userPutDTO.getId());
        User user = UserMapper.INSTANCE.toUser(userPutDTO);
        user.setId(savedUser.getId());
        userRepository.save(user);
    }

    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user = userRepository.findByUsername(username);
        if(user == null) {
            throw new UsernameNotFoundException("User not found in the database");
        }

        Collection<SimpleGrantedAuthority> authorities = new ArrayList<>();
        user.getRoles().forEach(role -> {
            authorities.add(new SimpleGrantedAuthority(role.getName()));
        });

        return new org.springframework.security.core.userdetails.User(user.getUsername(), user.getPassword(), authorities);
    }

}
