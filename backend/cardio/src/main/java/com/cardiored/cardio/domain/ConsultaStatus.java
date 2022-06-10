package com.cardiored.cardio.domain;

import com.fasterxml.jackson.annotation.JsonValue;

public enum ConsultaStatus {
    CANCELADO("Cancelado"),
    ATIVO("Ativo"),
    REALIZADO("Realizado");

    @JsonValue
    private final String status;

    ConsultaStatus(String status) {
        this.status = status;
    }

    public String getStatus() {
        return status;
    }
}
