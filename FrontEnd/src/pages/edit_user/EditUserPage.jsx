import HeaderLayout from '../../components/HeaderLayout.jsx'
import NavBar from '../../components/NavBar.jsx'
import FooterLayout from '../../components/FooterLayout.jsx'
import style from './EditUserPage.module.scss'
import accountImg from '../../assets/icons/edit_user_account.png'
import trustPilotStar from '../../assets/icons/trustpilotstar.png'
import { useAuthContext } from '../../contexts/AuthContext.jsx'
import { useEffect, useState } from 'react'



export default function EditUserPage() {

    const { authApi } = useAuthContext()
    const [userData, setUserData] = useState()
    const [userDataUpdate, setUserDataUpdate] = useState()

    function handleUserDataUpdate(e) {
        const { value, name } = e.target

        setUserDataUpdate((prev) => ({
            ...prev,
            [name]: value
        }))

    }

    console.log(userDataUpdate);


    async function getUserData() {
        try {
            const response = await authApi.get('/users/logged-user-data')
            setUserData(response.data)
            console.log(response.data);

        } catch (error) {
            console.error("Errore nel recuper dei dati utente", error);

        }
    }

    async function updateUserData(e) {
        e.preventDefault()

        try {
            const response = await authApi.put('/users/edit-user-data', userDataUpdate)

        } catch (error) {
            console.error("Aggiornamento utente non riuscito", error);

        }
    }

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
                            <input type='text' name='name' onChange={(e) => handleUserDataUpdate(e)} />
                        </div>

                        <div className={`${style.row}`}>
                            <label>Codice Fiscale: </label>
                            <input type='text' className={style.input_blocked} placeholder={userData ? userData.codefiscale : "No data"} disabled />
                        </div>

                        <div className={`${style.row}`}>
                            <label forhtml='telefono'>Telefono: </label>
                            <input type='text' name='telefono' onChange={(e) => handleUserDataUpdate(e)} />
                        </div>

                        <div className={style.row}>
                            <label>Nazione: </label>
                            <input type='text' className={style.input_blocked} placeholder={userData ? userData.nazione : "No data"} disabled />
                        </div>
                    </div>

                    <div className={style.col}>
                        <div className={style.row}>
                            <label forhtml='surname'>Cognome: </label>
                            <input type='text' name='surname' onChange={(e) => handleUserDataUpdate(e)} />
                        </div>

                        <div className={style.row}>
                            <label>Email: </label>
                            <input type='text' className={style.input_blocked} placeholder={userData ? userData.userEmail : "No data"} disabled />
                        </div>

                        <div className={style.row}>
                            <label forhtml='indirizzo'>indirizzo: </label>
                            <input type='text' name='indirizzo' onChange={(e) => handleUserDataUpdate(e)} />
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