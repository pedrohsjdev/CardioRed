package com.cardiored.cardio.request.residente;

import javax.persistence.PrimaryKeyJoinColumn;

import com.cardiored.cardio.request.medico.MedicoPostDTO;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@PrimaryKeyJoinColumn(name="medicoId")
public class ResidentePostDTO extends MedicoPostDTO {
    private Integer residencyYear;
}
