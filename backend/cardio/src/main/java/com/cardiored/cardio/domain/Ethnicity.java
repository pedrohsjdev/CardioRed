package com.cardiored.cardio.domain;

public enum Ethnicity {
    BRANCO("Branco"),
    PRETO("Preto"),
    PARDO("Pardo"),
    AMARELO("Amarelo"),
    INDIGENA("Indígena");

    private final String name;

    Ethnicity(String name) {
        this.name = name;
    }

    public String getName() {
        return name;
    }
}
