package com.ecommerce.main.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.ecommerce.main.repository.CartRepository;
import com.ecommerce.main.service.CartService;
import com.ecommerce.main.sqlentity.Cart;
import com.ecommerce.main.sqlentity.User;


@RestController
@RequestMapping("/cart")
public class CartController {

   
    @Autowired
    private CartService cartService;
    @Autowired
    CartRepository cartRepository;

    @GetMapping("/cartbyuser")
    public ResponseEntity getMethodName(@RequestBody User user) {
        List<Cart> userCarts = cartRepository.findByUserId(user);
        return ResponseEntity.ok(userCarts);
    }
    

    @PostMapping("/{cartId}/add/{productId}")
    public ResponseEntity<String> addProductToCart(
            @PathVariable int cartId,
            @PathVariable int productId,
            @RequestParam double quantity) {

        cartService.addProductToCart(cartId, productId, quantity);
        return ResponseEntity.ok("Prodotto aggiunto al carrello!");
    }

    @DeleteMapping("/{cartId}/remove/{productId}")
    public ResponseEntity<String> removeProductFromCart(
            @PathVariable int cartId,
            @PathVariable int productId) {

        cartService.removeProductFromCart(cartId, productId);
        return ResponseEntity.ok("Prodotto rimosso dal carrello!");
    }

    @PutMapping("/{cartId}/update/{productId}")
    public ResponseEntity<String> updateProductQuantity(
            @PathVariable int cartId,
            @PathVariable int productId,
            @RequestParam double quantity) {

        cartService.updateProductQuantity(cartId, productId, quantity);
        return ResponseEntity.ok("Quantità aggiornata!");
    }
}
