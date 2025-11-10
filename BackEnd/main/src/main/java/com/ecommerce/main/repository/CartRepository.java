package com.ecommerce.main.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ecommerce.main.sqlentity.Cart;
import com.ecommerce.main.sqlentity.User;


public interface  CartRepository extends JpaRepository<Cart, Integer>{

    List<Cart> findByUserId(User user);
    
}
