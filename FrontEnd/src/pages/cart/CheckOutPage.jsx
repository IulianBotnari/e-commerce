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
import { useEffect, useState } from "react"
export default function CheckOutPage() {
    const [ritiroRadioSelect, setRitiroRadioSelect] = useState("Negozio di Limbiate")
    const [choosedPayment, setChoosedPayment] = useState("Presso negozio")
    const [displayPayments, setDisplayPayments] = useState()
    const [displayInStorePayment, setDisplayInStorePayment] = useState("block")
    const [displayPaymentCardData, setDysplayPaymentCardData] = useState("none")
    const [displayPaymentBankData, setDysplayPaymentBankData] = useState("none")
    const { userCart } = useGlobalContext()
    console.log("user cart in checkOutPage", userCart);


    function handleShippingAddress() {
        if (ritiroRadioSelect === "Consegna tramite Corriere") {
            setDisplayPayments("block")
            setDisplayInStorePayment("none")
        } else {
            setDisplayPayments("none")
            setDisplayInStorePayment("block")
        }
    }

    function handlePaymentSelection() {
        if (choosedPayment === "carta") {
            setDysplayPaymentCardData("block")
            setDysplayPaymentBankData("none")
        } else if (choosedPayment === "bonifico") {
            setDysplayPaymentBankData("block")
            setDysplayPaymentCardData("none")
        } else {
            setDysplayPaymentBankData("none")
            setDysplayPaymentCardData("none")
        }
    }


    useEffect(() => {
        handleShippingAddress()
    }, [ritiroRadioSelect])

    useEffect(() => {
        handlePaymentSelection()
    }, [choosedPayment])

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
                                checked={"Negozio di Limbiate" === ritiroRadioSelect}
                                onChange={(e) => setRitiroRadioSelect(e.target.value)}
                            ></input>
                            <label>Negozio di Limbiate</label>

                        </div>
                        <div className={style.store_choose}>
                            <input
                                type="radio"
                                value="Negozio di Cantù"
                                checked={"Negozio di Cantù" === ritiroRadioSelect}
                                onChange={(e) => setRitiroRadioSelect(e.target.value)}
                            ></input>
                            <label>Negozio di Cantù</label>

                        </div>
                        <div className={style.store_choose}>
                            <input
                                type="radio"
                                value="Negozio di Monza"
                                checked={"Negozio di Monza" === ritiroRadioSelect}
                                onChange={(e) => setRitiroRadioSelect(e.target.value)}
                            ></input>
                            <label>Negozio di Monza</label>

                        </div>
                        <div className={style.store_choose}>
                            <input
                                type="radio"
                                value="Negozio di Milano Via Vitruvio"
                                checked={"Negozio di Milano Via Vitruvio" === ritiroRadioSelect}
                                onChange={(e) => setRitiroRadioSelect(e.target.value)}
                            ></input>
                            <label>Negozio di Milano Via Vitruvio</label>

                        </div>
                        <div className={style.store_choose}>
                            <input
                                type="radio"
                                value="Negozio di Como"
                                checked={"Negozio di Como" === ritiroRadioSelect}
                                onChange={(e) => setRitiroRadioSelect(e.target.value)}
                            ></input>
                            <label>Negozio di Como</label>

                        </div>
                        <div className={style.store_choose}>
                            <input
                                type="radio"
                                value="Negozio di Seregno"
                                checked={"Negozio di Seregno" === ritiroRadioSelect}
                                onChange={(e) => setRitiroRadioSelect(e.target.value)}
                            ></input>
                            <label>Negozio di Seregno</label>

                        </div>
                        <div className={style.store_choose}>
                            <input
                                type="radio"
                                value="Negozio di Milano Via Procaccini"
                                checked={"Negozio di Milano Via Procaccini" === ritiroRadioSelect}
                                onChange={(e) => setRitiroRadioSelect(e.target.value)}
                            ></input>
                            <label>Negozio di Milano Via Procaccini</label>

                        </div>

                        <div className={style.store_choose}>
                            <input
                                type="radio"
                                value="Consegna tramite Corriere"
                                checked={"Consegna tramite Corriere" === ritiroRadioSelect}
                                onChange={(e) => setRitiroRadioSelect(e.target.value)}
                            ></input>
                            <label>Consegna tramite Corriere</label>

                        </div>

                        <div className={style.indirizzo_di_spedizione_card} style={{ display: `${displayPaymentCardData}` }} >
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
                        <div className={style.presso_negozio} style={{ display: `${displayInStorePayment}` }}>
                            <input type="checkbox" checked readOnly></input>
                            <label>Presso negozio</label>
                        </div>

                        <div className={style.payment_methods_card} style={{ display: `${displayPayments}` }}>

                            <div>
                                <input
                                    type="radio"
                                    value="carta"
                                    checked={choosedPayment === "carta"}
                                    onChange={(e) => setChoosedPayment(e.target.value)}
                                ></input>
                                <label>Carta di credito</label>
                                <span><FaCcVisa /><FaCcMastercard /></span>
                            </div>
                            <div>
                                <input
                                    type="radio"
                                    value="bonifico"
                                    checked={choosedPayment === "bonifico"}
                                    onChange={(e) => setChoosedPayment(e.target.value)}
                                ></input>
                                <label>Bonifico bancario anticipato</label>
                                <span><BsBank /></span>
                            </div>
                        </div>
                        <hr></hr>

                        <form className={style.card_data_form} style={{ display: `${displayPaymentCardData}` }}>
                            <div className={style.card_holder}>
                                <label for="cc-name">Titolare carta</label>
                                <input type="text" required />
                            </div>
                            <div className={style.card_number}>
                                <label for="cc-number">Numero carta</label>
                                <input type="text" maxlength="4" required /><span> / </span>
                                <input type="text" maxlength="4" required /><span> / </span>
                                <input type="text" maxlength="4" required /><span> / </span>
                                <input type="text" maxlength="4" required />
                            </div>
                            <div className={style.card_expire}>
                                <label for="cc-exp">Scadenza (MM/AA) </label>
                                <input type="text" maxlength="2" required /><span> / </span>
                                <input type="text" maxlength="2" required />
                            </div>
                            <div className={style.card_cvc}>
                                <label for="cc-cvc">CVC / CVV</label>
                                <input maxlength="3" required />
                            </div>
                            <div className={style.save_card}>
                                <label for="save-card">Salva metodo di pagamento</label>
                                <input type="checkbox" />
                            </div>
                        </form>

                        <form className={style.bank_data_form}>
                            <div className={style.bank_accoount_holder}>
                                <label>Titolare conto</label>
                                <input type="text"></input>
                            </div>
                            <div className={style.bank_name}>
                                <label>Nome istituto</label>
                                <input type="text"></input>
                            </div>
                            <div className={style.bank_account_number}>
                                <label>IBAN: </label>
                                <input type="text" maxLength="27"></input>
                            </div>

                            <div className={style.save_card}>
                                <label for="save-card">Salva metodo di pagamento</label>
                                <input type="checkbox" />
                            </div>
                        </form>
                        <p>Note</p>
                        <textarea rows="4"></textarea>

                    </div>
                    <div className={style.process_order_col}>
                        <div className={style.ritiro_consegna_header}>
                            <div className={style.circle}>
                                <span className={style.number}>3</span>
                            </div>
                            <span className={style.ritiro_consegna_title}>Riepilogo Carrello</span>
                            <span><FaShoppingCart /></span>
                        </div>
                        <div className={style.riepilogo_carrello}>
                            <div className={style.riepilogo_carrello_header}>
                                <p>Prodotto</p>
                                <p>Qty</p>
                                <p>Euro</p>
                            </div>

                            {userCart != null ? userCart.cart_items.map((element, index) => (

                                <div className={style.riepilogo_carrello_details} key={index}>
                                    <div>
                                        <img src={`data:image/jpeg;Base64,${element.image}`}></img>
                                        <p>{element.description}</p>
                                    </div>
                                    <p>{element.quantity}</p>
                                    <p>{element.totalPrice.toFixed(2)}</p>
                                </div>
                            )) : ""}
                            <div style={{ display: "flex", justifyContent: "space-between" }}>
                                <p>TOT.IVA inclusa</p>
                                <p>{userCart != null ? userCart.total_price.toFixed(2) : ""}</p>
                            </div>
                            <button className={style.order_button}>Procedi con l'ordine</button>
                        </div>
                    </div>
                </div>




            </div>

        </main>

        <FooterLayout />
    </>

}