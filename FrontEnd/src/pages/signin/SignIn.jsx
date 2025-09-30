import style from '../signin/SignIn.module.scss'
import HeaderLayout from '../../components/HeaderLayout'
import FooterLayout from '../../components/FooterLayout'
import NavBar from '../../components/NavBar'
import trustPilotStar from '../../assets/icons/trustpilotstar.png'
import axios from 'axios'
import { useState } from 'react'



export default function SingIn() {

    const [userBody, setUserBody] = useState()

    console.log(userBody);

    const handleChange = (e) => {
        let { name, value } = e.target;
        if (value === "on") {
            value = 1
        } else if (value === "off") {
            value = 0
        }

        console.log(value);

        setUserBody((prev) => ({
            ...prev,
            [name]: value,
        }));
    };



    async function postUser(e) {
        e.preventDefault()


        try {
            const response = await axios.post('http://localhost:8080/users/postuser', userBody)

            if (response.data) {
                console.log("utente aggiunto con successo");
            }

        } catch (error) {
            if (error.response) {
                console.error("Errore dal server:", error.response.data);
            } else if (error.request) {
                console.error("Nessuna risposta dal server:", error.request);
            } else {
                console.error("Errore nella richiesta:", error.message);
            }


        }

    }




    return <>
        <HeaderLayout />
        <NavBar />
        <main>
            <div className={style.new_user}>
                <h2>Creazione account utente</h2>
                <div className={style.user_data}>

                    <h3>1 I tuoi dati</h3>
                    <p>Ti verranno richiesti i tuoi dati personali per procedere alla creazione account.</p>
                    <p>Se sei un'Azienda, non ti preoccupare: ti chiederemo le informazioni necessarie al punto 2, dopo aver selezionato la nazione Italia.</p>
                    <form onSubmit={postUser}>
                        <div className={style.row}>
                            <div className={style.col}>
                                <label htmlFor='name'>Nome: </label>
                                <input type='text' id='name' name='name' onChange={handleChange}></input>
                            </div>
                            <div className={style.col}>

                                <label htmlFor='surname'>Cognome: </label>
                                <input type='text' id='surname' name='surname' onChange={handleChange}></input>
                            </div>

                        </div>
                        <div className={style.row}>
                            <div className={style.col}>
                                <label htmlFor='codefiscale'>Codice Fiscale: </label>
                                <input type='text' id='codefiscale' name='codefiscale' onChange={handleChange}></input></div>

                            <div className={style.col}>
                                <label htmlFor='email'>Email: </label>
                                <input type='email' id='email' name='email' onChange={handleChange}></input></div>
                        </div>
                        <div className={style.row}>
                            <div className={style.col}>
                                <label htmlFor='password'>Password: </label>
                                <input type='password' id='password' name='password' onChange={handleChange}></input></div>


                            <div className={style.col}>
                                <label htmlFor='ripetipassword'>Ripeti Password: </label>
                                <input type='password' id='ripetipassword' name='ripetipassword' ></input></div>

                        </div>
                        <div className={style.row}>
                            <div className={style.col}>
                                <label htmlFor='telefono'>Telefono: </label>
                                <input type='text' id='telefono' name='telefono' onChange={handleChange}></input></div>

                            <div className={style.col}></div>

                        </div>

                        <h3>2 Indirizzo e Recapito</h3>
                        <p>Ti chiederemo di indicarci il tuo indirizzo di fatturazione. Potrai compilare più avanti gli indirizzi di spedizione, se diversi da quello di fatturazione.</p>
                        <div>
                            <div className={style.row}>
                                <div className={style.col}>
                                    <label htmlFor="nazioni">Nazione: </label>
                                    <select name="nazioni" id="nazioni" onChange={handleChange}>
                                        <option value="">-- Seleziona una nazione --</option>
                                        <option value="Italia">Italia</option>
                                        <option value="Francia">Francia</option>
                                        <option value="Germania">Germania</option>
                                        <option value="Spagna">Spagna</option>
                                        <option value="Olanda">Olanda</option>
                                    </select>

                                </div>
                                <div className={style.col}>

                                    <label htmlFor='indirizzo'>Indirizzo: </label>
                                    <input type='text' id='indirizzo' name='indirizzo' onChange={handleChange} ></input>
                                </div>

                            </div>
                            <div className={style.row}>
                                <input type='checkbox' style={{ marginRight: "1rem" }} id='is_indirizzo_same_spedizione' name='is_indirizzo_same_spedizione' onChange={handleChange}></input>
                                <label htmlFor='is_indirizzo_same_spedizione'>L'indirizzo di spedizione coincide con l'indirizzo di fatturazione. Se diverso verrà chiesto più avanti.</label>
                            </div>
                            <button type='submit' className={style.registrati}>Registrati</button>
                        </div>
                    </form>
                </div>
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