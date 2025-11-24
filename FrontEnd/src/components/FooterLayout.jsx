import finanziamenti from '../assets/footerassets/finanziamenti-agos-finanziamentionline-pagodil.png'
import pagamenti from '../assets/footerassets/pagamento-unicredit-visa-mastercard.png'
import pagamentiPrep from '../assets/footerassets/pagamenti-postepay-paypal-satispay.png'
import style from './componentsStyle/FooterLayout.module.scss'
import { Link } from 'react-router-dom'



export default function FooterLayout() {


    return <>
        <div id='footer_container' className={style.footer_container}>
            <div id='site_infromation_row' className={style.site_information_row}>
                <div>
                    <Link>Chi siamo</Link>
                    <Link>I nostri negozi</Link>
                    <Link>Next card</Link>
                    <Link>Acquistare sul sito</Link>
                    <Link>Monitorare i propri ordini</Link>
                    <Link>Tutti i marchi</Link>
                    <Link>Listino rivenditori</Link>
                </div>

                <div>
                    <Link>Condizioni Generali di Vendita</Link>
                    <Link>Registrazione e Login sul sito</Link>
                    <Link>Area Personale</Link>
                    <Link>Spedizioni</Link>
                    <Link>Segnalazione Anomalie Logistiche</Link>
                    <Link>Garanzia e Assistenza</Link>
                    <Link>Modulo Reso / Riparazione</Link>
                </div>

                <div>
                    <Link>Metodi di Pagamento</Link>
                    <Link>Prezzi</Link>
                    <Link>Promozioni</Link>
                    <Link>Noleggio Operativo</Link>
                    <Link>Acquisto con IVA agevolata</Link>
                    <Link>Dote Scuola</Link>
                    <Link>Carta del Docente</Link>
                </div>

                <div>
                    <Link>Offerte Volantino</Link>
                    <Link>Next Magazine</Link>
                    <Link>Contatti</Link>
                    <Link>F.A.Q.</Link>
                    <Link>Lavora con noi</Link>
                    <Link>Cookie Policy</Link>
                    <Link>Privacy Policy</Link>
                </div>
            </div>

            <div id='payment_row' className={style.payment_row}>
                <div>
                    <img src={pagamenti}></img>
                </div>

                <div>
                    <img src={pagamentiPrep}></img>
                </div>

                <div>
                    <img src={finanziamenti}></img>
                </div>
            </div>
            <div id='buisness_information_row' className={style.buisness_information_row}>
                <div>
                    <span>NEXT HARDWARE & SOFTWARE SPA</span>
                    <span>Sede amministrativa</span>
                    <span>Via Di Vittorio 14 20813 Bovisio Masciago (MB)</span>
                    <span>P.IVA e C.F. 02879420962</span>
                    <span>Codice Interscambio Fatturazione: A4707H7</span>
                </div>

                <div>
                    <span>R.E.A. Monza e Brianza 1591564</span>
                    <span>Capitale sociale 700.000,00i.v.</span>
                    <span>Nr Registro A.E.E. IT08020000001437</span>
                    <span>Albo gestori ambientali MI21789</span>
                </div>

                <div>

                    <p>
                        <Link>Privacy Policy</Link>
                        <Link>Cookie Policy</Link>
                        <Link>Termini e Condizioni</Link>
                    </p>
                    <p>
                        <Link>Modulo di whistleblowing</Link>
                        <Link>Whistleblower policy</Link>
                    </p>
                    <p>
                        <Link>Le tue preferenze relative alla privacy</Link>

                    </p>

                </div>
            </div>
            <div>
                <p>Contenuti del sito a cura di NEXT Hardware & Software SpA - La riproduzione anche parziale é vietata. - Prezzi IVA inclusa e Disponibilità aggiornati al 11-09-2025</p>
            </div>

        </div>
    </>
}