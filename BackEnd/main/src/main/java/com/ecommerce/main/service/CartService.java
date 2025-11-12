package com.ecommerce.main.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ecommerce.main.repository.CartItemsRepository;
import com.ecommerce.main.repository.CartRepository;
import com.ecommerce.main.repository.ProductRepository;
import com.ecommerce.main.repository.UserRepository;
import com.ecommerce.main.sqlentity.Cart;
import com.ecommerce.main.sqlentity.CartItems;
import com.ecommerce.main.sqlentity.Product;
import com.ecommerce.main.sqlentity.User;

@Service
public class CartService {

    @Autowired
    private CartRepository cartRepository;

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private CartItemsRepository cartItemsRepository;
    @Autowired
    private UserRepository userRepository;

    public Cart getCartByUserId(int userId){
        
        Cart userCart = cartRepository.findByUser_Id(userId);
        return userCart;
    }

    public void changeCartProductQty(String cartItemId, int quantity){
        int parsedCartId = Integer.parseInt(cartItemId);
        CartItems cartItem = cartItemsRepository.findById(parsedCartId);
 
        cartItem.setQuantity(quantity);
        cartItem.setTotalPrice(quantity * cartItem.getProduct().getPrice());
        cartItemsRepository.save(cartItem);
    }

    public void addProductToCart(int userId, int productId, double quantity) {

        User user = userRepository.findById(userId).orElseThrow(() -> new RuntimeException("User not found"));
        System.out.println(user.toString());
        Cart cart = user.getCart();
        if (cart == null) {
            cart = new Cart(user);
            cart = cartRepository.save(cart);
            user.setCart(cart);
            userRepository.save(user);
        }

        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new RuntimeException("Product not found"));
        if (quantity == 0) {
            quantity = 1;
        }
        System.out.println(product.toString());

        Optional<CartItems> existingItemOpt = cartItemsRepository.findByCartAndProduct(cart, product);

        System.out.println(existingItemOpt.toString());

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

        cartItem.setQuantity((int) newQuantity);
        cartItem.setTotalPrice(product.getPrice() * newQuantity);

        cartItemsRepository.save(cartItem);
    }

}
