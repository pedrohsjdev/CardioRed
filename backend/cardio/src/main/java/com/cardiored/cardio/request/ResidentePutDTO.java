package com.cardiored.cardio.request;

import javax.persistence.PrimaryKeyJoinColumn;

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
