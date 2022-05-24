package com.cardiored.cardio.request.residente;

import javax.persistence.PrimaryKeyJoinColumn;

import com.cardiored.cardio.request.medico.MedicoPutDTO;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@PrimaryKeyJoinColumn(name="medicoId")
public class ResidentePutDTO extends MedicoPutDTO {
    private Integer residencyYear;
}
