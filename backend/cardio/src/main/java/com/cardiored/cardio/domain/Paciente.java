package com.cardiored.cardio.domain;
 
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import javax.validation.constraints.NotNull;

import com.fasterxml.jackson.annotation.JsonFormat;

import org.springframework.format.annotation.DateTimeFormat;
import java.time.LocalDate;
import java.util.Set;
import java.util.List;


@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Builder
public class Paciente {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @NotNull
    @Column(length = 11)
    private String cpf;

    @NotNull
    private String name;

    @NotNull   
    @JsonFormat(pattern = "dd/MM/yyyy")
    @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) 
    private LocalDate birthDate;

    @NotNull
    @Enumerated(EnumType.STRING)
    private Ethnicity ethnicity;

    @NotNull
    @Enumerated(EnumType.STRING)
    private Gender gender;
    
    @OneToMany(cascade=CascadeType.ALL, mappedBy="paciente")
    private List<Consulta> consultas;

    @OneToMany(mappedBy = "paciente")
    private Set<Laudo> laudo;

}