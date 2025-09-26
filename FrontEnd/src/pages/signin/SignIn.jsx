import style from '../signin/SignIn.module.scss'
import HeaderLayout from '../../components/HeaderLayout'
import FooterLayout from '../../components/FooterLayout'
import NavBar from '../../components/NavBar'
import trustPilotStar from '../../assets/icons/trustpilotstar.png'



export default function SingIn() {


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
                    <form>
                        <div className={style.row}>
                            <div className={style.col}>
                                <label>Nome: </label>
                                <input type='text'></input>
                            </div>
                            <div className={style.col}>

                                <label>Cognome: </label>
                                <input type='text'></input>
                            </div>

                        </div>
                        <div className={style.row}>
                            <div className={style.col}>
                                <label>Codice Fiscale: </label>
                                <input type='text'></input></div>

                            <div className={style.col}>
                                <label>Email: </label>
                                <input type='email'></input></div>
                        </div>
                        <div className={style.row}>
                            <div className={style.col}>
                                <label>Password: </label>
                                <input type='password'></input></div>


                            <div className={style.col}>
                                <label>Ripeti Password: </label>
                                <input type='password'></input></div>

                        </div>
                        <div className={style.row}>
                            <div className={style.col}>
                                <label>Telefono: </label>
                                <input type='text'></input></div>

                            <div className={style.col}></div>

                        </div>

                    </form>
                </div>
                <div className={style.indirizzo}>

                    <h3>2 Indirizzo e Recapito</h3>
                    <p>Ti chiederemo di indicarci il tuo indirizzo di fatturazione. Potrai compilare più avanti gli indirizzi di spedizione, se diversi da quello di fatturazione.</p>
                    <form>
                        <div className={style.row}>
                            <div className={style.col}>
                                <label htmlFor="nazioni">Nazione: </label>
                                <select name="nazioni" id="nazioni">
                                    <option value="">-- Seleziona una nazione --</option>
                                    <option value="Italia">Italia</option>
                                    <option value="Francia">Francia</option>
                                    <option value="Germania">Germania</option>
                                    <option value="Spagna">Spagna</option>
                                    <option value="Olanda">Olanda</option>
                                </select>

                            </div>
                            <div className={style.col}>

                                <label>Indirizzo: </label>
                                <input type='text'></input>
                            </div>

                        </div>
                        <div className={style.row}>
                            <input type='checkbox' style={{ marginRight: "1rem" }}></input>
                            <label>L'indirizzo di spedizione coincide con l'indirizzo di fatturazione. Se diverso verrà chiesto più avanti.</label>
                        </div>
                        <button className={style.registrati}>Registrati</button>
                    </form>
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