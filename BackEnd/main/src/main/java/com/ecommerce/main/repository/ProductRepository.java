package com.ecommerce.main.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ecommerce.main.sqlentity.Product;

public interface  ProductRepository extends JpaRepository<Product, Integer> {

    Product findByproductcode(String code);
    Product deleteByproductcode(String code);
    
}
