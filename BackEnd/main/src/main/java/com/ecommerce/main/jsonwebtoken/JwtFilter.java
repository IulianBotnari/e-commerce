package com.ecommerce.main.jsonwebtoken;

import java.io.IOException;
import java.util.Collections;
import java.util.List;

import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

/**
 * @fileoverview Filtro di sicurezza personalizzato per l'estrazione e la validazione dei JSON Web Token (JWT).
 *
 * @class
 * Estende {@link OncePerRequestFilter} per garantire che il filtro venga eseguito una sola volta per ogni richiesta HTTP.
 * Questo filtro intercetta le richieste, estrae il JWT dall'header 'Authorization' e, se valido,
 * imposta l'oggetto di autenticazione nel contesto di sicurezza di Spring.
 */
@Component
public class JwtFilter extends OncePerRequestFilter {

    private final JwtUtility jwtUtility;

    /**
     * Costruttore con iniezione di dipendenza per {@link JwtUtility}.
     * @param jwtUtility Il servizio di utilità per la gestione dei JWT.
     */
    public JwtFilter(JwtUtility jwtUtility) {
        this.jwtUtility = jwtUtility;
    }

    /**
     * Logica principale del filtro eseguita per ogni richiesta HTTP.
     * 1. Estrae il token JWT dall'header 'Authorization' (se presente e nel formato "Bearer <token>").
     * 2. Estrae l'email (username) e verifica che l'utente non sia già autenticato nel contesto.
     * 3. Se il token è valido, estrae il ruolo, crea le autorità e imposta l'oggetto di autenticazione
     * ({@link UsernamePasswordAuthenticationToken}) nel {@link SecurityContextHolder}.
     * 4. Passa la richiesta al filtro successivo nella catena.
     *
     * @param request La richiesta HTTP in ingresso.
     * @param response La risposta HTTP.
     * @param chain La catena di filtri.
     * @throws ServletException, IOException
     */
    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain chain)
                throws ServletException, IOException {
        String header = request.getHeader("Authorization");
        String token = null;
        String email = null;
        String role = null;

        // Estrazione del token dall'header
        if (header != null && header.startsWith("Bearer ")) {
            token = header.substring(7).trim();
            email = jwtUtility.extractUsername(token);
        }

        // Se l'email è presente e non c'è autenticazione esistente
        if (email != null && SecurityContextHolder.getContext().getAuthentication() == null) {
            if (jwtUtility.validateToken(token)) {
                role = jwtUtility.extractRole(token);
                // Creazione dell'autorità basata sul ruolo
                List<GrantedAuthority> authorities = Collections.singletonList(
                    new SimpleGrantedAuthority("ROLE_" + role)
                );

                // Creazione dell'oggetto di autenticazione e inserimento nel contesto di sicurezza
                UsernamePasswordAuthenticationToken auth =
                        new UsernamePasswordAuthenticationToken(email, null, authorities);
                auth.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
                SecurityContextHolder.getContext().setAuthentication(auth);
            }
        }

        // Passa la richiesta al filtro successivo
        try {
            chain.doFilter(request, response);
        } catch (java.io.IOException e) {
            e.printStackTrace();
        } catch (ServletException e) {
            e.printStackTrace();
        }
    }

}