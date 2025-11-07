import style from "./CartPage.module.scss"
import HeaderLayout from "../../components/HeaderLayout.jsx"
import NavBar from "../../components/NavBar.jsx"
import FooterLayout from "../../components/FooterLayout.jsx"
import Arrow from "../../assets/icons/icons8-freccia-100.png"


export default function CartPage() {



    return <>
        <HeaderLayout />
        <NavBar />
        <main>
            <div className={style.cart_container}>
                <div className={style.title}><p>Carrello</p><img src={Arrow}></img><p>Checkout</p></div>

                <div>
                    <div className={style.cart_details}>
                        <p>Prodotti nel Carrello</p>
                        <div className={style.notehead}>
                            <p>CODICE</p>
                            <p>DESCRIZIONE</p>
                            <p>QUANTITA</p>
                            <p>PREZZO UNITARIO</p>
                            <p>PREZZO</p>
                        </div>

                    </div>
                    <div>
                        <div>
                            <p>Codice Sconto</p>
                            <input type="text"></input>
                            <button>Applica Codice</button>
                        </div>
                        <div>
                            <p>Richiedi anche tu la NEXTCARD!</p>
                            <p>Accumula punti per ogni tuo ordine: si trasfrmeranno in Biono Sconto per i successivi acquisti</p>
                            <img src=""></img>
                            <button></button>
                        </div>
                    </div>
                </div>
            </div>

        </main>

        <FooterLayout />


    </>
}