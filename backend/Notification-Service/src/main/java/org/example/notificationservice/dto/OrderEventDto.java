package org.example.notificationservice.dto;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;

public record OrderEventDto(
        @JsonProperty("productId") Long productId,
        @JsonProperty("quantity") Integer quantity,
        @JsonProperty("email") String email
) {
    @JsonCreator
    public OrderEventDto {}
}