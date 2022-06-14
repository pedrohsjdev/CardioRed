package com.cardiored.cardio.domain;

public enum Status {
    TEMPORARY("Temporary"),
    DEFINITIVE("Definitive");

    private final String name;

    Status(String name) {
        this.name = name;
    }

    public String getName() {
        return name;
    }
}
