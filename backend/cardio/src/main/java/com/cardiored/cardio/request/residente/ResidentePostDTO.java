package com.cardiored.cardio.request.residente;

import javax.persistence.PrimaryKeyJoinColumn;

import com.cardiored.cardio.request.medico.MedicoPostDTO;
import lombok.Getter;
import lombok.Setter;
import lombok.experimental.SuperBuilder;

@Getter
@Setter
@SuperBuilder
@PrimaryKeyJoinColumn(name="medicoId")
public class ResidentePostDTO extends MedicoPostDTO {
    private Integer residencyYear;
}
