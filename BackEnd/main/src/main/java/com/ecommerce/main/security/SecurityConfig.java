package com.ecommerce.main.security;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import com.ecommerce.main.jsonwebtoken.JwtFilter;

/**
 * @fileoverview Classe di configurazione primaria per Spring Security.
 *
 * @class
 *        Definisce la catena di filtri di sicurezza (SecurityFilterChain), le
 *        politiche di gestione delle sessioni
 *        e le regole di autorizzazione (Authorization Access Control List).
 *        Questa configurazione è progettata per un'API REST senza stato
 *        (stateless), utilizzando JWT per l'autenticazione.
 */
@Configuration
public class SecurityConfig {

    private final JwtFilter jwtFilter;

    /**
     * Costruttore che inietta il filtro JWT personalizzato.
     * 
     * @param jwtFilter Il filtro personalizzato per l'estrazione e la validazione
     *                  dei JWT.
     */
    public SecurityConfig(JwtFilter jwtFilter) {
        this.jwtFilter = jwtFilter;
    }

    /**
     * Bean che configura la catena di filtri di sicurezza HTTP.
     * 
     * @param httpSecurity L'oggetto di configurazione per HTTP Security.
     * @return Il {@link SecurityFilterChain} costruito.
     * @throws Exception
     */
    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity httpSecurity) throws Exception {
        httpSecurity
                // 1. Disabilita CSRF: Essendo un'API stateless che usa JWT (non sessioni), il
                // CSRF non è necessario.
                .csrf(csrf -> csrf.disable())
                // 2. Configurazione CORS: definita in un altro punto o disabilitata se la
                // sezione è vuota.
                .cors(cors -> {
                })
                // 3. Regole di Autorizzazione per gli Endpoint
                .authorizeHttpRequests(auth -> auth
                        // Endpoint pubblici che non richiedono autenticazione (permitAll)
                        .requestMatchers("/users/login", "/users/refresh", "/users/postuser",
                                "/users/verify-credentials", "/products/daydiscountoffer", "/products/newproduct",
                                "/products/productbycategory/**")
                        .permitAll()
                        // Endpoint accessibili solo a utenti con ruolo "user" (ROLE_user)
                        .requestMatchers("/user/**").hasRole("user")
                        // Endpoint accessibili solo a utenti con ruolo "user" (ROLE_user)
                        .requestMatchers("/cart/**").hasRole("user")
                        // Endpoint accessibili solo a utenti con ruolo "admin" (ROLE_admin)
                        .requestMatchers("/products/postproduct", "/products/updateproduct",
                                "/products/deleteproduct/**")
                        .hasRole("admin")
                        // Qualsiasi altra richiesta DEVE essere autenticata
                        .anyRequest().authenticated())
                // 4. Gestione delle Sessioni: Imposta la politica su STATELESS. Le sessioni non
                // vengono create né usate.
                .sessionManagement(sm -> sm.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                // 5. Aggiunta del Filtro JWT: Il nostro filtro personalizzato viene eseguito
                // prima del filtro di autenticazione standard di Spring.
                .addFilterBefore(jwtFilter, UsernamePasswordAuthenticationFilter.class);

        return httpSecurity.build();
    }

    /**
     * Espone l'{@link AuthenticationManager} come Bean.
     * Necessario per gestire il processo di autenticazione (es. verifica password
     * nel Login).
     * 
     * @param config L'oggetto di configurazione per l'autenticazione.
     * @return L'istanza dell'AuthenticationManager.
     * @throws Exception
     */
    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration config) throws Exception {
        return config.getAuthenticationManager();
    }

}