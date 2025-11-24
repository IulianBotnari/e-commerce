package com.ecommerce.main.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ecommerce.main.sqlentity.Orders;

public interface OrdersRepository extends JpaRepository<Orders, Integer>{
    
}
