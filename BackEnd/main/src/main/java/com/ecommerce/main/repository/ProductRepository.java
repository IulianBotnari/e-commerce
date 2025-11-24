package com.ecommerce.main.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.ecommerce.main.sqlentity.Product;

import jakarta.transaction.Transactional;

/**
 * @fileoverview Repository per l'accesso ai dati dell'entità {@link Product}.
 *
 * @interface
 * Estende {@link JpaRepository} per ereditare le operazioni CRUD standard e Paging/Sorting.
 * Contiene query personalizzate (sia per convenzione di nome che native) per funzionalità specifiche
 * come ricerca per codice, eliminazione e recupero di offerte/nuovi prodotti.
 */
public interface ProductRepository extends JpaRepository<Product, Integer> {

    /**
     * Recupera un prodotto specifico utilizzando il suo codice univoco.
     * Metodo generato automaticamente da Spring Data JPA (Query Method).
     * @param code Il codice del prodotto.
     * @return L'oggetto {@link Product} corrispondente, o null se non trovato.
     */
    Product findByproductcode(String code);

    /**
     * Elimina un prodotto utilizzando il suo codice.
     * Richiede {@link Transactional} e {@link Modifying} poiché modifica lo stato del database.
     * Metodo generato automaticamente da Spring Data JPA (Query Method).
     * @param code Il codice del prodotto da eliminare.
     */
    @Transactional
    @Modifying
    void deleteByproductcode(String code);

    /**
     * Esegue una Query Nativa per recuperare i 4 prodotti con il maggiore valore di sconto.
     * Utilizzato per la visualizzazione delle offerte del giorno.
     * @return Una lista dei 4 prodotti in sconto.
     */
    @Query(value = "SELECT * FROM product ORDER BY discountvalue DESC LIMIT 4", nativeQuery = true)
    List<Product> dayDiscoutOffer();

    /**
     * Esegue una Query Nativa per recuperare i 4 prodotti aggiunti più di recente.
     * @return Una lista dei 4 nuovi prodotti.
     */
    @Query(value = "select * from product order by inserttime desc limit 4", nativeQuery = true)
    List<Product> getNewProducts();

    /**
     * Esegue una Query Nativa per recuperare tutti i prodotti appartenenti a una specifica categoria.
     * Utilizza il parametro nominativo (:category) per il binding del valore.
     * @param category La categoria dei prodotti da ricercare.
     * @return Una lista di prodotti della categoria specificata.
     */
    @Query(value = "select * from product where category = :category", nativeQuery = true)
    List<Product> getProductByCategory(@Param("category") String category);

    

}