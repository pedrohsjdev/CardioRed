package com.cardiored.cardio.domain;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.PrimaryKeyJoinColumn;

import lombok.experimental.SuperBuilder;

@SuperBuilder
@Entity
@PrimaryKeyJoinColumn(name="medicoId")
public class Docente extends Medico{
    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Titulation titulation;
}
