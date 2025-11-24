package com.ecommerce.main.dto.inBoundDTO;

/**
 * @fileoverview Data Transfer Object (DTO) utilizzato per incapsulare i dati di
 *               richiesta
 *               necessari per l'aggiornamento del profilo di un utente
 *               esistente.
 *
 * @class
 *        Questa classe è usata come corpo (payload) delle richieste in ingresso
 *        (InBound DTO)
 *        all'API, in particolare per l'endpoint di modifica dei dati utente.
 *        Include solo i campi che possono essere modificati dall'utente (nome,
 *        cognome, telefono, indirizzo).
 */
public class UpdateUserDataRequest {

    private String name;
    private String surname;
    private String telefono;
    private String indirizzo;

    /**
     * Costruttore per {@link UpdateUserDataRequest}.
     * 
     * @param indirizzo Il nuovo indirizzo dell'utente.
     * @param name      Il nuovo nome dell'utente.
     * @param surname   Il nuovo cognome dell'utente.
     * @param telefono  Il nuovo numero di telefono dell'utente.
     */
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
