package com.cardiored.cardio.mapper;

import com.cardiored.cardio.domain.Residente;
import com.cardiored.cardio.request.ResidentePostDTO;
import com.cardiored.cardio.request.ResidentePutDTO;
import com.cardiored.cardio.request.ResidenteResponsePostDTO;

import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

@Mapper(componentModel = "spring")
public abstract class ResidenteMapper {
    public static final ResidenteMapper INSTANCE = Mappers.getMapper(ResidenteMapper.class);

    public abstract Residente toResidente(ResidentePostDTO residentePostDTO);
    public abstract ResidenteResponsePostDTO toResidenteResponsePostDTO(Residente residente);

    public abstract Residente toResidente(ResidentePutDTO residentePutDTO);
}
