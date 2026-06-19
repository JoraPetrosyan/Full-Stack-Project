package org.example.orderservice.dto;

public record OrderEventDto(
        Long productId,
        Integer quantity,
        String email
) {}