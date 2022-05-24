package com.cardiored.cardio.domain;

import com.fasterxml.jackson.annotation.JsonValue;

public enum Titulation {
    DOUTOR("Doutor"),
    ASSISTENTE("Assistente"),
    LIVREDOCENTE("Livre-docente"),
    TITULAR("Titular");

    @JsonValue
    private final String titulation;

    Titulation(String titulation) {
        this.titulation = titulation;
    }

    public String getTitulation() {
        return titulation;
    }
}
