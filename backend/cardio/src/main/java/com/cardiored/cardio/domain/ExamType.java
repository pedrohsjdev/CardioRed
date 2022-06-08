package com.cardiored.cardio.domain;

import com.fasterxml.jackson.annotation.JsonValue;

public enum ExamType {
    ECOCARDIOGRAMA("Ecocardiograma"),
    ELETROCARDIOGRAMA("Eletrocardiograma"),
    MAPA("Mapa"),
    HOLTER("Holter");

    private final String name;

    ExamType(String name) {
        this.name = name;
    }

    public String getName() {
        return name;
    }
}
