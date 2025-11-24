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

/**
 * Service che gestisce tutta la logica di business relativa al carrello (Cart).
 * Contiene i metodi per aggiungere, rimuovere, aggiornare e recuperare i
 * prodotti nel carrello di un utente.
 */

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

    /**
     * Recupera il carrello associato a un determinato utente.
     *
     * @param userId ID dell’utente.
     * @return oggetto Cart associato all’utente, oppure null se non esiste.
     */
    public Cart getCartByUserId(int userId) {

        Cart userCart = cartRepository.findByUser_Id(userId);
        return userCart;
    }

    /**
     * Aggiorna la quantità di un prodotto all’interno del carrello.
     * 
     * @param cartItemId ID dell’elemento del carrello (CartItems).
     * @param quantity   nuova quantità da impostare.
     */

    public void changeCartProductQty(String cartItemId, int quantity) {
        // Converte l’ID da stringa a intero
        int parsedCartId = Integer.parseInt(cartItemId);
        // Recupera l’oggetto CartItems tramite repository
        CartItems cartItem = cartItemsRepository.findById(parsedCartId);

        cartItem.setQuantity(quantity);
        cartItem.setTotalPrice(quantity * cartItem.getProduct().getPrice());

        // Salva le modifiche nel database
        cartItemsRepository.save(cartItem);
    }

    /**
     * Aggiunge un prodotto al carrello di un utente.
     * Se il carrello non esiste, viene creato.
     * Se il prodotto è già presente, viene incrementata la quantità.
     *
     * @param userId    ID dell’utente.
     * @param productId ID del prodotto da aggiungere.
     * @param quantity  quantità del prodotto da aggiungere.
     */

    public void addProductToCart(int userId, int productId, double quantity) {
        // Recupera l’utente
        User user = userRepository.findById(userId).orElseThrow(() -> new RuntimeException("User not found"));
        System.out.println(user.toString());
        // Recupera o crea il carrello associato all’utente
        Cart cart = user.getCart();
        if (cart == null) {
            cart = new Cart(user);
            cart = cartRepository.save(cart);
            user.setCart(cart);
            userRepository.save(user);
        }
        // Recupera il prodotto da aggiungere
        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new RuntimeException("Product not found"));
        // Se la quantità non è specificata, imposta a 1 per default
        if (quantity == 0) {
            quantity = 1;
        }
        // Controlla se il prodotto è già nel carrello
        Optional<CartItems> existingItemOpt = cartItemsRepository.findByCartAndProduct(cart, product);

        if (existingItemOpt.isPresent()) {
            // Il prodotto esiste già: aggiorna quantità e totale
            CartItems existingItem = existingItemOpt.get();
            existingItem.setQuantity((int) (existingItem.getQuantity() + quantity));
            existingItem.setTotalPrice(existingItem.getQuantity() * product.getPrice());
            cartItemsRepository.save(existingItem);
        } else {
            // Il prodotto non esiste nel carrello: creane uno nuovo
            double totalPrice = quantity * product.getPrice();
            CartItems newItem = new CartItems(cart, product, (int) quantity, totalPrice);
            cartItemsRepository.save(newItem);
        }

    }

    /**
     * Rimuove un prodotto dal carrello.
     *
     * @param cartId    ID del carrello.
     * @param productId ID del prodotto da rimuovere.
     */

    public void removeProductFromCart(int cartId, int productId) {
        // Recupera carrello e prodotto
        Cart cart = cartRepository.findById(cartId)
                .orElseThrow(() -> new RuntimeException("Cart not found"));
        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new RuntimeException("Product not found"));
        // Recupera l’elemento del carrello (CartItems) da eliminare
        CartItems cartItem = cartItemsRepository.findByCartAndProduct(cart, product)
                .orElseThrow(() -> new RuntimeException("Product not found in cart"));
        // Elimina il prodotto dal carrello
        cartItemsRepository.delete(cartItem);
    }

    /**
     * Aggiorna la quantità di un prodotto nel carrello.
     * Se la nuova quantità è <= 0, il prodotto viene rimosso.
     *
     * @param cartId      ID del carrello.
     * @param productId   ID del prodotto da aggiornare.
     * @param newQuantity nuova quantità da impostare.
     */

    // public void updateProductQuantity(int cartId, int productId, double newQuantity) {
    //     if (newQuantity <= 0) {
    //         removeProductFromCart(cartId, productId);
    //         return;
    //     }
    //      // Recupera carrello e prodotto
    //     Cart cart = cartRepository.findById(cartId)
    //             .orElseThrow(() -> new RuntimeException("Cart not found"));
    //     Product product = productRepository.findById(productId)
    //             .orElseThrow(() -> new RuntimeException("Product not found"));
    //        // Recupera l’elemento del carrello e aggiorna quantità e totale
    //     CartItems cartItem = cartItemsRepository.findByCartAndProduct(cart, product)
    //             .orElseThrow(() -> new RuntimeException("Product not found in cart"));

    //     cartItem.setQuantity((int) newQuantity);
    //     cartItem.setTotalPrice(product.getPrice() * newQuantity);
    //     // Salva le modifiche
    //     cartItemsRepository.save(cartItem);
    // }

}
