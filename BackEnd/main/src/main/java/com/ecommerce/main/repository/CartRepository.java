package com.ecommerce.main.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ecommerce.main.sqlentity.Cart;

public interface  CartRepository extends JpaRepository<Cart, Integer>{
    
}
