package com.cardiored.cardio.request.paciente;

import com.cardiored.cardio.domain.Ethnicity;
import com.cardiored.cardio.domain.Gender;
import com.fasterxml.jackson.annotation.JsonFormat;

import org.springframework.format.annotation.DateTimeFormat;

import lombok.Data;

import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import java.time.LocalDate;

@Data
public class PacientePostDTO {
    @NotEmpty(message = "cpf cannot be empty")
    private String cpf;

    @NotEmpty(message = "name cannot be empty")
    private String name;

    @NotNull(message = "gender cannot be empty")
    private Gender gender;

    @NotNull(message = "ethnicity cannot be null")
    private Ethnicity ethnicity;

    @NotNull(message = "birthDate cannot be null")
    @JsonFormat(pattern = "dd/MM/yyyy")
    @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) 
    private LocalDate birthDate;
}
