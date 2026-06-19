package org.example.notificationservice.kafka;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.example.notificationservice.dto.OrderEventDto;
import org.example.notificationservice.service.EmailService;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Service;

@Service
@Slf4j
@RequiredArgsConstructor
public class KafkaConsumer {

    private final EmailService emailService;
    private final ObjectMapper objectMapper;
    @KafkaListener(topics = "order-created", groupId = "notification-group")
    public void handleOrderEvent(String message) {
        log.info("Raw Kafka message: {}", message);
        try {
            String actualJson = message;
            if (message.startsWith("\"")) {
                actualJson = objectMapper.readValue(message, String.class);
            }

            OrderEventDto dto = objectMapper.readValue(actualJson, OrderEventDto.class);
            emailService.sendOrderNotification(dto.email(), dto.productId(), dto.quantity());
            log.info("Email sent successfully!");
        } catch (Exception e) {
            log.error("Failed to process Kafka message", e);
        }
    }
}