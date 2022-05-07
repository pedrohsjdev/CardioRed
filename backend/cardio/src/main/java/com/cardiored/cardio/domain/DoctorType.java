package com.cardiored.cardio.domain;

import com.fasterxml.jackson.annotation.JsonValue;

public enum DoctorType {
    MEDICO("Médico"),
    RESIDENTE("Residente"),
    DOCENTE("Docente");

    @JsonValue
    private final String type;

    DoctorType(String type) {
        this.type = type;
    }

    public String getType() {
        return type;
    }
}
