import HeaderLayout from '../../components/HeaderLayout.jsx'
import NavBar from '../../components/NavBar.jsx'
import FooterLayout from '../../components/FooterLayout.jsx'
import style from './EditUserPage.module.scss'
import accountImg from '../../assets/icons/edit_user_account.png' // Immagine o icona dell'account
import trustPilotStar from '../../assets/icons/trustpilotstar.png' // Icona TrustPilot
import { useAuthContext } from '../../contexts/AuthContext.jsx'
import { useEffect, useState } from 'react'


/**
 * @file EditUserPage.jsx
 * @description Pagina dedicata alla visualizzazione e modifica dei dati personali dell'utente autenticato.
 */
export default function EditUserPage() {

    // Ottiene l'istanza Axios con gestione automatica dell'autenticazione/refresh token.
    const { authApi } = useAuthContext()

    // Stato per memorizzare i dati dell'utente recuperati dal backend (dati attuali).
    const [userData, setUserData] = useState()

    // Stato per memorizzare i dati che l'utente sta modificando nel form (dati in aggiornamento).
    const [userDataUpdate, setUserDataUpdate] = useState()

    /**
     * @function handleUserDataUpdate
     * @description Gestisce il cambiamento negli input del form di aggiornamento.
     * Aggiorna lo stato `userDataUpdate` in modo incrementale.
     */
    function handleUserDataUpdate(e) {
        const { value, name } = e.target

        setUserDataUpdate((prev) => ({
            ...prev,
            [name]: value // Imposta il valore del campo basato sull'attributo 'name' dell'input
        }))
    }

    /**
     * @async
     * @function getUserData
     * @description Esegue una chiamata API per recuperare i dati dell'utente attualmente loggato.
     */
    async function getUserData() {
        try {
            const response = await authApi.get('/users/logged-user-data')
            // Salva i dati utente nello stato.
            setUserData(response.data)
        } catch (error) {
            console.error("Errore nel recupero dei dati utente", error);
            // Gestione dell'errore (e.g., reindirizzamento o messaggio all'utente)
        }
    }

    /**
     * @async
     * @function updateUserData
     * @description Invia i dati modificati (`userDataUpdate`) al backend per l'aggiornamento.
     */
    async function updateUserData(e) {
        e.preventDefault() // Previene il ricaricamento della pagina al submit del form

        try {
            // Invia la richiesta PUT con i dati modificati.
            const response = await authApi.put('/users/edit-user-data', userDataUpdate)
            console.log("Aggiornamento utente riuscito", response.data);
            // Potrebbe essere utile chiamare nuovamente `getUserData()` per aggiornare `userData`
            // e mostrare i dati freschi nel form.
        } catch (error) {
            console.error("Aggiornamento utente non riuscito", error);
            // Gestione dell'errore (e.g., messaggio di errore specifico)
        }
    }

    /**
     * @function useEffect
     * @description Hook eseguito solo una volta al montaggio del componente ([])
     * per caricare i dati attuali dell'utente.
     */
    useEffect(() => {
        getUserData()
    }, [])


    return <>
        <HeaderLayout />
        <NavBar />
        <main>
            <div className={style.container}>
                <div className={style.note_head}>
                    <img src={accountImg}></img>
                    <h2>Modifica account utente</h2>
                </div>


                <form onSubmit={updateUserData} className={style.edit_user_page_form}>
                    <div className={style.col}>
                        <div className={style.row}>
                            <label forhtml='name'>Nome: </label>
                            <input type='text' name='name' onChange={(e) => handleUserDataUpdate(e)} value={userData ? userData.name : "No data"} required />
                        </div>

                        <div className={`${style.row}`}>
                            <label>Codice Fiscale: </label>
                            <input type='text' className={style.input_blocked} placeholder={userData ? userData.codefiscale : "No data"} disabled />
                        </div>

                        <div className={`${style.row}`}>
                            <label forhtml='telefono'>Telefono: </label>
                            <input type='text' name='telefono' onChange={(e) => handleUserDataUpdate(e)} value={userData ? userData.telefono : "No data"} required />
                        </div>

                        <div className={style.row}>
                            <label>Nazione: </label>
                            <input type='text' className={style.input_blocked} placeholder={userData ? userData.nazione : "No data"} disabled />
                        </div>
                    </div>

                    <div className={style.col}>
                        <div className={style.row}>
                            <label forhtml='surname'>Cognome: </label>
                            <input type='text' name='surname' onChange={(e) => handleUserDataUpdate(e)} value={userData ? userData.surname : "No data"} required />
                        </div>

                        <div className={style.row}>
                            <label>Email: </label>
                            <input type='text' className={style.input_blocked} placeholder={userData ? userData.userEmail : "No data"} disabled />
                        </div>

                        <div className={style.row}>
                            <label forhtml='indirizzo'>indirizzo: </label>
                            <input type='text' name='indirizzo' onChange={(e) => handleUserDataUpdate(e)} value={userData ? userData.indirizzo : "No data"} required />
                        </div>

                        <div className={style.row}>
                            <button type='submit'>Salva</button>
                        </div>
                    </div>
                </form>


                <div className={style.indirizzo}>

                    <div className={style.newsletter}>
                        <p>Ricevi le ultime novità e promozioni</p>
                        <p>Iscriviti alla newsletter   </p>
                        <p>Scrivi una recensione si di noi <img src={trustPilotStar} style={{ width: "20px" }}></img></p>
                    </div>

                </div>



            </div>



        </main>
        <FooterLayout />
    </>
}