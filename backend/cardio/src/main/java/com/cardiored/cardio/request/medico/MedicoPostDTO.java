package com.cardiored.cardio.request.medico;

import javax.persistence.Inheritance;
import javax.validation.constraints.NotEmpty;

import com.cardiored.cardio.domain.DoctorType;
import com.cardiored.cardio.domain.User;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;
import lombok.experimental.SuperBuilder;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
@ToString
@Inheritance
@SuperBuilder
public class MedicoPostDTO {
    @NotEmpty(message = "CRM cannot be empty!")
    private String crm;

    @NotEmpty(message = "Medico name cannot be empty!")
    private String name;

    private DoctorType doctorType;

    private User user;
}
