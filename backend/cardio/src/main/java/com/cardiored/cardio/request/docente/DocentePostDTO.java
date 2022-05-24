package com.cardiored.cardio.request.docente;

import javax.persistence.PrimaryKeyJoinColumn;

import com.cardiored.cardio.domain.Titulation;

import com.cardiored.cardio.request.medico.MedicoPostDTO;
import lombok.Getter;
import lombok.Setter;
import lombok.experimental.SuperBuilder;

@Getter
@Setter
@SuperBuilder
@PrimaryKeyJoinColumn(name="medicoId")
public class DocentePostDTO extends MedicoPostDTO {
    private Titulation titulation;
}
