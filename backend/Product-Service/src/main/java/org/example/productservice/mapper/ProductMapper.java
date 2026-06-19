package org.example.productservice.mapper;

import org.example.productservice.dto.ProductDto;
import org.example.productservice.dto.SaveProductDto;
import org.example.productservice.entity.Product;
import org.mapstruct.Mapper;
import org.mapstruct.MappingTarget;

@Mapper(componentModel = "spring")
public interface ProductMapper {

    ProductDto toDto(Product product);

    Product toEntity(SaveProductDto dto);

    void updateEntity(@MappingTarget Product product, SaveProductDto dto);
}
