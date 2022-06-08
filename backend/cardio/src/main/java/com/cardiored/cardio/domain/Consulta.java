package com.cardiored.cardio.domain;

import java.time.LocalDate;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.validation.constraints.NotNull;

import org.springframework.format.annotation.DateTimeFormat;

import com.fasterxml.jackson.annotation.JsonFormat;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.Builder;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Builder
public class Consulta {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @NotNull
    @JsonFormat(pattern = "dd/MM/yyyy")
    @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) 
    private LocalDate date;

    @NotNull
    @Enumerated(EnumType.STRING)
    private ExamType examType;

    @NotNull
    @Column(length = 20)
    private String diagnosticAssumption;

    @NotNull
    @ManyToOne
    private Medico medico;

    @NotNull
    @ManyToOne
    private Paciente paciente;  
}
