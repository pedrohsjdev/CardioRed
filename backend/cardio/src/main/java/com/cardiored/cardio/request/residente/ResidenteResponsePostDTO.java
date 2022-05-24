package com.cardiored.cardio.request.residente;

import javax.persistence.PrimaryKeyJoinColumn;

import com.cardiored.cardio.request.medico.MedicoResponsePostDTO;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@PrimaryKeyJoinColumn(name="medicoId")
public class ResidenteResponsePostDTO extends MedicoResponsePostDTO {
    private Integer residencyYear;
}
