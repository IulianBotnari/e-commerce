package com.ecommerce.main.controllers;

import java.sql.SQLException;
import java.util.ArrayList;
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

import com.ecommerce.main.dto.outBoundDTO.CartItemsResponseDto;
import com.ecommerce.main.repository.CartItemsRepository;
import com.ecommerce.main.repository.CartRepository;
import com.ecommerce.main.service.CartService;
import com.ecommerce.main.sqlentity.Cart;
import com.ecommerce.main.sqlentity.CartItems;
import com.ecommerce.main.sqlentity.Product;

/**
 * Controller REST che gestisce tutte le operazioni relative al carrello.
 * Espone endpoint per visualizzare, modificare, aggiungere e rimuovere prodotti
 * dal carrello.
 */
@RestController
@RequestMapping("/cart")
public class CartController {

    @Autowired
    private CartService cartService;
    @Autowired
    private CartRepository cartRepository;

    @Autowired
    private CartItemsRepository cartItemsRepository;

    /**
     * Recupera tutti i prodotti presenti nel carrello di un utente specifico.
     *
     * @param userId ID dell'utente.
     * @return ResponseEntity contenente la lista dei prodotti nel carrello oppure
     *         404 se non trovati.
     */
    @GetMapping("/cartbyuser/{userId}")
    public ResponseEntity getCartProducts(@PathVariable int userId) {
        Cart userCart = cartService.getCartByUserId(userId);
        if (userCart == null) {
            return ResponseEntity.notFound().build();
        }

        // Recupera gli item del carrello
        List<CartItems> cartItems = (List<CartItems>) cartItemsRepository.findByCart(userCart.getId());
        if (cartItems == null) {
            return ResponseEntity.notFound().build();
        }

        // Costruisce la risposta DTO con i dettagli dei prodotti
        List<CartItemsResponseDto> response = new ArrayList<>();

        for (CartItems cartItem : cartItems) {
            Product product = cartItem.getProduct();
            double totalPrice = product.getPrice() * cartItem.getQuantity();
            CartItemsResponseDto responseItem = new CartItemsResponseDto();
            responseItem.setProductId(product.getId());
            responseItem.setCartItemId(cartItem.getId());
            responseItem.setCartId(userCart.getId());
            responseItem.setProductCode(product.getProductcode());
            responseItem.setName(product.getName());
            responseItem.setBrand(product.getBrand());
            responseItem.setCategory(product.getCategory());
            responseItem.setDescription(product.getDescription());
            responseItem.setQuantity(cartItem.getQuantity());
            responseItem.setUnitPrice(product.getPrice());
            responseItem.setDiscountValue(product.getDiscountvalue());
            responseItem.setImage(product.getImage());
            responseItem.setTotalPrice(totalPrice);
            response.add(responseItem);
        }
        // Restituisce la lista dei prodotti nel carrello
        return ResponseEntity.ok(response);
    }

    /**
     * Modifica la quantità di un prodotto nel carrello.
     *
     * @param cartitemid ID dell’elemento nel carrello.
     * @param quantity   nuova quantità del prodotto.
     * @return 202 Accepted se l’operazione è avvenuta con successo.
     */

    @PutMapping("/changequantity/{cartitemid}")
    public ResponseEntity changeCartProductQuantity(@PathVariable String cartitemid, @RequestBody int quantity)
            throws SQLException {
        System.out.println("Id del prodotto " + cartitemid);
        System.out.println("Quantita passata " + quantity);
        try {
            // Richiama il servizio per aggiornare la quantità del prodotto
            cartService.changeCartProductQty(cartitemid, quantity);

        } catch (Exception e) {
            System.err.println(e.getMessage());
            return ResponseEntity.internalServerError().build();
        }

        return ResponseEntity.accepted().build();
    }

    /**
     * Aggiunge un prodotto al carrello di un utente.
     *
     * @param userId    ID dell’utente.
     * @param productId ID del prodotto.
     * @param quantity  quantità da aggiungere.
     * @return Messaggio di conferma.
     */

    @PostMapping("/{userId}/add/{productId}/quantity")
    public ResponseEntity<String> addProductToCart(
            @PathVariable int userId,
            @PathVariable int productId,
            @RequestParam("quantity") double quantity) {
        System.out.println("Rotta mapping");
        cartService.addProductToCart(userId, productId, quantity);
        return ResponseEntity.ok("Prodotto aggiunto al carrello!");
    }
     /**
     * Rimuove un prodotto specifico dal carrello.
     *
     * @param cartId    ID del carrello.
     * @param productId ID del prodotto da rimuovere.
     * @return Messaggio di conferma.
     */

    @DeleteMapping("/{cartId}/remove/{productId}")
    public ResponseEntity<String> removeProductFromCart(
            @PathVariable int cartId,
            @PathVariable int productId) {

        cartService.removeProductFromCart(cartId, productId);
        return ResponseEntity.ok("Prodotto rimosso dal carrello!");
    }

    /**
     * Aggiorna la quantità di un prodotto già presente nel carrello.
     *
     * @param cartId    ID del carrello.
     * @param productId ID del prodotto.
     * @param quantity  nuova quantità.
     * @return Messaggio di conferma.
     */

    // @PutMapping("/{cartId}/update/{productId}")
    // public ResponseEntity<String> updateProductQuantity(
    //         @PathVariable int cartId,
    //         @PathVariable int productId,
    //         @RequestParam double quantity) {

    //     cartService.updateProductQuantity(cartId, productId, quantity);
    //     return ResponseEntity.ok("Quantità aggiornata!");
    // }

}
