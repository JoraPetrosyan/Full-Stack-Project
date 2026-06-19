package org.example.productservice.kafka;

import lombok.RequiredArgsConstructor;
import org.example.productservice.dto.OrderEventDto;
import org.example.productservice.service.ProductService;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Service;
import tools.jackson.databind.ObjectMapper;

@Service
@RequiredArgsConstructor
public class KafkaConsumer {

    private final ProductService productService;
    private final ObjectMapper objectMapper;

    @KafkaListener(topics = "order-created", groupId = "product-group")
    public  void handleOrderEvent(String message) {
        try {
            OrderEventDto event = objectMapper.readValue(message, OrderEventDto.class);
            productService.decreaseStock(event.productId(),event.quantity());
        }catch (Exception e) {
            throw new RuntimeException("Failed to process Kafka event", e);
        }
    }
}
