package com.ecommerce.main.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.ecommerce.main.sqlentity.Cart;
import com.ecommerce.main.sqlentity.CartItems;
import com.ecommerce.main.sqlentity.Product;


public interface CartItemsRepository extends JpaRepository<CartItems, Integer>{
    Optional<CartItems> findByCartAndProduct(Cart cart, Product product);

    @Query(value = "select * from cart_items where cart_id = :cartId", nativeQuery= true)
    List<CartItems> findByCart(@Param("cartId") int cartId);

    CartItems findById(int id);

}
