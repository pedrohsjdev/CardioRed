package com.cardiored.cardio.service;

import com.cardiored.cardio.domain.User;
import com.cardiored.cardio.mapper.UserMapper;
import com.cardiored.cardio.repository.UserRepository;
import com.cardiored.cardio.request.user.UserPostDTO;
import com.cardiored.cardio.request.user.UserPutDTO;
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
    public void save(UserPostDTO userPostDTO){
         userRepository.save(
                UserMapper.INSTANCE.toUser(userPostDTO)
        );
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
}
