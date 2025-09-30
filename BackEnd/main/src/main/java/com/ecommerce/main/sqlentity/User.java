package com.ecommerce.main.sqlentity;

import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Objects;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

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
    private byte is_indirizzo_same_spedizione;
    private String spedizione;
    private LocalDateTime lastaccess;
    private HashSet<String> paymentmethods;

    public User() {
    }

    public User(int id, String name, String surname, String email,String codefiscale, String password, String telefono, 
           LocalDateTime lastaccess, HashSet<String> paymentmethods,String indirizzo,String nazione, byte is_indirizzo_same_spedizione, String spedizione) {
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
        if(is_indirizzo_same_spedizione == 1){
            this.spedizione = indirizzo; 
        }
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

    public byte getIs_indirizzo_same_spedizione() {
        return is_indirizzo_same_spedizione;
    }

    public void setIs_indirizzo_same_spedizione(byte is_indirizzo_same_spedizione) {
        this.is_indirizzo_same_spedizione = is_indirizzo_same_spedizione;
    }

    public String getSpedizione() {
        return spedizione;
    }

    public void setSpedizione(String spedizione) {
        this.spedizione = spedizione;
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
        if (this == obj) {
            return true;
        }
        if (obj == null) {
            return false;
        }
        if (getClass() != obj.getClass()) {
            return false;
        }
        final User other = (User) obj;
        if (this.id != other.id) {
            return false;
        }
        if (this.is_indirizzo_same_spedizione != other.is_indirizzo_same_spedizione) {
            return false;
        }
        if (!Objects.equals(this.name, other.name)) {
            return false;
        }
        if (!Objects.equals(this.surname, other.surname)) {
            return false;
        }
        if (!Objects.equals(this.email, other.email)) {
            return false;
        }
        if (!Objects.equals(this.codefiscale, other.codefiscale)) {
            return false;
        }
        if (!Objects.equals(this.password, other.password)) {
            return false;
        }
        if (!Objects.equals(this.telefono, other.telefono)) {
            return false;
        }
        if (!Objects.equals(this.indirizzo, other.indirizzo)) {
            return false;
        }
        if (!Objects.equals(this.nazione, other.nazione)) {
            return false;
        }
        if (!Objects.equals(this.spedizione, other.spedizione)) {
            return false;
        }
        if (!Objects.equals(this.lastaccess, other.lastaccess)) {
            return false;
        }
        return Objects.equals(this.paymentmethods, other.paymentmethods);
    }

    @Override
    public int hashCode() {
        int hash = 5;
        hash = 67 * hash + this.id;
        hash = 67 * hash + Objects.hashCode(this.name);
        hash = 67 * hash + Objects.hashCode(this.surname);
        hash = 67 * hash + Objects.hashCode(this.email);
        hash = 67 * hash + Objects.hashCode(this.codefiscale);
        hash = 67 * hash + Objects.hashCode(this.password);
        hash = 67 * hash + Objects.hashCode(this.telefono);
        hash = 67 * hash + Objects.hashCode(this.indirizzo);
        hash = 67 * hash + Objects.hashCode(this.nazione);
        hash = 67 * hash + Objects.hashCode(this.is_indirizzo_same_spedizione);
        hash = 67 * hash + Objects.hashCode(this.spedizione);
        hash = 67 * hash + Objects.hashCode(this.lastaccess);
        hash = 67 * hash + Objects.hashCode(this.paymentmethods);
        return hash;
    }

    
    

    




}
