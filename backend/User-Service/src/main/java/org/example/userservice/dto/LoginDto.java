package org.example.userservice.dto;

public record LoginDto(
        String email,
        String password
) {
}
