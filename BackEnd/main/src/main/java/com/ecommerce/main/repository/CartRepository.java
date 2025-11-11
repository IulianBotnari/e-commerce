package com.ecommerce.main.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.ecommerce.main.sqlentity.Cart;


public interface  CartRepository extends JpaRepository<Cart, Integer>{
   @Query(value ="select*from cart where user_id= :userId", nativeQuery=true)
   Cart findByUser_Id(@Param("userId") int userId);
    
}
