package com.cardiored.cardio.request.role;

import lombok.Data;
import javax.validation.constraints.NotEmpty;

@Data
public class RolePostDTO {
    @NotEmpty(message = "login cannot be empty")
    private String name;
}