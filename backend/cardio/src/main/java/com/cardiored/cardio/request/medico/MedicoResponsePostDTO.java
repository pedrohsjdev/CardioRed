package com.cardiored.cardio.request.medico;

import com.cardiored.cardio.domain.DoctorType;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class MedicoResponsePostDTO {
    private Integer id;
    private String crm;
    private String name;
    private DoctorType doctorType;
}
