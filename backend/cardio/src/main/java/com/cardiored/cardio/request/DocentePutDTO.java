package com.cardiored.cardio.request;

import javax.persistence.PrimaryKeyJoinColumn;

import com.cardiored.cardio.domain.Titulation;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@PrimaryKeyJoinColumn(name="medicoId")
public class DocentePutDTO extends MedicoPutDTO {
    private Titulation titulation;
}
