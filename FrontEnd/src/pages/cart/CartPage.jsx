import style from "./CartPage.module.scss"
import HeaderLayout from "../../components/HeaderLayout.jsx"
import NavBar from "../../components/NavBar.jsx"
import FooterLayout from "../../components/FooterLayout.jsx"
import Arrow from "../../assets/icons/icons8-freccia-100.png"
import { BiTrash } from "react-icons/bi";
import { useAuthContext } from "../../contexts/AuthContext.jsx"
import { useEffect, useState } from "react"



export default function CartPage() {
    const { authApi, userId } = useAuthContext()
    const [userCart, setUserCart] = useState()
    async function getCartProducts() {
        try {
            const response = await authApi.get(`/cart/cartbyuser/${userId}`)
            console.log("Dati prodotti ", response.data);

            setUserCart(response.data)

        } catch (error) {
            console.error(error);
        }
    }

    async function changeQuantityProduct(cartItemId, quantity) {
        try {
            const response = await authApi.put(`/cart/changequantity/${cartItemId}`, quantity, {
                headers: { "Content-Type": "application/json" }
            })
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        getCartProducts()
    }, [])
    async function handleQuantityChange(e) {
        const { value } = e.target
        const cartItemId = e.target.getAttribute("data-cartItemIdAttribute");
        await changeQuantityProduct(cartItemId, value)
        getCartProducts()
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
                                    <input type="number" min={1} className={style.cart_quantity} defaultValue={element.quantity} data-cartItemIdAttribute={element.cartItemId} onChange={(e) => handleQuantityChange(e)}></input>
                                </div>
                                <p className={style.cart_unit_price}>{element.unitPrice}</p>
                                <p className={style.total_product_price}>{element.totalPrice}<button className={style.delete_from_cart}><BiTrash style={{ color: "red", fontSize: "20px" }} /></button></p>
                            </div>
                        ))}

                        <div className={style.vai_alla_cassa_container}>
                            <button>Vai alla cassa</button>
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