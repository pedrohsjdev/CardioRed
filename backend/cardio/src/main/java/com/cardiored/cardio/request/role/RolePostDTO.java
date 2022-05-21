package com.cardiored.cardio.request.role;


import lombok.Data;

import javax.validation.constraints.NotEmpty;

@Data
public class RolePostDTO {
    @NotEmpty(message = "login cannot be empty")
    private String name;
<<<<<<< HEAD
}
=======
}
>>>>>>> 447b55fba1d84e53265b9195aa0d01ef187db91d
