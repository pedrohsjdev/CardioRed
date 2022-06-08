package com.cardiored.cardio.domain;

import javax.persistence.*;
import javax.validation.constraints.NotNull;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

import java.util.Set;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Inheritance(strategy = InheritanceType.JOINED)
@SuperBuilder
public class Medico {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    @Column(length = 11)
    @NotNull
    private String crm;
    @NotNull
    private String name;

    @Enumerated(EnumType.STRING)
    @NotNull
    private DoctorType doctorType;
    
    @OneToOne
    @JoinColumn(name="userId")
    @NotNull
    private User user;

    @OneToMany(mappedBy = "medico")
    private Set<Laudo> laudo;
}