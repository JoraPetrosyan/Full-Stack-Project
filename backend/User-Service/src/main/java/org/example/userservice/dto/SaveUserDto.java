package org.example.userservice.dto;

public record SaveUserDto(
        String name,
        String email,
        String password
) {}