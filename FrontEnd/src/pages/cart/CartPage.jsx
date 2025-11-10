import style from "./CartPage.module.scss"
import HeaderLayout from "../../components/HeaderLayout.jsx"
import NavBar from "../../components/NavBar.jsx"
import FooterLayout from "../../components/FooterLayout.jsx"
import Arrow from "../../assets/icons/icons8-freccia-100.png"
import { BiTrash } from "react-icons/bi";



export default function CartPage() {



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
                        <div className={style.row}>
                            <div>
                                <img src={Arrow} className={style.cart_img}></img>
                            </div>
                            <p className={style.cart_product_code}>20</p>
                            <p className={style.cart_description}>HP CarePack Estensione di Garanzia a 2 Anni PIck Up/Return - Attivazione da parte di NEXT</p>
                            <div>
                                <input type="number" min={1} className={style.cart_quantity}></input>
                            </div>
                            <p className={style.cart_unit_price}>234.99</p>
                            <p className={style.total_product_price}>239.99<button className={style.delete_from_cart}><BiTrash style={{ color: "red", fontSize: "20px" }} /></button></p>
                        </div>

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
                            <img src=""></img>
                            <button>Richiedila Adesso</button>
                        </div>
                    </div>
                </div>
            </div>

        </main>

        <FooterLayout />


    </>
}