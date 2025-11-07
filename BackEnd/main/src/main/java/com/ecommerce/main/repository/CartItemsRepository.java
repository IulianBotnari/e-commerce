package com.ecommerce.main.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ecommerce.main.sqlentity.CartItems;

public interface CartItemsRepository extends JpaRepository<CartItems, Integer>{
    
}
