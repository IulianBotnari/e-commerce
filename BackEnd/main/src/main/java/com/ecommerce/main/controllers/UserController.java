package com.ecommerce.main.controllers;

import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.CookieValue;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ecommerce.main.dto.inBoundDTO.UpdateUserDataRequest;
import com.ecommerce.main.dto.outBoundDTO.UserLoginResponse;
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

    @PostMapping("/postuser")
    public ResponseEntity<?> postUser(@RequestBody User entity) {
        Optional<User> entityEmail = userRepository.findByEmail(entity.getEmail());
        Optional<User> entityCodFiscale = userRepository.findByCodefiscale(entity.getCodefiscale());
        if (entityEmail != null || entityCodFiscale != null ) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body("Utente già esistente");
            
        }
        if (entity.getIs_indirizzo_same_spedizione().equals(true)) {
            entity.setSpedizione(entity.getIndirizzo());
        }
        entity.setRole("user");
        userRepository.save(entity);
        return ResponseEntity.status(HttpStatus.ACCEPTED).body("Utente registrato con successo");

    }

    @GetMapping("/logged-user-data")
    public ResponseEntity<?> getLoggedUserData(Authentication authentication) {
        String email = authentication.getName();
        UserLoginResponse response = new UserLoginResponse();
        Optional<User> userDataFromDb = userRepository.findByEmail(email);
        if (userDataFromDb.isPresent()) {
            response.setId(userDataFromDb.get().getId());
            response.setCodefiscale(userDataFromDb.get().getCodefiscale());
            response.setName(userDataFromDb.get().getName());
            response.setNazione(userDataFromDb.get().getNazione());
            response.setIndirizzo(userDataFromDb.get().getIndirizzo());
            response.setSpedizione(userDataFromDb.get().getSpedizione());
            response.setSurname(userDataFromDb.get().getSurname());
            response.setUserEmail(userDataFromDb.get().getEmail());
            response.setTelefono(userDataFromDb.get().getTelefono());
            response.setRole(userDataFromDb.get().getRole());
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found");
        }
        return ResponseEntity.ok(response);
    }

    @PutMapping("/edit-user-data")
    public ResponseEntity<?> editUserData(@RequestBody UpdateUserDataRequest body, Authentication authentication) {
        System.out.println(authentication.toString());
        if (authentication == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Token scaduto o non valido");
        }
        String email = authentication.getName();
        Optional<User> updatedUser = userRepository.findByEmail(email);
        updatedUser.get().setName(body.getName());
        updatedUser.get().setSurname(body.getSurname());
        updatedUser.get().setTelefono(body.getTelefono());
        updatedUser.get().setIndirizzo(body.getIndirizzo());
        userRepository.save(updatedUser.get());
        return ResponseEntity.status(HttpStatus.ACCEPTED).body("Utente modificato con successo");
    }

    @GetMapping("/verify-credentials")
    public ResponseEntity<?> verifyCredentials(Authentication authentication) {
        if (authentication == null || !authentication.isAuthenticated()) {
            System.out.println(ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Credenziali non valide oppure scadute"));
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Credenziali non valide oppure scadute");
        } else {
            System.out.println(ResponseEntity.status(HttpStatus.ACCEPTED).body("Credenziali valide"));
            return ResponseEntity.status(HttpStatus.ACCEPTED).body("Credenziali valide");
        }
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody User entity, HttpServletResponse response) {
        Optional<User> userByEmail = userRepository.findByEmail(entity.getEmail());
        if (userByEmail.isEmpty() || !userByEmail.get().getPassword().equals(entity.getPassword())) {
            System.out.println(ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Credenziali non valide"));
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Credenziali non valide");
        }
        String accessToken = jwtUtility.generateToken(userByEmail.get().getEmail(), userByEmail.get().getRole());
        String refreshToken = jwtUtility.generateRefreshToken(userByEmail.get().getEmail(), userByEmail.get().getRole());
        ResponseCookie cookie = ResponseCookie.from("refreshToken", refreshToken)
                .httpOnly(true)
                .secure(true)
                .path("/")
                .maxAge(7 * 24 * 60 * 60)
                .build();
        response.addHeader(HttpHeaders.SET_COOKIE, cookie.toString());
        return ResponseEntity.ok(Map.of("accessToken", accessToken, "role", userByEmail.get().getRole()));
    }

    @PostMapping("/refresh")
    public ResponseEntity<?> refresh(@CookieValue(value = "refreshToken", required = false) String refreshToken) {
        if (refreshToken == null || !jwtUtility.validateToken(refreshToken)) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Refresh token mancante o invalido");
        }
        String username = jwtUtility.extractUsername(refreshToken);
        String role = jwtUtility.extractRole(refreshToken);
        String newAccessToken = jwtUtility.generateToken(username, role);
        return ResponseEntity.ok(Map.entry("accessToken", newAccessToken));
    }

    @PostMapping("/logout")
    public ResponseEntity<?> logout(HttpServletResponse response) {
        ResponseCookie cookie = ResponseCookie.from("refreshToken", "")
                .httpOnly(true)
                .secure(true)
                .path("/")
                .maxAge(0)
                .sameSite("Strict")
                .build();
        response.addHeader(HttpHeaders.SET_COOKIE, cookie.toString());
        return ResponseEntity.ok("Logout effettuato");
    }

}
