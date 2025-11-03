package com.ecommerce.main.controllers;

import java.io.IOException;
import java.sql.SQLException;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.ecommerce.main.repository.ProductRepository;
import com.ecommerce.main.sqlentity.Product;


@RestController
@RequestMapping("/products")
public class ProductController {

    @Autowired
    ProductRepository productRepository;

    @GetMapping
    public List<Product> getAllProduct() {
        return productRepository.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity getProduct(@PathVariable("id") String code) {
        System.out.println(code);
        Product product = productRepository.findByproductcode(code);
        
        if (product == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(product);
    }

    @PostMapping(value = "/postproduct", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<Product> postProduct(@RequestPart("metadata") Product product,
            @RequestPart("image") MultipartFile file) throws SQLException, IOException {

        if (file != null && !file.isEmpty()) {
            product.setImage(file.getBytes());
        }

        Product response = productRepository.save(product);
        return ResponseEntity.ok(response);
    }

    @PutMapping(value = "/updateproduct", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<Product> putProduct(@RequestPart("metadata") Product product,
            @RequestPart(value = "image", required = false) MultipartFile file) throws SQLException, IOException {
        if (file != null && !file.isEmpty()) {
            product.setImage(file.getBytes());
        } else {
            Product existingProduct = productRepository.findById(product.getId()).orElse(null);
            if (existingProduct != null) {
                product.setImage(existingProduct.getImage());
            }
        }

        Product response = productRepository.save(product);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/deleteproduct/{id}")
    public ResponseEntity<String> getMethodName(@PathVariable("id") String param) {
        productRepository.deleteByproductcode(param);
        return ResponseEntity.ok("Prodotto eliminato con successo");
    }
    

}
