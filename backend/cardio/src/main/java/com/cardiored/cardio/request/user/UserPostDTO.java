package com.cardiored.cardio.request.user;

import lombok.Data;

import java.util.ArrayList;
import java.util.Collection;

import javax.validation.constraints.NotEmpty;

import com.cardiored.cardio.domain.Role;


@Data
public class UserPostDTO {
    @NotEmpty(message = "login cannot be empty")
    private String username;

    @NotEmpty(message = "password cannot be empty")
    private String password;

    private Collection<Role> roles = new ArrayList<>();
}
