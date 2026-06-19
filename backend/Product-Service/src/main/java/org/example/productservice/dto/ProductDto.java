package org.example.productservice.dto;

public record ProductDto(
        Long id,
        String name,
        Double price,
        Integer stock,
        String imageUrl

) {
}