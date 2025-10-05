package com.ecommerce.main.dto.inBoundDTO;

public class UpdateUserDataRequest {
    

    private String name;
    private String surname;
    private String telefono;
    private String indirizzo;

    public UpdateUserDataRequest(String indirizzo, String name, String surname, String telefono) {
        this.indirizzo = indirizzo;
        this.name = name;
        this.surname = surname;
        this.telefono = telefono;
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


    


}
