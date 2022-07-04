package com.cardiored.cardio.request.consulta;

import java.util.Date;

import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import javax.validation.constraints.NotNull;

import org.springframework.format.annotation.DateTimeFormat;

import com.cardiored.cardio.domain.ConsultaStatus;
import com.cardiored.cardio.domain.Disease;
import com.cardiored.cardio.domain.ExamType;
import com.cardiored.cardio.domain.Medico;
import com.cardiored.cardio.domain.Paciente;
import com.fasterxml.jackson.annotation.JsonFormat;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class ConsultaPostDTO {
    @NotNull(message = "DateTime cannot be null.")
    @JsonFormat(pattern = "dd/MM/yyyy - HH:mm")
    @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME)
    @Temporal(TemporalType.TIMESTAMP)
    private Date dateTime;

    @NotNull(message = "ExamType cannot be null.")
    @Enumerated(EnumType.STRING)
    private ExamType examType;

    @NotNull(message = "Consulta status cannot be null.")
    @Enumerated(EnumType.STRING)
    private ConsultaStatus status;

    @NotNull(message = "DiagnosticAssumption cannot be empty.")
    private Disease diagnosticAssumption;

    @NotNull(message = "Medico username cannot be null.")
    private Medico medico;

    @NotNull(message = "Paciente cannot be null.")
    private Paciente paciente;
}
