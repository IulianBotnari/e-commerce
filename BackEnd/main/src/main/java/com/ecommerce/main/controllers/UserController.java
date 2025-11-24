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

/**
 * @fileoverview Controller REST per la gestione delle operazioni CRUD relative
 *               agli utenti e l'autenticazione.
 *
 * @class
 *        Espone gli endpoint API sotto il path base "/users" per:
 *        1. Registrazione di nuovi utenti.
 *        2. Login e generazione di token JWT/Refresh Token (salvato in cookie).
 *        3. Recupero e modifica dei dati dell'utente loggato.
 *        4. Refresh e Logout (pulizia del cookie).
 */
@RestController
@RequestMapping("/users")
public class UserController {

    private final JwtUtility jwtUtility;

    public UserController(JwtUtility jwtUtility) {
        this.jwtUtility = jwtUtility;
    }

    @Autowired
    UserRepository userRepository;

    /**
     * @PostMapping("/postuser")
     * Registra un nuovo utente nel sistema.
     * 
     * @param entity L'oggetto {@link User} contenente i dati di registrazione.
     * @return Una ResponseEntity con stato 202 (ACCEPTED) in caso di successo o 409
     *         (CONFLICT) se l'utente è già esistente (email o codice fiscale
     *         duplicato).
     */
    @PostMapping("/postuser")
    public ResponseEntity<?> postUser(@RequestBody User entity) {
        Optional<User> entityEmail = userRepository.findByEmail(entity.getEmail());
        Optional<User> entityCodFiscale = userRepository.findByCodefiscale(entity.getCodefiscale());
        if (entityEmail != null || entityCodFiscale != null) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body("Utente già esistente");

        }
        if (entity.getIs_indirizzo_same_spedizione().equals(true)) {
            entity.setSpedizione(entity.getIndirizzo());
        }
        entity.setRole("user");
        userRepository.save(entity);
        return ResponseEntity.status(HttpStatus.ACCEPTED).body("Utente registrato con successo");

    }

    /**
     * @GetMapping("/logged-user-data")
     * Recupera i dati del profilo dell'utente attualmente autenticato.
     * 
     * @param authentication Oggetto fornito da Spring Security che contiene le
     *                       informazioni sull'utente loggato (principal).
     * @return Una ResponseEntity con l'oggetto {@link UserLoginResponse} contenente
     *         i dati dell'utente. Ritorna 404 se l'utente non viene trovato nel DB.
     */
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

    /**
     * @PutMapping("/edit-user-data")
     * Aggiorna i dati del profilo (nome, cognome, telefono, indirizzo) dell'utente
     * autenticato.
     * 
     * @param body           L'oggetto DTO {@link UpdateUserDataRequest} con i campi
     *                       da aggiornare.
     * @param authentication Oggetto fornito da Spring Security per identificare
     *                       l'utente.
     * @return Una ResponseEntity con stato 202 (ACCEPTED) in caso di successo o 401
     *         (UNAUTHORIZED) se la sessione è scaduta.
     */
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

    /**
     * @GetMapping("/verify-credentials")
     * Verifica la validità e l'autenticazione delle credenziali attuali
     * (solitamente il JWT).
     * 
     * @param authentication Oggetto di autenticazione di Spring Security.
     * @return 202 (ACCEPTED) se le credenziali sono valide, 401 (UNAUTHORIZED)
     *         altrimenti.
     */
    @GetMapping("/verify-credentials")
    public ResponseEntity<?> verifyCredentials(Authentication authentication) {
        if (authentication == null || !authentication.isAuthenticated()) {
            System.out.println(
                    ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Credenziali non valide oppure scadute"));
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Credenziali non valide oppure scadute");
        } else {
            System.out.println(ResponseEntity.status(HttpStatus.ACCEPTED).body("Credenziali valide"));
            return ResponseEntity.status(HttpStatus.ACCEPTED).body("Credenziali valide");
        }
    }

    /**
     * @PostMapping("/login")
     * Esegue il login dell'utente tramite email e password.
     * In caso di successo, genera un Access Token (JWT) e un Refresh Token.
     * Il Refresh Token viene salvato in un cookie HTTP-Only per la sicurezza.
     * 
     * @param entity   L'oggetto {@link User} con email e password fornite.
     * @param response {@link HttpServletResponse} per impostare il cookie.
     * @return 200 OK con l'Access Token e il ruolo; 401 (UNAUTHORIZED) in caso di
     *         credenziali non valide.
     */
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody User entity, HttpServletResponse response) {
        Optional<User> userByEmail = userRepository.findByEmail(entity.getEmail());
        if (userByEmail.isEmpty() || !userByEmail.get().getPassword().equals(entity.getPassword())) {
            System.out.println(ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Credenziali non valide"));
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Credenziali non valide");
        }
        String accessToken = jwtUtility.generateToken(userByEmail.get().getEmail(), userByEmail.get().getRole());
        String refreshToken = jwtUtility.generateRefreshToken(userByEmail.get().getEmail(),
                userByEmail.get().getRole());
        ResponseCookie cookie = ResponseCookie.from("refreshToken", refreshToken)
                .httpOnly(true)
                .secure(true)
                .sameSite("Strict")
                .path("/")
                .maxAge(7 * 24 * 60 * 60)
                .build();
        response.addHeader(HttpHeaders.SET_COOKIE, cookie.toString());
        return ResponseEntity.ok(Map.of("accessToken", accessToken, "role", userByEmail.get().getRole(),"userId", userByEmail.get().getId(),"userName",userByEmail.get().getName()));
    }

    /**
     * @PostMapping("/refresh")
     * Utilizza il Refresh Token salvato nel cookie per generare un nuovo Access
     * Token.
     * 
     * @param refreshToken Il Refresh Token letto dal cookie con @CookieValue.
     * @return 200 OK con un nuovo Access Token; 401 (UNAUTHORIZED) se il token non
     *         è valido o assente.
     */
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

    /**
     * @PostMapping("/logout")
     * Esegue il logout invalidando il Refresh Token nel browser tramite
     * l'impostazione di un cookie vuoto con maxAge=0.
     * 
     * @param response {@link HttpServletResponse} per inviare l'header Set-Cookie.
     * @return 200 OK con messaggio di conferma.
     */
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
