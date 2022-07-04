package com.cardiored.cardio.domain;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.validation.constraints.NotNull;

import com.fasterxml.jackson.annotation.JsonAlias;
import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Entity
@AllArgsConstructor
@NoArgsConstructor
public class Disease {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Integer id;

    @NotNull(message = "Disease code cannot be empty.")
    @Column(length = 6)
    @JsonProperty("code")
    @JsonAlias({ "codigo", "code" })
    String code;

    @NotNull(message = "Disease name cannot be empty.")
    @JsonProperty("name")
    @JsonAlias({ "nome", "name" })
    String name;
}
