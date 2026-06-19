package org.example.orderservice.controller;

import lombok.RequiredArgsConstructor;
import org.example.orderservice.dto.OrderDto;
import org.example.orderservice.dto.SaveOrderDto;
import org.example.orderservice.service.OrderService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/orders")
@RequiredArgsConstructor
public class OrderController {

    private final OrderService orderService;

    @PostMapping("/add")
    public ResponseEntity<OrderDto> create(@RequestBody SaveOrderDto dto, @RequestHeader("Authorization") String authHeader) {
        String token = authHeader.replace("Bearer ", "");
        return ResponseEntity.status(HttpStatus.CREATED).body(orderService.create(dto, token));
    }

    @GetMapping
    public ResponseEntity<Page<OrderDto>> getAll(Pageable pageable) {
        return ResponseEntity.ok(orderService.getAll(pageable));
    }

    @GetMapping("/{id}")
    public ResponseEntity<OrderDto> getById(@PathVariable Long id) {
        return ResponseEntity.ok(orderService.getById(id));
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<OrderDto> update(@PathVariable Long id, @RequestBody SaveOrderDto dto) {
        return ResponseEntity.ok(orderService.update(id, dto));
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        orderService.delete(id);
        return ResponseEntity.noContent().build();
    }
}