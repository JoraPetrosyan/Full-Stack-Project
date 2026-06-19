package org.example.productservice.dto;

public record SaveProductDto(
        String name,
        Double price,
        Integer stock
) {}