package com.ecommerce.main.jsonwebtoken;

import java.util.Date;

import javax.crypto.SecretKey;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.JwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;

@Component
public class JwtUtility {

    @Value("${jwt.secret_key}")
    private String secret_key;
    private final long ACCESS_EXPIRATION = 1000 * 60 * 1;
    private final long REFRESH_EXPIRATION = 1000L * 60 * 60 * 24 * 7;

    public String generateToken(String email) {
        return Jwts.builder()
                .subject(email)
                .issuedAt(new Date())
                .expiration(new Date(System.currentTimeMillis() + ACCESS_EXPIRATION))
                .signWith(getSigninKey())
                .compact();
    }

    public SecretKey getSigninKey(){
        return Keys.hmacShaKeyFor(secret_key.getBytes());
    }

    public String generateRefreshToken(String username) {
        return Jwts.builder()
                .subject(username)
                .issuedAt(new Date())
                .expiration(new Date(System.currentTimeMillis() + REFRESH_EXPIRATION))
                .signWith(getSigninKey())
                .compact();
    }

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

    public boolean validateToken(String token) {
        try {
            Jwts.parser().verifyWith(getSigninKey()).build().parseSignedClaims(token);
            return true;
        } catch (JwtException e) {
            return false;
        }
    }

}
