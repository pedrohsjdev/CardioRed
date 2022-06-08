package com.cardiored.cardio.domain;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.time.LocalDate;
import java.util.Date;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Builder
public class Laudo {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @NotNull
    private String resultPath;

    @NotNull
    @Temporal(TemporalType.TIMESTAMP)
    private Date dateTime;

    @NotNull
    private ExamType examType;

    @NotNull
    private String description;

    @NotNull
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
