package com.cardiored.cardio.domain;

public enum UserType {
    MEDICO("Medico"),
    RESIDENTE("Residente"),
    ADM("Adm");

    private final String name;

    UserType(String name) {
        this.name = name;
    }

    public String getName() {
        return name;
    }

}
