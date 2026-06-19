package org.example.userservice.service;

import org.example.userservice.dto.AuthResponseDto;
import org.example.userservice.dto.LoginDto;
import org.example.userservice.dto.SaveUserDto;
import org.example.userservice.dto.UserDto;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface UserService {

    UserDto register(SaveUserDto dto);

    AuthResponseDto login(LoginDto dto);

    UserDto getById(Long id);

    Page<UserDto> getAll(Pageable pageable);
}
