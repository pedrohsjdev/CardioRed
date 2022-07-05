package com.cardiored.cardio.request.role;

import lombok.AllArgsConstructor;
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
public class RolePutDTO {

    @NotNull(message = "id cannot be null")
    private Integer id;

    @NotEmpty(message = "name cannot be empty")
    private String name;

}
