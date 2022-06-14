package com.cardiored.cardio.mapper;

import com.cardiored.cardio.domain.Laudo;
import com.cardiored.cardio.domain.Paciente;
import com.cardiored.cardio.request.laudo.LaudoPostDTO;
import com.cardiored.cardio.request.paciente.PacientePostDTO;
import com.cardiored.cardio.request.paciente.PacientePutDTO;
import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

@Mapper(componentModel = "spring")
public abstract class LaudoMapper {
    public static final LaudoMapper INSTANCE = Mappers.getMapper(LaudoMapper.class);

    public abstract Laudo toLaudo(LaudoPostDTO laudoPostDTO);
    public abstract Laudo toLaudo(Laudo laudo);
}
