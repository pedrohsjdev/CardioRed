package com.cardiored.cardio.domain;

import javax.persistence.Entity;
import javax.persistence.PrimaryKeyJoinColumn;
import javax.validation.constraints.NotNull;

import lombok.Getter;
import lombok.Setter;
import lombok.experimental.SuperBuilder;

@Getter
@Setter
@SuperBuilder
@Entity
@PrimaryKeyJoinColumn(name="medicoId")
public class Residente extends Medico {
    @NotNull
    private Integer residencyYear;
}
