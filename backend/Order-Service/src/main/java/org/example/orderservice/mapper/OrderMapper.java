package org.example.orderservice.mapper;

import org.example.orderservice.dto.OrderDto;
import org.example.orderservice.dto.SaveOrderDto;
import org.example.orderservice.entity.Orders;
import org.mapstruct.Mapper;
import org.mapstruct.MappingTarget;

@Mapper(componentModel = "spring")
public interface OrderMapper {

    OrderDto toDto(Orders order);

    void updateEntity(@MappingTarget Orders order, SaveOrderDto dto);

    Orders toEntity(SaveOrderDto dto);
}