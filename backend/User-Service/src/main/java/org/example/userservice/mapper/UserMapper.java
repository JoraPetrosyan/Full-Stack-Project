package org.example.userservice.mapper;

import org.example.userservice.dto.SaveUserDto;
import org.example.userservice.dto.UserDto;
import org.example.userservice.entity.User;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface UserMapper {

    UserDto toDto(User user);

    User toEntity(SaveUserDto userDto);

}
