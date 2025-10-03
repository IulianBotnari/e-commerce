import style from './UserAccount.module.scss'
import Header from '../../components/HeaderLayout.jsx'
import NavBar from '../../components/NavBar.jsx'
import Footer from '../../components/FooterLayout.jsx'
import trustPilotStar from '../../assets/icons/trustpilotstar.png'
import { Link, useNavigate } from 'react-router-dom'
import { useAuthContext } from '../../contexts/AuthContext.jsx'
import { useEffect, useState } from 'react'
import HeaderLayout from '../../components/HeaderLayout.jsx'



export default function userAccount() {

    const { accessToken, authApi, setUserName } = useAuthContext()
    const [userData, setUserData] = useState()
    const navigateToHome = useNavigate()

    async function getUserData() {
        try {
            const response = await authApi.get('/users/logged-user-data', {
                headers: {
                    "Authorization": `Bearer ${accessToken}`
                }
            })

            setUserData(response.data)
            setUserName(response.data.name)


        } catch (error) {
            console.error("Errore nel recupero dati utenti ", error);

        }
    }

    useEffect(() => {
        getUserData()
    }, [])

    async function logOut() {
        try {
            const response = await authApi.post('/users/logout')
            console.log(response.data);
            setUserName("")
            setUserData("")
            navigateToHome("/")

        } catch (error) {
            console.error("Qualcosa e andato storto", error);

        }
    }

    return <>
        <HeaderLayout />
        <NavBar />
        <main>
            <div className={style.dev_container}>
                <div className={style.account_option}>
                    <div onClick={logOut}>
                        <span></span><p>Esci (LogOut)</p>
                    </div>

                    <div>
                        <span></span><p>Modifica dati di fatturazione</p>
                    </div>
                    <div>
                        <span></span><p>Modifica dati di spedizione</p>
                    </div>

                    <div>
                        <span></span><p>Modifica password</p>
                    </div>

                    <div>
                        <span></span><p>NEXTCARD</p>
                    </div>

                    <div>
                        <span></span><p>Lista Preferiti</p>
                    </div>

                    <div>
                        <span></span><p>Coupon e Sconti</p>
                    </div>

                    <div>
                        <span></span><p>Le mie recensioni</p>
                    </div>
                    <div>
                        <span></span><p>I miei ordini</p>
                    </div>
                    <div>
                        <span></span><p>Le mie fatture</p>
                    </div>
                    <div>
                        <span></span><p>Garanzia e RMA</p>
                    </div>
                    <div>
                        <span></span><p>Mailing List</p>
                    </div>
                </div>


                <div className={style.account_data}>
                    <h2>I tuoi dati:</h2>
                    <h4>Indirizzo di fatturazione</h4>
                    <div>
                        <div>
                            <p>Nome: </p>
                            <p>Cognome: </p>
                            <p>Azienda: </p>
                            <p>P.IVA: </p>
                            <p>Cod.Fiscale: </p>
                            <p>Indirizzo: </p>
                            <p>Email: </p>
                            <p>Telefono: </p>
                            <p>NEXTCARD N. </p>
                        </div>

                        <div>
                            <p>{userData ? userData.name : "Nome non disponibile"} </p>
                            <p>{userData ? userData.surname : "Congnome non disponibile"}</p>
                            <p>No</p>
                            <p>No</p>
                            <p>No</p>
                            <p>{userData ? userData.codefiscale : "Codice fiscale non disponibile"}</p>
                            <p>{userData ? userData.indirizzo : "Indirizzo non disponibile"}</p>
                            <p>{userData ? userData.email : "Email non disponibile"}</p>
                            <p>{userData ? userData.telefono : "Telefono non disponibile"}</p>
                            <p>no</p>
                        </div>
                    </div>

                    <h4>Indirizzo di spedizione predifinito</h4>
                    <div >
                        <div>
                            <p>Nome: </p>
                            <p>Cognome: </p>
                            <p>Azienda: </p>
                            <p>Indirizzo: </p>
                            <p>Telefono: </p>

                        </div>

                        <div>
                            <p>Nome: </p>
                            <p>Nome: </p>
                            <p>Nome: </p>
                            <p>Nome: </p>
                            <p>Nome: </p>

                        </div>
                    </div>

                    <p className={style.p_style}>Vuoi eliminare il tuo account ?</p>
                    <p className={style.p_style}>Per cancellare tutti i tuoi dati presenti nel sito di nexths.it scrivi a <Link>servizioclienti@nexths.it</Link></p>

                </div>

            </div>


            <div className={style.newsletter}>
                <p>Ricevi le ultime novità e promozioni</p>
                <p>Iscriviti alla newsletter   </p>
                <p>Scrivi una recensione si di noi <img src={trustPilotStar} style={{ width: "20px" }}></img></p>
            </div>
        </main>

        <Footer />
    </>
}