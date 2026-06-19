package org.example.productservice.service;

import org.example.productservice.dto.ProductDto;
import org.example.productservice.dto.SaveProductDto;
import org.example.productservice.entity.Product;
import lombok.RequiredArgsConstructor;
import org.example.productservice.mapper.ProductMapper;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.example.productservice.repository.ProductRepository;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.net.MalformedURLException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.UUID;

@RequiredArgsConstructor
@Service
public class ProductServiceImpl implements ProductService {

    private final ProductRepository productRepository;
    private final ProductMapper productMapper;

    @Value("${upload.dir:uploads/products}")
    private String uploadDir;

    public ProductDto create(SaveProductDto dto) {
        return productMapper.toDto(productRepository.save(productMapper.toEntity(dto)));
    }

    public ProductDto getById(Long id) {
        return productMapper.toDto(productRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Not found")));
    }

    public Page<ProductDto> getAll(Pageable pageable) {
        return productRepository.findAll(pageable).map(productMapper::toDto);
    }

    public void decreaseStock(Long id, Integer qty) {
        Product product = productRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Not found"));
        product.setStock(product.getStock() - qty);
        productRepository.save(product);
    }

    @Override
    public ProductDto uploadImage(Long id, MultipartFile file) throws IOException {
        Product product = productRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Not found"));
        Path dir = Paths.get(uploadDir);
        if (!Files.exists(dir)) {
            Files.createDirectories(dir);
        }
        String originalFilename = file.getOriginalFilename();
        String extension = (originalFilename != null && originalFilename.contains("."))
                ? originalFilename.substring(originalFilename.lastIndexOf("."))
                : "";
        String fileName = UUID.randomUUID().toString() + extension;
        Path filePath = dir.resolve(fileName);
        Files.copy(file.getInputStream(), filePath, StandardCopyOption.REPLACE_EXISTING);
        product.setImageUrl("/products/images/" + fileName);
        return productMapper.toDto(productRepository.save(product));
    }

    @Override
    public Resource getImage(String filename) throws MalformedURLException {
        Path path = Paths.get(uploadDir, filename);
        Resource resource = new UrlResource(path.toUri());
        if (!resource.exists()) {
            throw new RuntimeException("Not found");
        }
        return resource;
    }

    @Override
    public String getImageContentType(String filename) throws IOException {
        Path path = Paths.get(uploadDir).resolve(filename);
        String contentType = Files.probeContentType(path);
        return contentType != null ? contentType : "application/octet-stream";
    }

    @Override
    public void delete(Long id) {
        productRepository.deleteById(id);
    }

    @Override
    public ProductDto update(Long id, SaveProductDto dto) {
        Product product = findById(id);
        productMapper.updateEntity(product,dto);
        return productMapper.toDto(productRepository.save(product));
    }

    private Product findById(Long id) {
        return productRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Order not found: " + id));
    }


}
