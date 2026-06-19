package org.example.orderservice.kafka;

import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import org.example.orderservice.dto.OrderEventDto;
import org.springframework.stereotype.Service;
import org.springframework.kafka.core.KafkaTemplate;

@Service
@RequiredArgsConstructor
public class KafkaProducer {

    private final KafkaTemplate<String, String> kafkaTemplate;
    private final ObjectMapper objectMapper;

    public void sendOrderEvent(OrderEventDto orderEventDto) {
        try {
            String json = objectMapper.writeValueAsString(orderEventDto);
            kafkaTemplate.send("order-created", json);
        } catch (Exception e) {
            throw new RuntimeException("Failed to send Kafka event", e);
        }
    }
}