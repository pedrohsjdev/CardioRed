package com.cardiored.cardio.request.docente;

import javax.persistence.PrimaryKeyJoinColumn;

import com.cardiored.cardio.domain.Titulation;

import com.cardiored.cardio.request.medico.MedicoPostDTO;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@PrimaryKeyJoinColumn(name="medicoId")
public class DocentePostDTO extends MedicoPostDTO {
    private Titulation titulation;
}
