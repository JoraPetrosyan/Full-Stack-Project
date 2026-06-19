package org.example.orderservice.client;

import lombok.RequiredArgsConstructor;
import org.example.orderservice.dto.ProductCheckDto;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Service
@RequiredArgsConstructor
public class ProductClient {

    private final RestTemplate restTemplate;

    @Value("${product.service.url:http://localhost:8082}")
    private String productServiceUrl;

    public ProductCheckDto getProduct(Long id) {
        return restTemplate.getForObject(
                productServiceUrl + "/products/" + id,
                ProductCheckDto.class
        );
    }

    public void decrease(Long id, Integer qty) {
        restTemplate.put(
                productServiceUrl + "/products/" + id + "/decrease?qty=" + qty,
                null
        );
    }
}