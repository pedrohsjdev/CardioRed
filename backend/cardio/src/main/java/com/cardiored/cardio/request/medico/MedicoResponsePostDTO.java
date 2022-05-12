package com.cardiored.cardio.request.medico;

import com.cardiored.cardio.domain.DoctorType;

import lombok.Data;

@Data
public class MedicoResponsePostDTO {
    private Integer id;
    private String crm;
    private String name;
    private DoctorType doctorType;  
}
