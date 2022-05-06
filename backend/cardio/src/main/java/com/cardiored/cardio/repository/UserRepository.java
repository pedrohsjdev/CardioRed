package com.cardiored.cardio.repository;

import com.cardiored.cardio.domain.User;
import org.hibernate.usertype.UserType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<User, Integer> {
    User findUserByLoginAndPassword(String login, String pass);
    
    UserType findUserTypeByLogin(String login);
}
