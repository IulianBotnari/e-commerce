import HeaderLayout from "../../components/HeaderLayout"
import NavBar from "../../components/NavBar"
import FooterLayout from "../../components/FooterLayout"
import style from "./CheckOutPage.module.scss"
import Arrow from "../../assets/icons/icons8-freccia-100.png"
import { MdLocalShipping } from "react-icons/md";
import { FaEuroSign } from "react-icons/fa";
import { FaShoppingCart } from "react-icons/fa";
import { FaCcPaypal } from "react-icons/fa6";
import { FaCcVisa } from "react-icons/fa6";
import { FaCcMastercard } from "react-icons/fa6";
import { BsBank } from "react-icons/bs";
import { useAuthContext } from "../../contexts/AuthContext"
import { useGlobalContext } from "../../contexts/GlobalContext"
import { useState } from "react"
export default function CheckOutPage() {
    const [radioSelected, setRadioSelected] = useState("Negozio di Limbiate")

    return <>
        <HeaderLayout />
        <NavBar />
        <main>

            <div className={style.check_out_container} style={{ height: "800px" }}>
                <div className={style.title}><p>Carrello</p><img src={Arrow}></img><p>Checkout</p></div>

                <div className={style.process_order_container}>
                    <div className={style.process_order_col}>
                        <div className={style.ritiro_consegna_header}>
                            <div className={style.circle}>
                                <span className={style.number}>1</span>
                            </div>
                            <span className={style.ritiro_consegna_title}>Ritiro/Consegna</span>
                            <span><MdLocalShipping /></span>
                        </div>

                        <p>Ritiro presso negozio</p>

                        <div className={style.store_choose}>
                            <input
                                type="radio"
                                value="Negozio di Limbiate"
                                checked={"Negozio di Limbiate" === radioSelected}
                                onChange={(e) => setRadioSelected(e.target.value)}
                            ></input>
                            <label>Negozio di Limbiate</label>

                        </div>
                        <div className={style.store_choose}>
                            <input
                                type="radio"
                                value="Negozio di Cantù"
                                checked={"Negozio di Cantù" === radioSelected}
                                onChange={(e) => setRadioSelected(e.target.value)}
                            ></input>
                            <label>Negozio di Cantù</label>

                        </div>
                        <div className={style.store_choose}>
                            <input
                                type="radio"
                                value="Negozio di Monza"
                                checked={"Negozio di Monza" === radioSelected}
                                onChange={(e) => setRadioSelected(e.target.value)}
                            ></input>
                            <label>Negozio di Monza</label>

                        </div>
                        <div className={style.store_choose}>
                            <input
                                type="radio"
                                value="Negozio di Milano Via Vitruvio"
                                checked={"Negozio di Milano Via Vitruvio" === radioSelected}
                                onChange={(e) => setRadioSelected(e.target.value)}
                            ></input>
                            <label>Negozio di Milano Via Vitruvio</label>

                        </div>
                        <div className={style.store_choose}>
                            <input
                                type="radio"
                                value="Negozio di Como"
                                checked={"Negozio di Como" === radioSelected}
                                onChange={(e) => setRadioSelected(e.target.value)}
                            ></input>
                            <label>Negozio di Como</label>

                        </div>
                        <div className={style.store_choose}>
                            <input
                                type="radio"
                                value="Negozio di Seregno"
                                checked={"Negozio di Seregno" === radioSelected}
                                onChange={(e) => setRadioSelected(e.target.value)}
                            ></input>
                            <label>Negozio di Seregno</label>

                        </div>
                        <div className={style.store_choose}>
                            <input
                                type="radio"
                                value="Negozio di Milano Via Procaccini"
                                checked={"Negozio di Milano Via Procaccini" === radioSelected}
                                onChange={(e) => setRadioSelected(e.target.value)}
                            ></input>
                            <label>Negozio di Milano Via Procaccini</label>

                        </div>

                        <div className={style.store_choose}>
                            <input
                                type="radio"
                                value="Consegna tramite Corriere"
                                checked={"Consegna tramite Corriere" === radioSelected}
                                onChange={(e) => setRadioSelected(e.target.value)}
                            ></input>
                            <label>Consegna tramite Corriere</label>

                        </div>

                        <div className={style.indirizzo_di_spedizione_card}>
                            <div>
                                <p>Indirizzo di spedizione</p>
                                <p>Consegnata a:</p>
                                <p>Nome</p>
                                <p>Cognome</p>
                                <p>Via...</p>
                                <p>cap,Citta</p>
                                <p>numero di telefono</p>
                            </div>
                        </div>


                    </div>
                    <div className={style.process_order_col}>
                        <div className={style.ritiro_consegna_header}>
                            <div className={style.circle}>
                                <span className={style.number}>2</span>
                            </div>
                            <span className={style.ritiro_consegna_title}>Pagamento</span>
                            <span><FaEuroSign /></span>
                        </div>
                        <p>Pagamenti possibili in base al tipo di cosnsegna</p>
                        <div>

                            <input type="checkbox"></input>
                            <label>Presso negozio</label>
                        </div>

                        <div className={style.payment_methods_card}>
                            <div>
                                <input
                                    type="radio"
                                    value="paypal"
                                // checked={radioSelected === "Megozio di Milano Via Procaccini"}
                                ></input>
                                <label>Pagamento tramite paypal</label>
                                <span><FaCcPaypal /></span>

                            </div>
                            <div>
                                <input
                                    type="radio"
                                    value="carta"
                                // checked={radioSelected === "Megozio di Milano Via Procaccini"}
                                ></input>
                                <label>Carta di credito</label>
                                <span><FaCcVisa /><FaCcMastercard /></span>

                            </div>
                            <div>
                                <input
                                    type="radio"
                                    value="bonifico"
                                // checked={radioSelected === "Megozio di Milano Via Procaccini"}
                                ></input>
                                <label>Bonifico bancario anticipato</label>
                                <span><BsBank /></span>

                            </div>
                            <hr></hr>
                            <p>Note</p>
                            <textarea rows="4"></textarea>
                        </div>

                    </div>
                    <div className={style.process_order_col}>
                        <div className={style.ritiro_consegna_header}>
                            <div className={style.circle}>
                                <span className={style.number}>3</span>
                            </div>
                            <span className={style.ritiro_consegna_title}>Ritiro/Consegna</span>
                            <span><FaShoppingCart /></span>
                        </div>
                    </div>
                    <div className={style.pagamento}></div>
                    <div className={style.riepilogo_carrello}></div>
                </div>




            </div>

        </main>

        <FooterLayout />
    </>

}