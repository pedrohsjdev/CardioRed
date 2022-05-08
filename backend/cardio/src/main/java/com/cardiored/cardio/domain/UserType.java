package com.cardiored.cardio.domain;

import com.fasterxml.jackson.annotation.JsonValue;

public enum UserType {
    MEDICO("Medico"),
    RESIDENTE("Residente"),
    ADM("Adm");

    @JsonValue
    private final String name;

    UserType(String name) {
        this.name = name;
    }

    public String getName() {
        return name;
    }

}
