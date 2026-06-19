package org.example.productservice.client;

import lombok.RequiredArgsConstructor;
import org.example.productservice.dto.ProductDto;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Service
@RequiredArgsConstructor
public class ProductClient {

    private final RestTemplate restTemplate = new RestTemplate();

    public ProductDto getProduct(Long id) {
        return restTemplate.getForObject(
                "http://localhost:8082/products/" + id,
                ProductDto.class
        );
    }

    public void decrease(Long id, Integer qty) {
        restTemplate.put(
                "http://localhost:8082/products/" + id + "/decrease?qty=" + qty,
                null
        );
    }
}