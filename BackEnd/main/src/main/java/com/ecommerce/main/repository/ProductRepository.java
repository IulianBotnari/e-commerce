package com.ecommerce.main.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;

import com.ecommerce.main.sqlentity.Product;

import jakarta.transaction.Transactional;

public interface ProductRepository extends JpaRepository<Product, Integer> {

    Product findByproductcode(String code);

    @Transactional
    @Modifying
    void deleteByproductcode(String code);

}
