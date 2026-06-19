package org.example.orderservice.service;

import org.example.orderservice.dto.OrderDto;
import org.example.orderservice.dto.SaveOrderDto;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface OrderService {

    OrderDto create(SaveOrderDto dto, String token);

    Page<OrderDto> getAll(Pageable pageable);

    OrderDto getById(Long id);

    OrderDto update(Long id, SaveOrderDto dto);

    void delete(Long id);

}
