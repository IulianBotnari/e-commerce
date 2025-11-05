package com.ecommerce.main.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.ecommerce.main.sqlentity.Product;

import jakarta.transaction.Transactional;

public interface ProductRepository extends JpaRepository<Product, Integer> {

    Product findByproductcode(String code);

    @Transactional
    @Modifying
    void deleteByproductcode(String code);

    @Query(value = "SELECT * FROM product ORDER BY discountvalue DESC LIMIT 4", nativeQuery = true)
    List<Product> dayDiscoutOffer();

    @Query(value = "select * from product order by inserttime desc limit 4", nativeQuery = true)
    List<Product> getNewProducts();

    @Query(value = "select * from product where category = :category", nativeQuery = true)
    List<Product> getProductByCategory(@Param("category") String category);

}
