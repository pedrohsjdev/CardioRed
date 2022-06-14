package com.cardiored.cardio.request.laudo;

import com.cardiored.cardio.domain.*;
import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Data;
import org.springframework.format.annotation.DateTimeFormat;

import javax.persistence.*;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import java.time.LocalDate;
import java.util.Date;

@Data
public class LaudoPostDTO {
    @NotEmpty(message = "resultPath cannot be empty")
    private String resultPath;

    @NotNull
    @Temporal(TemporalType.TIMESTAMP)
    private Date dateTime;

    @NotNull
    private ExamType examType;

    @NotEmpty(message = "description cannot be empty")
    private String description;

    @NotEmpty(message = "conclusion cannot be empty")
    @Column(length = 20)
    private String conclusion;

    @NotNull
    private Status status;

    @NotNull
    @ManyToOne
    @JoinColumn(name = "medicoId")
    private Medico medico;

    @NotNull
    @ManyToOne
    @JoinColumn(name = "pacienteId")
    private Paciente paciente;
}
