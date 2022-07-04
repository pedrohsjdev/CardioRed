package com.cardiored.cardio.request.user;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class UserPutDTO {

    @NotNull(message = "id cannot be null")
    private Integer id;

    @NotEmpty(message = "login cannot be empty")
    private String username;

    @NotEmpty(message = "password cannot be empty")
    private String password;

}
