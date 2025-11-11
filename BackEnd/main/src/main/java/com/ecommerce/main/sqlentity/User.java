package com.ecommerce.main.sqlentity;

import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Objects;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToOne;

@Entity
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    private String name;
    private String surname;
    private String email;
    private String codefiscale;
    private String password;
    private String telefono;
    private String indirizzo;
    private String nazione;
    private Boolean is_indirizzo_same_spedizione;
    private String spedizione;
    private LocalDateTime lastaccess;
    @OneToOne(mappedBy = "user", cascade = CascadeType.ALL)
    private Cart cart;
    private HashSet<String> paymentmethods;

    private String role;

    public User() {
    }

    public User(int id, String name, String surname, String email, String codefiscale, String password, String telefono,
            LocalDateTime lastaccess, HashSet<String> paymentmethods, String indirizzo, String nazione,
            Boolean is_indirizzo_same_spedizione, String spedizione) {
        this.id = id;
        this.name = name;
        this.surname = surname;
        this.email = email;
        this.codefiscale = codefiscale;
        this.password = password;
        this.telefono = telefono;
        this.lastaccess = lastaccess;
        this.paymentmethods = paymentmethods;
        this.indirizzo = indirizzo;
        this.nazione = nazione;
        this.is_indirizzo_same_spedizione = is_indirizzo_same_spedizione;

    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getSurname() {
        return surname;
    }

    public void setSurname(String surname) {
        this.surname = surname;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getCodefiscale() {
        return codefiscale;
    }

    public void setCodefiscale(String codefiscale) {
        this.codefiscale = codefiscale;
    }

    public HashSet<String> getPaymentmethods() {
        return paymentmethods;
    }

    public void setPaymentmethods(String paymentmethods) {
        if (paymentmethods != null) {
            this.paymentmethods.add(name);

        }
    }

    public LocalDateTime getLastaccess() {
        return lastaccess;
    }

    public void setLastaccess(LocalDateTime lastaccess) {
        this.lastaccess = lastaccess;
    }

    public String getTelefono() {
        return telefono;
    }

    public void setTelefono(String telefono) {
        this.telefono = telefono;
    }

    public String getIndirizzo() {
        return indirizzo;
    }

    public void setIndirizzo(String indirizzo) {
        this.indirizzo = indirizzo;
    }

    public String getNazione() {
        return nazione;
    }

    public void setNazione(String nazione) {
        this.nazione = nazione;
    }

    public Boolean getIs_indirizzo_same_spedizione() {
        return is_indirizzo_same_spedizione;
    }

    public void setIs_indirizzo_same_spedizione(Boolean is_indirizzo_same_spedizione) {
        this.is_indirizzo_same_spedizione = is_indirizzo_same_spedizione;
    }

    public String getSpedizione() {
        return spedizione;
    }

    public void setSpedizione(String spedizione) {
        this.spedizione = spedizione;
    }

    public String getRole() {
        return this.role;
    }

    public void setRole(String role) {
        this.role = role;
    }

    public Cart getCart() {
        return cart;
    }

    public void setCart(Cart carts) {
        this.cart = carts;
    }

    @Override
    public String toString() {
        return "User [id=" + id + ", name=" + name + ", surname=" + surname + ", email=" + email + ", codefiscale="
                + codefiscale + ", password=" + password + ", telefono=" + telefono + ", indirizzo=" + indirizzo
                + ", nazione=" + nazione + ", is_indirizzo_same_spedizione=" + is_indirizzo_same_spedizione
                + ", spedizione=" + spedizione + ", lastaccess=" + lastaccess + ", paymentmethods=" + paymentmethods
                + "]";
    }

    @Override
    public boolean equals(Object obj) {
        if (this == obj)
            return true;
        if (obj == null || getClass() != obj.getClass())
            return false;
        User other = (User) obj;
        return id == other.id;
    }

    @Override
    public int hashCode() {
        return Objects.hash(id);
    }

}
