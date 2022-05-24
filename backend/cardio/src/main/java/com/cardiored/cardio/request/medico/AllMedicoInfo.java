package com.cardiored.cardio.request.medico;

import javax.validation.constraints.NotEmpty;

import com.cardiored.cardio.domain.DoctorType;
import com.cardiored.cardio.domain.Titulation;

import lombok.Data;

@Data
public class AllMedicoInfo {  
    private Integer id;
      
    @NotEmpty(message = "CRM cannot be empty!")
    private String crm;

    @NotEmpty(message = "Medico name cannot be empty!")
    private String name;

    private DoctorType doctorType;
    
    private Integer residencyYear;

    private Titulation titulation;
    
    private String password;
    
}
