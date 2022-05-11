package com.cardiored.cardio.request.paciente;

import com.cardiored.cardio.domain.Ethnicity;
import com.cardiored.cardio.domain.Gender;
import lombok.Data;

import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import java.time.LocalDate;

@Data
public class PacientePutDTO {

    @NotNull(message = "id cannot be null")
    private Integer id;

    @NotEmpty(message = "cpf cannot be empty")
    private String cpf;

    @NotEmpty(message = "nome cannot be empty")
    private String name;

    @NotNull(message = "gender cannot be empty")
    private Gender gender;

    @NotNull(message = "ethnicity cannot be null")
    private Ethnicity ethnicity;

    @NotNull(message = "birthDate cannot be null")
    private LocalDate birthDate;
}
