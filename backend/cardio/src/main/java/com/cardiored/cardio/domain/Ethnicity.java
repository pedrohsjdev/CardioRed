package com.cardiored.cardio.domain;

import com.fasterxml.jackson.annotation.JsonValue;

public enum Ethnicity {
    BRANCO("Branco"),
    PRETO("Preto"),
    PARDO("Pardo"),
    AMARELO("Amarelo"),
    INDIGENA("Indígena");

    @JsonValue
    private final String name;

    Ethnicity(String name) {
        this.name = name;
    }

    public String getName() {
        return name;
    }
}
