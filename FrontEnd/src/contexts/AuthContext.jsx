import { useContext, createContext, useState } from "react";
import axios from "axios";
import { use } from "react";

// Creazione del contesto React per l'autenticazione.
const context = createContext()


export function AuthContext({ children }) {

    // Stato per memorizzare l'Access Token JWT.
    const [accessToken, setAccessToken] = useState()
    // Stato per il nome utente autenticato.
    const [userName, setUserName] = useState()
    // Stato per messaggi informativi da mostrare all'utente.
    const [infoPageMessage, setInfoPageMessage] = useState()

    // Configurazione di un'istanza di Axios con la base URL e le credenziali.
    const authApi = axios.create({
        baseURL: "http://localhost:8080",
        withCredentials: true
    })

    /**
     * @description Interceptor delle richieste: Aggiunge l'Access Token all'header 
     * di Autorizzazione per tutte le chiamate API se un token è disponibile.
     */
    authApi.interceptors.request.use(async (config) => {
        if (accessToken) {
            config.headers.Authorization = `Bearer ${accessToken}`
        }

        return config
    })

    /**
     * @description Interceptor delle risposte: Gestisce il refresh automatico del token.
     * 1. Cattura gli errori di risposta.
     * 2. Se la risposta è 401 (Non Autorizzato) e non è già in corso un tentativo di retry:
     * a. Tenta di ottenere un nuovo Access Token usando l'endpoint /users/refresh.
     * b. Aggiorna l'Access Token nello stato (setAccessToken).
     * c. Aggiorna l'header di Autorizzazione nella richiesta originale fallita.
     * d. Riprova la richiesta originale.
     * 3. Se il refresh fallisce, registra un errore e rigetta la Promessa.
     */
    authApi.interceptors.response.use(
        (response) => response,
        async (error) => {
            const originalRequest = error.config;

            // Verifica: 401, non è già un retry e non è la richiesta di refresh stessa
            if (
                error.response &&
                error.response.status === 401 &&
                !originalRequest._retry &&
                originalRequest.url !== "/users/refresh"
            ) {
                originalRequest._retry = true;

                try {
                    // 1. Chiamata all'endpoint di refresh
                    const response = await authApi.post("/users/refresh", {});

                    // 2. Aggiorna lo stato con il nuovo token
                    setAccessToken(response.data.accessToken);

                    // 3. Imposta il nuovo token nell'header della richiesta fallita
                    originalRequest.headers.Authorization = `Bearer ${response.data.accessToken}`;

                    // 4. Riprova la richiesta originale
                    return authApi.request(originalRequest);
                } catch (e) {
                    console.error("Refresh fallito, logout necessario");
                    return Promise.reject(e);
                }
            }

            // Rigetta l'errore se non è 401 o se il retry fallisce
            return Promise.reject(error);
        }
    );

    // Oggetto che contiene tutti i valori da esporre tramite il contesto.
    const values = { accessToken, setAccessToken, authApi, setUserName, userName, setInfoPageMessage, infoPageMessage }

    // Fornisce i valori del contesto ai componenti figli.
    return (
        <context.Provider value={values}>
            {children}
        </context.Provider>
    )
}

// Hook personalizzato per accedere facilmente ai valori del contesto.
export const useAuthContext = () => useContext(context)