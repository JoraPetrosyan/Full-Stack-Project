package org.example.orderservice.dto;

public record SaveOrderDto(
        Long userId,
        Long productId,
        Integer quantity,
        String email
) {
}
