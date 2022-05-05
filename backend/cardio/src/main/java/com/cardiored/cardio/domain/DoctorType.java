package com.cardiored.cardio.domain;

public enum DoctorType {
    MEDICO("Médico"),
    RESIDENTE("Residente"),
    DOCENTE("Docente");

    private final String type;

    private DoctorType(String type) {
        this.type = type;
    }

    public String getType() {
        return type;
    }
}
