package org.example.productservice.service;

import org.example.productservice.dto.ProductDto;
import org.example.productservice.dto.SaveProductDto;
import org.springframework.core.io.Resource;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.net.MalformedURLException;

public interface ProductService {

    ProductDto create(SaveProductDto dto);

    ProductDto getById(Long id);

    Page<ProductDto> getAll(Pageable pageable);

    void decreaseStock(Long id, Integer qty);

    ProductDto uploadImage(Long id, MultipartFile file) throws IOException;

    Resource getImage(String filename) throws MalformedURLException;

    String getImageContentType(String filename) throws IOException;

    void delete(Long id);

    ProductDto update(Long id, SaveProductDto dto);


}
