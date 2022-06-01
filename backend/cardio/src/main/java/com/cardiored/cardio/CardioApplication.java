package com.cardiored.cardio;

import com.cardiored.cardio.domain.Role;
import com.cardiored.cardio.domain.User;
import com.cardiored.cardio.service.UserService;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.ArrayList;

@SpringBootApplication
public class CardioApplication {

    public static void main(String[] args) {    
        SpringApplication.run(CardioApplication.class, args);
    }

    @Bean
    PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    CommandLineRunner run(UserService userService) {
        return args -> {
            userService.saveRole(new Role(null, "ROLE_ADM"));
            userService.saveRole(new Role(null, "ROLE_MEDICO"));
            userService.saveRole(new Role(null, "ROLE_RESIDENTE"));
            userService.saveRole(new Role(null, "ROLE_DOCENTE"));

            userService.save(new User(null, "admin", "0000", new ArrayList<>()));
            userService.addRoleToUser("admin", "ROLE_ADM");
        };
    }


}
