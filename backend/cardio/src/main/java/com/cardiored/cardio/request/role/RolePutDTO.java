package com.cardiored.cardio.request.role;


import lombok.Data;

import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;

@Data
public class RolePutDTO {

    @NotNull(message = "id cannot be null")
    private Integer id;

    @NotEmpty(message = "name cannot be empty")
    private String name;

}