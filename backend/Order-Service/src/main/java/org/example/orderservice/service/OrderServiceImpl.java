package org.example.orderservice.service;

import lombok.RequiredArgsConstructor;
import org.example.orderservice.client.ProductClient;
import org.example.orderservice.client.UserClient;
import org.example.orderservice.dto.OrderDto;
import org.example.orderservice.dto.OrderEventDto;
import org.example.orderservice.dto.ProductCheckDto;
import org.example.orderservice.dto.SaveOrderDto;
import org.example.orderservice.entity.Orders;
import org.example.orderservice.kafka.KafkaProducer;
import org.example.orderservice.mapper.OrderMapper;
import org.example.orderservice.repasitory.OrdersRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class OrderServiceImpl implements OrderService {

    private final OrdersRepository ordersRepository;
    private final OrderMapper orderMapper;
    private final UserClient userClient;
    private final ProductClient productClient;
    private final KafkaProducer kafkaProducer;


    @Override
    public OrderDto create(SaveOrderDto dto, String token) {
        userClient.checkUser(dto.userId(), token);
        ProductCheckDto productCheckDto = productClient.getProduct(dto.productId());
        if (productCheckDto == null) {
            throw new RuntimeException("Product not found: " + dto.productId());
        }

        if (productCheckDto.stock() < dto.quantity()) {
            throw new RuntimeException("Not enough stock");
        }

        Orders orders = orderMapper.toEntity(dto);
        orders.setStatus("CREATED");
        Orders saved = ordersRepository.save(orders);
        kafkaProducer.sendOrderEvent(
                new OrderEventDto(dto.productId(), dto.quantity(),dto.email())
        );

        return orderMapper.toDto(saved);
    }

    @Override
    public Page<OrderDto> getAll(Pageable pageable) {
        return ordersRepository.findAll(pageable).map(orderMapper::toDto);
    }


    @Override
    public OrderDto getById(Long id) {
        return orderMapper.toDto(findById(id));
    }
    @Override
    public OrderDto update(Long id, SaveOrderDto dto) {
        Orders order = findById(id);
        orderMapper.updateEntity(order, dto);
        return orderMapper.toDto(ordersRepository.save(order));
    }

    @Override
    public void delete(Long id) {
        ordersRepository.delete(findById(id));
    }

    private Orders findById(Long id) {
        return ordersRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Order not found: " + id));
    }
}
