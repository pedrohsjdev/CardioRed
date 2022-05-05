package com.cardiored.cardio.domain;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.PrimaryKeyJoinColumn;

import lombok.experimental.SuperBuilder;

@SuperBuilder
@Entity
@PrimaryKeyJoinColumn(name="medicoId")
public class Residente extends Medico {
    @Column(nullable = false)
    private Integer residencyYear;
}
