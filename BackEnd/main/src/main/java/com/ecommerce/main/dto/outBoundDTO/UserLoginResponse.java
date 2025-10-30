package com.ecommerce.main.dto.outBoundDTO;

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
