package org.example.productservice.dto;

public record OrderEventDto(
        Long productId,
        Integer quantity
) {}