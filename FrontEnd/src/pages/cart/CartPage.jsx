import style from "./CartPage.module.scss"
import HeaderLayout from "../../components/HeaderLayout.jsx"
import NavBar from "../../components/NavBar.jsx"
import FooterLayout from "../../components/FooterLayout.jsx"
import Arrow from "../../assets/icons/icons8-freccia-100.png"
import { BiTrash } from "react-icons/bi";
import { useAuthContext } from "../../contexts/AuthContext.jsx"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { useGlobalContext } from "../../contexts/GlobalContext.jsx"



export default function CartPage() {
    // Ottieni l'oggetto authApi dal contesto di autenticazione
    const { authApi } = useAuthContext()

    // Ottieni gli oggetti dal dal global context

    const { userCart, setUserCart } = useGlobalContext()

    // Stato locale per memorizzare i prodotti nel carrello dell'utente


    // Hook per navigare tra le pagine
    const navigate = useNavigate()

    // Funzione asincrona per recuperare i prodotti nel carrello dell'utente
    async function getCartProducts() {
        try {
            // Recupera l'ID utente dal localStorage
            const userId = localStorage.getItem("userId")

            // Effettua la chiamata API per ottenere il carrello associato all'utente
            const response = await authApi.get(`/cart/cartbyuser/${userId}`)

            // Aggiorna lo stato locale con i dati del carrello
            setUserCart(response.data)

        } catch (error) {
            console.error(error);
        }
    }

    // Funzione per modificare la quantità di un prodotto nel carrello
    async function changeQuantityProduct(cartItemId, quantity) {
        try {
            // Effettua una richiesta PUT per aggiornare la quantità
            const response = await authApi.put(
                `/cart/changequantity/${cartItemId}`,
                quantity, // corpo della richiesta
                { headers: { "Content-Type": "application/json" } }
            )
        } catch (error) {
            console.error(error);
        }
    }

    // Effettua la chiamata per caricare i prodotti del carrello al montaggio del componente
    useEffect(() => {
        getCartProducts()
    }, [])

    // Gestore del cambiamento di quantità (quando l’utente modifica l’input)
    async function handleQuantityChange(e) {
        const { value } = e.target
        // Recupera l’ID del cartItem dall’attributo personalizzato
        const cartItemId = e.target.getAttribute("data-cartitemidattribute")

        // Aggiorna la quantità sul server
        await changeQuantityProduct(cartItemId, value)

        // Ricarica i dati aggiornati del carrello
        getCartProducts()
    }

    // Funzione per rimuovere un prodotto dal carrello
    async function deleteItemFromCart(cartId, productId) {
        try {
            // Chiamata API DELETE per eliminare un prodotto specifico dal carrello
            const response = await authApi.delete(`/cart/${cartId}/remove/${productId}`)
            console.log("Prodotto eliminato con successo");

            // Aggiorna il carrello dopo la rimozione
            getCartProducts()
        } catch (error) {
            console.error(error);
        }
    }


    return <>
        <HeaderLayout />
        <NavBar />
        <main style={{ minHeight: "600px", alignItems: "center" }}>
            <div className={style.cart_container}>
                <div className={style.title}><p>Carrello</p><img src={Arrow}></img><p>Checkout</p></div>

                <div>
                    <div className={style.cart_details}>
                        <p className={style.products_in_cart}>Prodotti nel Carrello</p>
                        <div className={style.notehead}>
                            <p>IMMAGINE</p>
                            <p>CODICE</p>
                            <p>DESCRIZIONE</p>
                            <p>QUANTITA</p>
                            <p>PREZZO UNITARIO</p>
                            <p>PREZZO</p>
                        </div>
                        {userCart?.map((element, index) => (

                            <div className={style.row} key={index}>
                                <div>
                                    <img src={`data:image/jpeg;base64,${element.image}`} className={style.cart_img}></img>
                                </div>
                                <p className={style.cart_product_code}>{element.productCode}</p>
                                <p className={style.cart_description}>{element.description}</p>
                                <div>
                                    <input type="number" min={1} className={style.cart_quantity} defaultValue={element.quantity} data-cartitemidattribute={element.cartItemId} onChange={(e) => handleQuantityChange(e)}></input>
                                </div>
                                <p className={style.cart_unit_price}>{element.unitPrice.toFixed(2)}</p>
                                <p className={style.total_product_price}>{(element.totalPrice - (element.totalPrice / 100 * element.discountValue)).toFixed(2)}<button className={style.delete_from_cart} onClick={() => deleteItemFromCart(element.cartId, element.productId)}><BiTrash style={{ color: "red", fontSize: "20px" }} /></button></p>
                            </div>
                        ))}

                        <div className={style.vai_alla_cassa_container}>
                            <button onClick={() => navigate('/user/cart/checkout')}>Vai alla cassa</button>
                        </div>

                    </div>
                    <div className={style.right_cards}>
                        <div>
                            <p>Codice Sconto</p>
                            <input type="text"></input>
                            <button>Applica Codice</button>
                        </div>
                        <div>
                            <p>Richiedi anche tu la NEXTCARD!</p>
                            <p>Accumula punti per ogni tuo ordine: si trasfrmeranno in Biono Sconto per i successivi acquisti</p>
                            <img src={null}></img>
                            <button>Richiedila Adesso</button>
                        </div>
                    </div>
                </div>
            </div>

        </main>

        <FooterLayout />


    </>
}