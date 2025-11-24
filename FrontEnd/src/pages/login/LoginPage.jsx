import HeaderLayout from '../../components/HeaderLayout'
import FooterLayout from '../../components/FooterLayout'
import trustPilotStar from '../../assets/icons/trustpilotstar.png'
import NavBar from '../../components/NavBar'
import style from '../login/LoginPage.module.scss'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { useAuthContext } from '../../contexts/AuthContext'
import { useGlobalContext } from '../../contexts/GlobalContext'

/**
 * @fileoverview Componente funzionale per la pagina di Login (LoginPage).
 * Gestisce l'interfaccia utente per l'accesso, la raccolta dei dati del form
 * e la logica di autenticazione tramite l'API.
 * In caso di successo, reindirizza l'utente alla sua area riservata
 * (admin o utente standard). In caso di fallimento, visualizza un messaggio di errore.
 *
 * @component
 * @returns {JSX.Element} Il markup completo della pagina di Login.
 */

export default function LoginPage() {
    const navigateToSignIn = useNavigate()
    const navigateToUserAccountPage = useNavigate()
    const navigateToAdminAccountPage = useNavigate()
    const [formData, setFormData] = useState()
    const { authApi, setInfoPageMessage } = useAuthContext()
    const { getCartProducts } = useGlobalContext()
    const [displayUserMessage, setDisplayUserMessage] = useState(false)

    function handleFormData(e) {
        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value,
            [password]: value

        }))
    }

    async function handleFormSubmit(e) {
        e.preventDefault()

        try {
            const response = await authApi.post("/users/login", formData)
            localStorage.setItem("userId", response.data.userId)
            localStorage.setItem("userName", response.data.userName)
            localStorage.setItem("accessToken", response.data.accessToken)

            if (response.data) {
                localStorage.setItem("accessToken", response.data.accessToken)
                if (response.data.role === "admin") {
                    navigateToAdminAccountPage('/admin-home')
                } else {
                    navigateToUserAccountPage('/user/user-account')
                }
            }
            getCartProducts()

        } catch (error) {
            setInfoPageMessage(error.message)
            if (displayUserMessage === false) {
                setDisplayUserMessage(true)
                setTimeout(() => {
                    setDisplayUserMessage(false)
                }, 5000)
            }
        }

    }

    return <>
        <HeaderLayout />
        <NavBar />

        <main>
            <div id='login_signin' className={style.login_signin}>
                <div id='login' className={style.login}>
                    <h3>Login utente</h3>
                    <p className={style.gia_registrato}>Gia registrato? <span>Accedi</span></p>
                    <hr></hr>
                    <p>Effettua il login per scegliere i dettagli della spedizione o del ritiro ed effettuare il pagamento</p>
                    <form onSubmit={handleFormSubmit}>
                        <div>
                            <label htmlFor='email'>Email: </label>
                            <input type='email' id='email' placeholder='La tua email' name='email' onChange={handleFormData} required></input>
                        </div>

                        <div>
                            <label htmlFor='password'>Password: </label>
                            <input type='password' id='password' placeholder='Password' name='password' onChange={handleFormData} required></input>
                        </div>
                        <div id='button_div' className={style.button_div}>
                            <button type='submit' className={style.submit_button}>Login</button>
                            <button className={style.password_dimenticata_button}>Password dimentidcata ?</button>
                        </div>
                    </form>
                    <p className={displayUserMessage == false ? style.user_message_off : style.user_message_on}>Email e/o Password errata</p>
                </div>
                <div id='signin' className={style.signin}>
                    <h3>Nuovo cliente?</h3>
                    <p className={style.effettua_registrazione}>Effettua la <span>Registrazione</span></p>
                    <p>Registrati per ottimizzare la tua esperienza di acquisto</p>
                    <ul>
                        <li>Procedimento di <strong>acquisto</strong> più rapido</li>
                        <li>Archivio dei tuoi <strong>Ordini</strong> e <strong>Fatture</strong></li>
                        <li><strong>Tracciabilità</strong> dei tuoi acquisti</li>
                        <li>Gestione dei tuoi <strong>Indirizzi</strong></li>
                        <li><strong>Salvataggio</strong>Salvataggio dei carrelli / preventivi</li>
                        <li>Gestione dei resi o rientri per assistenza <strong>RMA</strong></li>
                    </ul>
                    <div style={{ display: "flex", justifyContent: "center", marginBottom: "1rem" }}>
                        <button onClick={(e) => navigateToSignIn("/user/signin")}>Nuovo utente</button>
                    </div>
                    <p>Avere un Profilo Utente significa accedere ad un Area Personale dove inserire e modificare i propri dati, gli indirizzi di spedizione e fatturazione, gestire la privacy, la scelta di iscriversi alla nostra newsletter per essere sempre informato con notizie e promozioni, associare la tessera NEXT CARD per accumulare punti con gli acquisti e trasformarli in successivi sconti.</p>
                </div>
            </div>

            <div className={style.newsletter}>
                <p>Ricevi le ultime novità e promozioni</p>
                <p>Iscriviti alla newsletter   </p>
                <p>Scrivi una recensione si di noi <img src={trustPilotStar} style={{ width: "20px" }}></img></p>
            </div>

        </main>




        <FooterLayout />

    </>
}