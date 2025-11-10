package com.ecommerce.main.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ecommerce.main.repository.CartItemsRepository;
import com.ecommerce.main.repository.CartRepository;
import com.ecommerce.main.repository.ProductRepository;
import com.ecommerce.main.sqlentity.Cart;
import com.ecommerce.main.sqlentity.CartItems;
import com.ecommerce.main.sqlentity.Product;

@Service
public class CartService {

    @Autowired
    private CartRepository cartRepository;

    @Autowired
    private ProductRepository productRepository;


    @Autowired
    private CartItemsRepository cartItemsRepository;


    public void addProductToCart(int cartId, int productId, double quantity){
        Cart cart = cartRepository.findById(cartId).orElseThrow(() -> new RuntimeException("Cart not found"));

        Product product = productRepository.findById(productId).orElseThrow(()-> new RuntimeException("Product not found"));


        Optional<CartItems> existingItemOpt = cartItemsRepository.findByCartAndProduct(cart, product);

        if (existingItemOpt.isPresent()) {
            CartItems existingItem = existingItemOpt.get();
            existingItem.setQuantity((int) (existingItem.getQuantity() + quantity));
            existingItem.setTotalPrice(existingItem.getQuantity() * product.getPrice());
            cartItemsRepository.save(existingItem);
        } else {
            double totalPrice = quantity * product.getPrice();
            CartItems newItem = new CartItems(cart, product, (int) quantity, totalPrice);
            cartItemsRepository.save(newItem);
        }

    }

    public void removeProductFromCart(int cartId, int productId) {
    Cart cart = cartRepository.findById(cartId)
            .orElseThrow(() -> new RuntimeException("Cart not found"));
    Product product = productRepository.findById(productId)
            .orElseThrow(() -> new RuntimeException("Product not found"));

    CartItems cartItem = cartItemsRepository.findByCartAndProduct(cart, product)
            .orElseThrow(() -> new RuntimeException("Product not found in cart"));

    cartItemsRepository.delete(cartItem);
}

public void updateProductQuantity(int cartId, int productId, double newQuantity) {
    if (newQuantity <= 0) {
        removeProductFromCart(cartId, productId);
        return;
    }

    Cart cart = cartRepository.findById(cartId)
            .orElseThrow(() -> new RuntimeException("Cart not found"));
    Product product = productRepository.findById(productId)
            .orElseThrow(() -> new RuntimeException("Product not found"));

    CartItems cartItem = cartItemsRepository.findByCartAndProduct(cart, product)
            .orElseThrow(() -> new RuntimeException("Product not found in cart"));

    cartItem.setQuantity((int)newQuantity);
    cartItem.setTotalPrice(product.getPrice() * newQuantity);

    cartItemsRepository.save(cartItem);
}
    
    
}
