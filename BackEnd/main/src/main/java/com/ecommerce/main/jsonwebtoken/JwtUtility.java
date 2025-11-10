package com.ecommerce.main.jsonwebtoken;

import java.util.Date;

import javax.crypto.SecretKey;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.JwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;

/**
 * @fileoverview Servizio di utilità per la creazione, l'estrazione e la validazione dei JSON Web Token (JWT).
 *
 * @class
 * Gestisce la logica di autenticazione e autorizzazione basata su JWT, differenziando
 * tra Access Token (breve durata) e Refresh Token (lunga durata).
 * La chiave segreta viene iniettata dalla configurazione dell'applicazione.
 */
@Component
public class JwtUtility {

    /** Chiave segreta iniettata dal file di configurazione (es. application.properties) */
    @Value("${jwt.secret_key}")
    private String secret_key;
    
    /** Tempo di scadenza per l'Access Token (1 ora) in millisecondi. */
    private final long ACCESS_EXPIRATION = 1000 * 60 * 60;
    
    /** Tempo di scadenza per il Refresh Token (7 giorni) in millisecondi. */
    private final long REFRESH_EXPIRATION = 1000L * 60 * 60 * 24 * 7;

    /**
     * Genera un Access Token JWT di breve durata.
     * Include l'email (subject) e il ruolo (custom claim) per l'autorizzazione.
     * @param email L'identificativo dell'utente (Subject).
     * @param role Il ruolo dell'utente ("user" o "admin").
     * @return La stringa del JWT firmato.
     */
    public String generateToken(String email, String role) {
 
        return Jwts.builder()
                .subject(email)
                .claim("role", role)
                .issuedAt(new Date())
                .expiration(new Date(System.currentTimeMillis() + ACCESS_EXPIRATION))
                .signWith(getSigninKey())
                .compact();
    }

    /**
     * Converte la chiave segreta (Stringa) in un oggetto {@link SecretKey} HMAC SHA per la firma.
     * @return La chiave segreta pronta per la firma/verifica.
     */
    public SecretKey getSigninKey(){
        return Keys.hmacShaKeyFor(secret_key.getBytes());
    }

    /**
     * Genera un Refresh Token JWT di lunga durata.
     * Utilizzato per ottenere nuovi Access Token senza richiedere nuovamente le credenziali.
     * @param username L'identificativo dell'utente (Subject).
     * @param role Il ruolo dell'utente.
     * @return La stringa del Refresh Token firmato.
     */
    public String generateRefreshToken(String username, String role) {
        return Jwts.builder()
                .subject(username)
                .claim("role", role)
                .issuedAt(new Date())
                .expiration(new Date(System.currentTimeMillis() + REFRESH_EXPIRATION))
                .signWith(getSigninKey())
                .compact();
    }

    /**
     * Estrae l'username (Subject) dal JWT.
     * @param token Il JWT da analizzare.
     * @return L'username (email) se il token è valido, altrimenti {@code null} in caso di scadenza o errore di parsing.
     */
    public String extractUsername(String token) {
        try {
        return Jwts.parser()
                .verifyWith(getSigninKey())
                .build()
                .parseSignedClaims(token)
                .getPayload()
                .getSubject();
    } catch (ExpiredJwtException e) {
        return null;
    } catch (JwtException e) {
        return null; 
    }
    }


    /**
     * Estrae il ruolo (custom claim "role") dal JWT.
     * @param token Il JWT da analizzare.
     * @return Il ruolo dell'utente se il token è valido, altrimenti {@code null} in caso di scadenza o errore di parsing.
     */
    public String extractRole(String token){
        try {
            return Jwts.parser()
                    .verifyWith(getSigninKey())
                    .build()
                    .parseSignedClaims(token)
                    .getPayload()
                    .get("role",String.class);
        } catch (ExpiredJwtException e) {
            return null;
        } catch (JwtException e){
            return null;
        }
    }

    /**
     * Verifica l'integrità e la validità del token (inclusa la scadenza).
     * @param token Il JWT da validare.
     * @return {@code true} se il token è valido e non scaduto, {@code false} altrimenti (es. firma non valida, token scaduto).
     */
    public boolean validateToken(String token) {
        try {
            Jwts.parser().verifyWith(getSigninKey()).build().parseSignedClaims(token);
            return true;
        } catch (JwtException e) {
            // Include SignatureException, ExpiredJwtException, ecc.
            return false;
        }
    }

}