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

import lombok.Data;

@Data
public class ConsultaPutDTO {
    @NotNull(message = "Id cannot be null.")
    private Integer id;

    @NotNull(message = "Date and time cannot be null.")
    @JsonFormat(pattern = "dd/MM/yyyy - HH:mm")
    @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME)
    @Temporal(TemporalType.TIMESTAMP)
    private Date dateTime;

    @NotNull(message = "Exam type cannot be null.")
    @Enumerated(EnumType.STRING)
    private ExamType examType;

    @NotNull(message = "Consulta status cannot be null.")
    @Enumerated(EnumType.STRING)
    private ConsultaStatus status;

    @NotNull(message = "Diagnostic assumption cannot be empty.")
    private Disease diagnosticAssumption;

    @NotNull(message = "Medico id cannot be null.")
    private Medico medico;

    @NotNull(message = "Paciente id cannot be null.")
    private Paciente paciente;
}
