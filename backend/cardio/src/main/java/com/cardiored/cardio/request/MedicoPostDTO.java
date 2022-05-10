package com.cardiored.cardio.request;

import javax.persistence.Inheritance;
import javax.validation.constraints.NotEmpty;

import com.cardiored.cardio.domain.DoctorType;
import com.cardiored.cardio.domain.User;

import lombok.Data;

@Data
@Inheritance
public class MedicoPostDTO {
    @NotEmpty(message = "CRM cannot be empty!")
    private String crm;

    @NotEmpty(message = "Medico name cannot be empty!")
    private String name;

    private DoctorType doctorType;
    
    private User user;
}
