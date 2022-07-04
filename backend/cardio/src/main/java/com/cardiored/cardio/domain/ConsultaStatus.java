package com.cardiored.cardio.domain;

import com.fasterxml.jackson.annotation.JsonValue;

public enum ConsultaStatus {
    CANCELADA("Cancelada"),
    AGUARDANDO_EXAME("Aguardando exame"),
    AGUARDANDO_LAUDO("Aguardando laudo"),
    LAUDO_EMITIDO("Laudo emitido");

    @JsonValue
    private final String status;

    ConsultaStatus(String status) {
        this.status = status;
    }

    public String getStatus() {
        return status;
    }
}
