package org.example.orderservice.client;

import lombok.RequiredArgsConstructor;
import org.example.orderservice.dto.UserDto;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Service
@RequiredArgsConstructor
public class UserClient {

    private final RestTemplate restTemplate;

    @Value("${user.service.url:http://localhost:8081}")
    private String userServiceUrl;

    public UserDto checkUser(Long id, String token) {

        HttpHeaders headers = new HttpHeaders();
        headers.setBearerAuth(token);

        HttpEntity<Void> entity = new HttpEntity<>(headers);

        ResponseEntity<UserDto> response = restTemplate.exchange(
                userServiceUrl + "/users/" + id,
                HttpMethod.GET,
                entity,
                UserDto.class
        );

        return response.getBody();
    }
}