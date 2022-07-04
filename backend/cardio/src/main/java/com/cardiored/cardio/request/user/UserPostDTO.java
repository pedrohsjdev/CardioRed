package com.cardiored.cardio.request.user;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

import java.util.ArrayList;
import java.util.Collection;

import javax.validation.constraints.NotEmpty;

import com.cardiored.cardio.domain.Role;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class UserPostDTO {
    @NotEmpty(message = "login cannot be empty")
    private String username;

    @NotEmpty(message = "password cannot be empty")
    private String password;

    private Collection<Role> roles = new ArrayList<>();
}
