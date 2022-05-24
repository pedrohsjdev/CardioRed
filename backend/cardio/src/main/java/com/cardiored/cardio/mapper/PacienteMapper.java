package com.cardiored.cardio.mapper;

import com.cardiored.cardio.domain.Paciente;
import com.cardiored.cardio.request.paciente.PacientePostDTO;
import com.cardiored.cardio.request.paciente.PacientePutDTO;
import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

@Mapper(componentModel = "spring")
public abstract class PacienteMapper {
    public static final PacienteMapper INSTANCE = Mappers.getMapper(PacienteMapper.class);

    public abstract Paciente toPaciente(PacientePostDTO pacientePostDTO);
    public abstract Paciente toPaciente(PacientePutDTO pacientePutDTO);
}
