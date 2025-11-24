import { useContext, createContext, useState, useEffect } from "react";
import { useAuthContext } from "./AuthContext";

// Creazione del contesto globale per l'applicazione
const context = createContext()

// Componente che fornisce il contesto globale a tutti i componenti figli
export function GlobalContext({ children }) {

    // Recupera l'oggetto authApi dal contesto di autenticazione
    const { authApi } = useAuthContext()

    // Stato che tiene traccia del numero totale di prodotti nel carrello
    const [cartLength, setCartLength] = useState(0)

    // Setta il carrello del utente
    const [userCart, setUserCart] = useState()

    // Verifica se le credenziali dell’utente sono ancora valide
    async function verifyCredential() {
        try {
            // Effettua una chiamata all’endpoint di verifica autenticazione
            const response = await authApi.get('/users/verify-credentials')

            // Se le credenziali sono valide, aggiorna i dati del carrello
            getCartProducts()

        } catch (error) {
            console.log(error.status);

            // Se la verifica fallisce, rimuove i dati dell’utente salvati
            setUserCart("")
            localStorage.setItem("accessToken", null)
            localStorage.setItem("userName", null)
            localStorage.setItem("userId", null)

            // Reimposta il numero di prodotti del carrello a 0
            setCartLength(0)
        }
    }

    // Recupera i prodotti del carrello per l’utente corrente
    async function getCartProducts() {
        try {
            // Ottiene l'ID dell'utente dal localStorage
            const userId = localStorage.getItem("userId")

            // Effettua una chiamata API per ottenere i prodotti del carrello
            const response = await authApi.get(`/cart/cartbyuser/${userId}`)
            console.log(response.data);


            // Calcola la quantità totale dei prodotti nel carrello
            const array = response.data.cart_items
            let tempQuantity = 0
            array.forEach(element => {
                tempQuantity += element.quantity
            });


            // Aggiorna lo stato con la quantità totale di prodotti
            setCartLength(tempQuantity)

            setUserCart(response.data)

        } catch (error) {
            console.error(error);
        }
    }

    // Effettua la verifica delle credenziali al montaggio del componente
    useEffect(() => {
        verifyCredential()
    }, [])

    // Valori e funzioni che verranno condivisi tramite il contesto
    const values = {
        cartLength, setCartLength, getCartProducts, setUserCart, userCart
    }

    // Ritorna il provider del contesto, rendendo i valori disponibili ai figli
    return (
        <context.Provider value={values}>
            {children}
        </context.Provider>
    )
}

// Hook personalizzato per utilizzare il contesto in altri componenti
export const useGlobalContext = () => useContext(context)