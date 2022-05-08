package com.cardiored.cardio.service;

import com.cardiored.cardio.domain.User;
import com.cardiored.cardio.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;

@Service
@RequiredArgsConstructor
public class UserService {
    private final UserRepository userRepository;

    public User findUserByLoginAndPassword(User user){
        return userRepository.findUserByLoginAndPassword(user.getLogin(), user.getPassword());
    }

    public User findById(Integer id){
        return userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found"));
    }

    @Transactional
    public User save(User user){
        return userRepository.save(user);
    }

    public void delete(Integer id){
        userRepository.delete(findById(id));
    }

    public void replace(User user){
        User savedUser = findById(user.getId());
        User user1 = savedUser;
        user1.setId(savedUser.getId());
        userRepository.save(user1);
    }
}
