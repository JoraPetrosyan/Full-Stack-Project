package org.example.orderservice.dto;

public record OrderDto(
        Long id,
        Long userId,
        String userEmail,
        Long productId,
        Integer quantity,
        String status
) {
}
