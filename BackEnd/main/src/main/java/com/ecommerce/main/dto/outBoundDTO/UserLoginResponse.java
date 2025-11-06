package com.ecommerce.main.dto.outBoundDTO;
/**
 * @fileoverview Data Transfer Object (DTO) utilizzato per incapsulare i dati di risposta
 * dopo un login di successo o per trasmettere i dati del profilo dell'utente autenticato al frontend.
 *
 * @class
 * Questa classe è un OutBound DTO, utilizzato per i dati che vengono inviati (in uscita)
 * dall'applicazione verso il client. Contiene i dati essenziali del profilo utente e,
 * in alcuni contesti (come il login), l'Access Token JWT.
 */
public class UserLoginResponse {

    private String accessToken;
    private int id;
    private String name;
    private String surname;
    private String userEmail;
    private String codefiscale;
    private String indirizzo;
    private String spedizione;
    private String nazione;
    private String telefono;
    private String role;
    


    public UserLoginResponse(){
        
    }
/**
     * Costruttore completo per {@link UserLoginResponse}.
     * Include tutti i campi relativi al profilo utente e l'Access Token.
     * * @param accessToken Il token JWT utilizzato per l'autorizzazione successiva (Access Token).
     * @param id L'ID univoco dell'utente.
     * @param codefiscale Il codice fiscale dell'utente.
     * @param indirizzo L'indirizzo di fatturazione/residenza dell'utente.
     * @param nazione La nazione dell'utente.
     * @param spedizione L'indirizzo di spedizione dell'utente.
     * @param surname Il cognome dell'utente.
     * @param userEmail L'email (username) dell'utente.
     * @param name Il nome dell'utente.
     * @param telefono Il numero di telefono dell'utente.
     * @param role Il ruolo dell'utente (es. "user", "admin").
     */
    public UserLoginResponse(String accessToken, int id, String codefiscale, String indirizzo, String nazione, String spedizione, String surname, String userEmail, String name, String telefono, String role) {
        this.accessToken = accessToken;
        this.id = id;
        this.codefiscale = codefiscale;
        this.indirizzo = indirizzo;
        this.nazione = nazione;
        this.spedizione = spedizione;
        this.surname = surname;
        this.userEmail = userEmail;
        this.name = name;
        this.telefono = telefono;
        this.role = role;
    }

    public String getAccessToken() {
        return accessToken;
    }

    public String getname() {
        return name;
    }

    public String getSurname() {
        return surname;
    }

    public String getUserEmail() {
        return userEmail;
    }

    public String getCodefiscale() {
        return codefiscale;
    }

    public String getIndirizzo() {
        return indirizzo;
    }

    public String getSpedizione() {
        return spedizione;
    }

    public String getNazione() {
        return nazione;
    }

    public int getId(){
        return this.id;
    }

    public String getTelefono(){
        return this.telefono;
    }

    public void setAccessToken(String accessToken) {
        this.accessToken = accessToken;
    }

    public void setId(int id) {
        this.id = id;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setSurname(String surname) {
        this.surname = surname;
    }

    public void setUserEmail(String userEmail) {
        this.userEmail = userEmail;
    }

    public void setCodefiscale(String codefiscale) {
        this.codefiscale = codefiscale;
    }

    public void setIndirizzo(String indirizzo) {
        this.indirizzo = indirizzo;
    }

    public void setSpedizione(String spedizione) {
        this.spedizione = spedizione;
    }

    public void setNazione(String nazione) {
        this.nazione = nazione;
    }

    public void setTelefono(String telefono){
        this.telefono = telefono;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }

    



    
}
