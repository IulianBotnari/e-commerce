package com.ecommerce.main.controllers;

import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CookieValue;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

import com.ecommerce.main.jsonwebtoken.JwtUtility;
import com.ecommerce.main.repository.UserRepository;
import com.ecommerce.main.sqlentity.User;

import jakarta.servlet.http.HttpServletResponse;

@RestController
@RequestMapping("/users")
public class UserController {

    private final JwtUtility jwtUtility;

    public UserController(JwtUtility jwtUtility) {
        this.jwtUtility = jwtUtility;
    }

    @Autowired
    UserRepository userRepository;

    @GetMapping
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    @GetMapping("/{id}")
    public User getUser(@PathVariable("id") int id) {
        return userRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "User not found"));

    }

    @PostMapping("/postuser")
    public ResponseEntity<User> postUser(@RequestBody User entity) {
        if (entity.getIs_indirizzo_same_spedizione().equals(true)) {
            entity.setSpedizione(entity.getIndirizzo());
        }

        User savedUser = userRepository.save(entity);

        return ResponseEntity.ok(savedUser);

    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody User entity, HttpServletResponse response) {

        Optional<User> userByEmail = userRepository.findByEmail(entity.getEmail());

        if (userByEmail.isEmpty() || !userByEmail.get().getPassword().equals(entity.getPassword())) {
            throw new RuntimeException("Credenziali non valide");
        }

        String accessToken = jwtUtility.generateToken(entity.getEmail());
        String refreshToken = jwtUtility.generateRefreshToken(entity.getEmail());

        ResponseCookie cookie = ResponseCookie.from("refreshToken", refreshToken)
                .httpOnly(true)
                .secure(true)
                .path("/users/refresh")
                .maxAge(7 * 24 * 60 * 60)
                .build();

        response.addHeader(HttpHeaders.SET_COOKIE, cookie.toString());

        return ResponseEntity.ok(Map.of("accessToken", accessToken));
    }

    @PostMapping("/refresh")
    public ResponseEntity<?> refresh(@CookieValue(value = "refreshToken", required = false) String refreshToken) {
        if (refreshToken == null || !jwtUtility.validateToken(refreshToken)) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Refresh token mancante o invalido");
        }

        String username = jwtUtility.extractUsername(refreshToken);
        String newAccessToken = jwtUtility.generateToken(username);

        return ResponseEntity.ok(Map.of("accessToken", newAccessToken));
    }

    @PostMapping("/logout")
    public ResponseEntity<?> logout(HttpServletResponse response) {
        ResponseCookie cookie = ResponseCookie.from("refreshToken", "")
                .httpOnly(true)
                .secure(true)
                .path("/users/refresh")
                .maxAge(0)
                .sameSite("Strict")
                .build();
        response.addHeader(HttpHeaders.SET_COOKIE, cookie.toString());
        return ResponseEntity.ok("Logout effettuato");
    }

}
