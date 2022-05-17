package com.cardiored.cardio;

import java.util.ArrayList;

import com.cardiored.cardio.domain.Role;
import com.cardiored.cardio.domain.User;
import com.cardiored.cardio.service.UserService;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

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

            userService.save(new User(null, "Rafael", "1234", new ArrayList<>()));
            userService.save(new User(null, "Felipe", "1234", new ArrayList<>()));
            userService.save(new User(null, "Lucas", "1234", new ArrayList<>()));

            userService.addRoleToUser("Rafael", "ROLE_ADM");
            userService.addRoleToUser("Rafael", "ROLE_MEDICO");
            userService.addRoleToUser("Rafael", "ROLE_RESIDENTE");
            userService.addRoleToUser("Rafael", "ROLE_DOCENTE");

            userService.addRoleToUser("Felipe", "ROLE_MEDICO");
            userService.addRoleToUser("Lucas", "ROLE_RESIDENTE");
        };
    }

}
