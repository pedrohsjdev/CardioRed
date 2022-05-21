package com.cardiored.cardio.mapper;

import com.cardiored.cardio.domain.User;
import com.cardiored.cardio.request.user.UserPostDTO;
import com.cardiored.cardio.request.user.UserPutDTO;

import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

@Mapper(componentModel = "spring")
public abstract class UserMapper {
    public static final UserMapper INSTANCE = Mappers.getMapper(UserMapper.class);

    public abstract User toUser(UserPostDTO userPostDTO);

    public abstract User toUser(UserPutDTO userPutDTO);
}
