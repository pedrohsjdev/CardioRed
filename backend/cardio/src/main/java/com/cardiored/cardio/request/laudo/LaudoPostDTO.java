package com.cardiored.cardio.request.laudo;

import com.cardiored.cardio.domain.*;
import com.fasterxml.jackson.annotation.JsonFormat;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

import javax.persistence.*;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;

import org.springframework.format.annotation.DateTimeFormat;

import java.util.Date;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class LaudoPostDTO {
    @NotEmpty(message = "Results cannot be empty")
    private String results;

    @NotNull
    @JsonFormat(pattern = "dd/MM/yyyy - HH:mm")
    @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME)
    @Temporal(TemporalType.TIMESTAMP)
    private Date dateTime;

    @NotNull
    private ExamType examType;

    @NotNull
    private LaudoStatus status;

    @NotEmpty(message = "description cannot be empty")
    private String description;

    @NotNull
    private Disease conclusion;

    @NotNull
    @ManyToOne
    @JoinColumn(name = "medicoId")
    private Medico medico;

    @NotNull
    @ManyToOne
    @JoinColumn(name = "pacienteId")
    private Paciente paciente;

    @NotNull
    @OneToOne
    @JoinColumn(name = "consultaId")
    private Consulta consulta;
}
