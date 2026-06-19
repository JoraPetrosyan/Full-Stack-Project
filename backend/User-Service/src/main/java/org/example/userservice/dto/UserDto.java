package org.example.userservice.dto;

public record UserDto(
        Long id,
        String name,
        String email
) {}
