package com.ecommerce.main.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ecommerce.main.sqlentity.Products;

public interface  ProductRepository extends JpaRepository<Products, Integer> {
    
}
