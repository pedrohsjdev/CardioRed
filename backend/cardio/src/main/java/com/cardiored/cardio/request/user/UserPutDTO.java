package com.cardiored.cardio.request.user;


import lombok.Data;

import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;

@Data
public class UserPutDTO {

    @NotNull(message = "id cannot be null")
    private Integer id;

    @NotEmpty(message = "login cannot be empty")
    private String username;

    @NotEmpty(message = "password cannot be empty")
    private String password;

}