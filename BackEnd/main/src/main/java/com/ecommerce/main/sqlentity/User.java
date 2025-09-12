package com.ecommerce.main.sqlentity;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.HashSet;

import com.fasterxml.jackson.annotation.JsonFormat;

import jakarta.persistence.Column;
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

    private LocalDate dateofbirth;
    private String codefiscale;
    private HashSet<String> paymentmethods;
    private LocalDateTime lastaccess;

    public User() {
    }

    public User(int id, String name, String surname, String email, LocalDate dateofbirth, String codefiscale,
            HashSet<String> paymentmethods, LocalDateTime lastaccess) {
        this.id = id;
        this.name = name;
        this.surname = surname;
        this.email = email;
        this.dateofbirth = dateofbirth;
        this.codefiscale = codefiscale;
        this.paymentmethods = paymentmethods;
        this.lastaccess = lastaccess;
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

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd")
    @Column(nullable = false)
    public LocalDate getDateofbirth() {
        return dateofbirth;
    }

    public void setDateofbirth(LocalDate dateofbirth) {
        this.dateofbirth = dateofbirth;
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

    @Override
    public String toString() {
        return "User [id=" + id + ", name=" + name + ", surname=" + surname + ", email=" + email + ", date="
                + dateofbirth
                + ", codefiscale=" + codefiscale + ", paymentmethods=" + paymentmethods + ", lastaccess=" + lastaccess
                + "]";
    }

    @Override
    public int hashCode() {
        final int prime = 31;
        int result = 1;
        result = prime * result + id;
        result = prime * result + ((name == null) ? 0 : name.hashCode());
        result = prime * result + ((surname == null) ? 0 : surname.hashCode());
        result = prime * result + ((email == null) ? 0 : email.hashCode());
        result = prime * result + ((dateofbirth == null) ? 0 : dateofbirth.hashCode());
        result = prime * result + ((codefiscale == null) ? 0 : codefiscale.hashCode());
        result = prime * result + ((paymentmethods == null) ? 0 : paymentmethods.hashCode());
        result = prime * result + ((lastaccess == null) ? 0 : lastaccess.hashCode());
        return result;
    }

    @Override
    public boolean equals(Object obj) {
        if (this == obj)
            return true;
        if (obj == null)
            return false;
        if (getClass() != obj.getClass())
            return false;
        User other = (User) obj;
        if (id != other.id)
            return false;
        if (name == null) {
            if (other.name != null)
                return false;
        } else if (!name.equals(other.name))
            return false;
        if (surname == null) {
            if (other.surname != null)
                return false;
        } else if (!surname.equals(other.surname))
            return false;
        if (email == null) {
            if (other.email != null)
                return false;
        } else if (!email.equals(other.email))
            return false;
        if (dateofbirth == null) {
            if (other.dateofbirth != null)
                return false;
        } else if (!dateofbirth.equals(other.dateofbirth))
            return false;
        if (codefiscale == null) {
            if (other.codefiscale != null)
                return false;
        } else if (!codefiscale.equals(other.codefiscale))
            return false;
        if (paymentmethods == null) {
            if (other.paymentmethods != null)
                return false;
        } else if (!paymentmethods.equals(other.paymentmethods))
            return false;
        if (lastaccess == null) {
            if (other.lastaccess != null)
                return false;
        } else if (!lastaccess.equals(other.lastaccess))
            return false;
        return true;
    }

}
