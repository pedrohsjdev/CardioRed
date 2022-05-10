package com.cardiored.cardio.mapper;

import com.cardiored.cardio.domain.Docente;
import com.cardiored.cardio.request.DocentePostDTO;
import com.cardiored.cardio.request.DocentePutDTO;
import com.cardiored.cardio.request.DocenteResponsePostDTO;

import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

@Mapper(componentModel = "spring")
public abstract class DocenteMapper {
    public static final DocenteMapper INSTANCE = Mappers.getMapper(DocenteMapper.class);

    public abstract Docente toDocente(DocentePostDTO docentePostDTO);
    public abstract DocenteResponsePostDTO toDocenteResponsePostDTO(Docente docente);

    public abstract Docente toDocente(DocentePutDTO docentePutDTO);
}
