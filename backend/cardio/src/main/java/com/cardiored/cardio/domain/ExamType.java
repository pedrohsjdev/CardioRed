package com.cardiored.cardio.domain;

import com.fasterxml.jackson.annotation.JsonValue;

public enum ExamType {
    ECOCARDIOGRAMA("Ecocardiograma"),
    ELETROCARDIOGRAMA("Eletrocardiograma"),
    MAPA("Mapa"),
    HOLTER("Holter");

    @JsonValue
    private final String type;

    ExamType(String type) {
        this.type = type;
    }

    public String getType() {
        return type;
    }


    
}
