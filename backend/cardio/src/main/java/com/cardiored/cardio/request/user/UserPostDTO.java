package com.cardiored.cardio.request.user;

import com.cardiored.cardio.domain.UserType;
import lombok.Data;

import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;

@Data
public class UserPostDTO {
    @NotEmpty(message = "login cannot be empty")
    private String login;

    @NotEmpty(message = "password cannot be empty")
    private String password;

    @NotNull(message = "userType cannot be null")
    private UserType userType;
}
