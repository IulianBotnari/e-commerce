package com.ecommerce.main.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ecommerce.main.sqlentity.User;


/**
 * @fileoverview Repository per l'accesso ai dati dell'entità {@link User}.
 *
 * @interface
 * Estende {@link JpaRepository} per ereditare le operazioni CRUD standard e Paging/Sorting.
 * Definisce metodi personalizzati per la ricerca di utenti basata su campi univoci come
 * l'email e il codice fiscale.
 */
public interface UserRepository extends JpaRepository<User, Integer> {
     
    /**
     * Cerca un utente specifico utilizzando la sua email.
     * Metodo generato automaticamente da Spring Data JPA (Query Method).
     * @param email L'email (utilizzata come username) da cercare.
     * @return Un {@link Optional} contenente l'oggetto {@link User} se trovato.
     */
    Optional<User> findByEmail(String email);

    /**
     * Cerca un utente specifico utilizzando il suo codice fiscale.
     * Metodo generato automaticamente da Spring Data JPA (Query Method).
     * @param codiceFiscale Il codice fiscale da cercare.
     * @return Un {@link Optional} contenente l'oggetto {@link User} se trovato.
     */
    Optional<User> findByCodefiscale(String codiceFiscale);
}