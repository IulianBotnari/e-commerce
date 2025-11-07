import style from "./CartPage.module.scss"
import HeaderLayout from "../../components/HeaderLayout.jsx"
import NavBar from "../../components/NavBar.jsx"
import FooterLayout from "../../components/FooterLayout.jsx"
import Arrow from "../../assets/icons/icons8-freccia-100.png"


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
                            <p>CODICE</p>
                            <p>DESCRIZIONE</p>
                            <p>QUANTITA</p>
                            <p>PREZZO UNITARIO</p>
                            <p>PREZZO</p>
                        </div>
                        <div className={style.row}>
                            <img className={style.cart_img}></img>
                            <p className={style.cart_description}></p>
                            <input className={style.cart_quantity} value={1}></input>
                            <p className={style.cart_unit_price}></p>
                            <p className={style.total_product_price}> <button>delete</button></p>
                        </div>

                    </div>
                    <div className={style.left_card}>
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