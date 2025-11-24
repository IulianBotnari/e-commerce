package com.ecommerce.main.controllers;

import java.io.IOException;
import java.sql.SQLException;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.ecommerce.main.repository.ProductRepository;
import com.ecommerce.main.sqlentity.Product;
/**
 * @fileoverview Controller REST per la gestione delle operazioni CRUD e delle query relative ai prodotti.
 *
 * @class
 * Espone gli endpoint API sotto il path base "/products" per interagire con l'entità Product.
 * Utilizza {@link ProductRepository} per l'accesso ai dati.
 */
@RestController
@RequestMapping("/products")
public class ProductController {

    @Autowired
    ProductRepository productRepository;

    /**
     * @GetMapping("/")
     * Recupera e restituisce la lista di tutti i prodotti presenti nel database.
     * @return Una lista di oggetti {@link Product}.
     */
    @GetMapping
    public List<Product> getAllProduct() {
        return productRepository.findAll();
    }

    /**
     * @GetMapping("/daydiscountoffer")
     * Recupera e restituisce la lista dei prodotti attualmente in offerta speciale/sconto.
     * @return Una ResponseEntity contenente la lista dei prodotti scontati.
     */
    @GetMapping("/daydiscountoffer")
    public ResponseEntity dayDiscoutOffer() {
        List<Product> discountProductList = productRepository.dayDiscoutOffer();
        return ResponseEntity.ok(discountProductList);
    }

    /**
     * @GetMapping("/newproduct")
     * Recupera e restituisce la lista dei prodotti aggiunti di recente.
     * @return Una ResponseEntity contenente la lista dei nuovi prodotti.
     */
    @GetMapping("/newproduct")
    public ResponseEntity getNewproduct() {
        List<Product> newProductList = productRepository.getNewProducts();
        return ResponseEntity.ok(newProductList);
    }

    /**
     * @GetMapping("/productbycategory/{category}")
     * Recupera e restituisce la lista dei prodotti appartenenti alla categoria specificata.
     * @param category La categoria del prodotto come Path Variable.
     * @return Una ResponseEntity contenente la lista dei prodotti filtrati o un corpo vuoto se non trovati.
     */
    @GetMapping("/productbycategory/{category}")
    public ResponseEntity getProductByCategory(@PathVariable ("category") String category) {

        List<Product> listByCategory = productRepository.getProductByCategory(category);

        return  ResponseEntity.ofNullable(listByCategory);

    }


    /**
     * @GetMapping("/{id}")
     * Recupera un singolo prodotto utilizzando il suo codice (code).
     * @param code Il codice del prodotto (ID/codice univoco) come Path Variable.
     * @return Una ResponseEntity contenente il prodotto trovato (200 OK) o un 404 Not Found se non esiste.
     */
    @GetMapping("/{id}")
    public ResponseEntity getProduct(@PathVariable("id") String code) {
        Product product = productRepository.findByproductcode(code);

        if (product == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(product);
    }

    /**
     * @PostMapping("/postproduct")
     * Crea un nuovo prodotto nel database, gestendo anche il caricamento di un file immagine.
     * L'immagine viene convertita in un array di byte e salvata nel campo 'image' dell'entità.
     * @param product I metadati del prodotto (JSON) inviati come 'metadata' RequestPart.
     * @param file L'immagine del prodotto (MultipartFile) inviata come 'image' RequestPart.
     * @return Una ResponseEntity contenente il prodotto salvato (con ID generato).
     * @throws SQLException, IOException in caso di problemi durante la gestione del file.
     */
    @PostMapping(value = "/postproduct", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<Product> postProduct(@RequestPart("metadata") Product product,
            @RequestPart("image") MultipartFile file) throws SQLException, IOException {
        if (file != null && !file.isEmpty()) {
            product.setImage(file.getBytes());
        }
        Product response = productRepository.save(product);
        return ResponseEntity.ok(response);
    }

    /**
     * @PutMapping("/updateproduct")
     * Aggiorna un prodotto esistente nel database.
     * Permette l'aggiornamento dell'immagine. Se un nuovo file immagine non è fornito,
     * recupera l'immagine esistente dal database per mantenerla nell'oggetto.
     * @param product I metadati aggiornati del prodotto (JSON) inviati come 'metadata' RequestPart.
     * @param file Il nuovo file immagine (opzionale) inviato come 'image' RequestPart.
     * @return Una ResponseEntity contenente il prodotto aggiornato.
     * @throws SQLException, IOException in caso di problemi durante la gestione del file.
     */
    @PutMapping(value = "/updateproduct", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<Product> putProduct(@RequestPart("metadata") Product product,
            @RequestPart(value = "image", required = false) MultipartFile file) throws SQLException, IOException {
        if (file != null && !file.isEmpty()) {
            product.setImage(file.getBytes());
        } else {
            // Se non è stato fornito un nuovo file, mantiene l'immagine esistente.
            Product existingProduct = productRepository.findById(product.getId()).orElse(null);
            if (existingProduct != null) {
                product.setImage(existingProduct.getImage());
            }
        }

        Product response = productRepository.save(product);
        return ResponseEntity.ok(response);
    }

    /**
     * @GetMapping("/deleteproduct/{id}")
     * Elimina un prodotto utilizzando il suo codice.
     * Nota: L'uso di un GET per un'operazione di DELETE non è una best practice RESTful.
     * Si consiglia di usare un mapping @DeleteMapping.
     * @param param Il codice del prodotto da eliminare come Path Variable.
     * @return Una ResponseEntity con un messaggio di conferma dell'eliminazione.
     */
    @GetMapping("/deleteproduct/{id}")
    public ResponseEntity<String> getMethodName(@PathVariable("id") String param) {
        productRepository.deleteByproductcode(param);
        return ResponseEntity.ok("Prodotto eliminato con successo");
    }

}