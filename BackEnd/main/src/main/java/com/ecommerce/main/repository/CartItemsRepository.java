package com.ecommerce.main.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ecommerce.main.sqlentity.Cart;
import com.ecommerce.main.sqlentity.CartItems;
import com.ecommerce.main.sqlentity.Product;

public interface CartItemsRepository extends JpaRepository<CartItems, Integer>{
    Optional<CartItems> findByCartAndProduct(Cart cart, Product product);
}
