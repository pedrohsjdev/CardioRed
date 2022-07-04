package com.cardiored.cardio.domain;

import com.fasterxml.jackson.annotation.JsonValue;

public enum LaudoStatus {
    PROVISORIO("Provisório"),
    DEFINITIVO("Definitivo");

    @JsonValue
    private final String status;

    LaudoStatus(String status) {
        this.status = status;
    }

    public String getStatus() {
        return status;
    }
}
