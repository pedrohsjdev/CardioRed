package com.cardiored.cardio.domain;

import com.fasterxml.jackson.annotation.JsonValue;

public enum Gender {
    MASCULINO("Masculino", 'M'),
    FEMININO("Feminino", 'F');

    private final String name;
    @JsonValue
    private final Character sex;

    Gender(String name, Character sex) {
        this.name = name;
        this.sex = sex;
    }

    public String getName() {
        return name;
    }

    public Character getSex(){
        return sex;
    }
}
