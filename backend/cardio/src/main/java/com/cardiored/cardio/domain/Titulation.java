package com.cardiored.cardio.domain;

public enum Titulation {
    DOUTOR("Doutor"),
    ASSISTENTE("Assistente"),
    LIVREDOCENTE("Livre-docente"),
    TITULAR("Titular");

    private final String titulation;

    Titulation(String titulation) {
        this.titulation = titulation;
    }

    public String getTitulation() {
        return titulation;
    }
}
