package com.cardiored.cardio.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

import com.cardiored.cardio.domain.Consulta;
import com.cardiored.cardio.request.consulta.ConsultaPostDTO;
import com.cardiored.cardio.request.consulta.ConsultaPutDTO;

@Mapper(componentModel = "spring")
public abstract class ConsultaMapper {
    public static final ConsultaMapper INSTANCE = Mappers.getMapper(ConsultaMapper.class);

    public abstract Consulta toConsulta(ConsultaPostDTO ConsultaPostDTO);

    public abstract ConsultaPostDTO toConsultaPostDTO(Consulta consulta);

    public abstract Consulta toConsulta(ConsultaPutDTO ConsultaPutDTO);

    public abstract ConsultaPutDTO toConsultaPutDTO(Consulta consulta);

}
