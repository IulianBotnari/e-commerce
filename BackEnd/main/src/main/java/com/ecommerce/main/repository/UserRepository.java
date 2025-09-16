package com.ecommerce.main.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ecommerce.main.sqlentity.User;




public interface  UserRepository extends JpaRepository<User, Integer> {
     
}
