package com.ecommerce.main.controllers;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.ecommerce.main.dto.outBoundDTO.CartItemsResponseDto;
import com.ecommerce.main.repository.CartItemsRepository;
import com.ecommerce.main.repository.CartRepository;
import com.ecommerce.main.service.CartService;
import com.ecommerce.main.sqlentity.Cart;
import com.ecommerce.main.sqlentity.CartItems;
import com.ecommerce.main.sqlentity.Product;

@RestController
@RequestMapping("/cart")
public class CartController {

    @Autowired
    private CartService cartService;
    @Autowired
    private CartRepository cartRepository;

    @Autowired
    private CartItemsRepository cartItemsRepository;

    @GetMapping("/cartbyuser/{userId}")
    public ResponseEntity getCartProducts(@PathVariable int userId) {
        Cart userCart = cartService.getCartByUserId(userId);
        List<CartItems> cartItems = (List<CartItems>) cartItemsRepository.findByCart(userCart.getId());

        List<CartItemsResponseDto> response = new ArrayList<>();

        for (CartItems cartItem : cartItems){
            Product product = cartItem.getProduct();
            double totalPrice = product.getPrice() * cartItem.getQuantity();
            CartItemsResponseDto responseItem = new CartItemsResponseDto();
            responseItem.setProductId(product.getId());
            responseItem.setName(product.getName());
            responseItem.setBrand(product.getBrand());
            responseItem.setCategory(product.getCategory());
            responseItem.setQuantity(cartItem.getQuantity());
            responseItem.setUnitPrice(product.getPrice());
            responseItem.setTotalPrice(totalPrice);
            response.add(responseItem);
        }
        

        return ResponseEntity.ok(response);
    }

    @PostMapping("/{userId}/add/{productId}/quantity")
    public ResponseEntity<String> addProductToCart(
            @PathVariable int userId,
            @PathVariable int productId,
            @RequestParam("quantity") double quantity) {
        System.out.println("Rotta mapping");
        cartService.addProductToCart(userId, productId, quantity);
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
