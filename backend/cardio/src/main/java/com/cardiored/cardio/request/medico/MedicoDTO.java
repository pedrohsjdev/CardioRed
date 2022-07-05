package com.cardiored.cardio.request.medico;

import javax.validation.constraints.NotEmpty;

import com.cardiored.cardio.domain.DoctorType;
import com.cardiored.cardio.domain.Titulation;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class MedicoDTO {
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
