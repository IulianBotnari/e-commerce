/**
 * @file NavBar.jsx
 * @description Componente di navigazione principale (NavBar) che implementa un "Mega Menu"
 * con funzionalità di hover/mouseover per mostrare i dettagli delle sottocategorie.
 *
 * Logica chiave:
 * 1. Stato Dinamico: Utilizza un set di stati (`PopUpComputerTabletNoteBook`, etc.) per
 * controllare la visibilità e l'aspetto di ciascun menu a comparsa.
 * 2. `popUpCase` (Stato Attivatore): Questo stato di tipo stringa viene aggiornato su
 * `onMouseOver` (nelle categorie) e funge da trigger per l'effetto `useEffect`.
 * 3. `useEffect` Centralizzato: La logica di visualizzazione è centralizzata in `useEffect`
 * che, tramite uno `switch`, imposta la visibilità del popup corretto e nasconde tutti gli altri.
 * 4. Navigazione: I link all'interno dei popup utilizzano il componente `Link` di React Router
 * per la navigazione senza ricaricare la pagina (`/product/[Nome Prodotto]`).
 * 5. Chiusura: Il menu viene chiuso quando il mouse esce dall'intera barra di navigazione (`onMouseLeave`).
 */


import style from './componentsStyle/NavBar.module.scss'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import navBarComputerAdv from '../assets/navbaradv/navbarcomputeradv.jpg'
import menuConfiguratoreBatterie from '../assets/navbaradv/menu-configuratore-batterie.png'
import navBarConsumbiliAdv from '../assets/navbaradv/navbarconsumabiliadv.jpg'
import navBarHardwareAdv from '../assets/navbaradv/navbarhardwareadv.jpg'
import navBarMonitorAdv from '../assets/navbaradv/navbarmonitoradv.jpg'
import navBarTelefoniaAdv from '../assets/navbaradv/navbartelefoniaadv.jpg'
import navBarGiochiAdv from '../assets/navbaradv/navbargiochiadv.jpg'


export default function NavBar() {
    const [PopUpComputerTabletNoteBook, setPopUpComputerTabletNoteBook] = useState({
        visibility: "",
        filter: "brightness(0%)"
    })
    const [PopUpConsumabileAccessori, setPopUpConsumabileAccessori] = useState({
        visibility: "",
        filter: "brightness(0%)"
    })
    const [PopUpHardwareAccessori, setPopUpHardwareAccessori] = useState({
        visibility: "",
        filter: "brightness(0%)"
    })
    const [PopUpMonitorStampantiPeriferiche, setPopUpMonitorStampantiPeriferiche] = useState({
        visibility: "",
        filter: "brightness(0%)"
    })
    const [PopUpTelefoniaWrable, setPopUpTelefoniaWrable] = useState({
        visibility: "",
        filter: "brightness(0%)"
    })
    const [PopUpGiochi, setPopUpGiochi] = useState({
        visibility: "",
        filter: "brightness(0%)"
    })
    const [popUpCase, setpopUpCase] = useState()

    useEffect(() => {
        switch (popUpCase) {
            case "computer_tablet_notebook":
                setpopUpCase("")
                setPopUpComputerTabletNoteBook({
                    visibility: "visible",
                    filter: "brightness(100%)"
                })
                setPopUpConsumabileAccessori({
                })
                setPopUpHardwareAccessori({})
                setPopUpMonitorStampantiPeriferiche({})
                setPopUpTelefoniaWrable({})
                setPopUpGiochi({})

                break;
            case "consumabile_accessori":
                setpopUpCase("")
                setPopUpComputerTabletNoteBook({})
                setPopUpConsumabileAccessori({
                    visibility: "visible",
                    filter: "brightness(100%)"
                })
                setPopUpHardwareAccessori({})
                setPopUpMonitorStampantiPeriferiche({})
                setPopUpTelefoniaWrable({})
                setPopUpGiochi({})

                break;
            case "hardware_software":
                setpopUpCase("")
                setPopUpComputerTabletNoteBook({})
                setPopUpConsumabileAccessori({})
                setPopUpHardwareAccessori({
                    visibility: "visible",
                    filter: "brightness(100%)"
                })
                setPopUpMonitorStampantiPeriferiche({})
                setPopUpTelefoniaWrable({})
                setPopUpGiochi({})

                break;
            case "monitor_stampanti_periferiche":
                setpopUpCase("")
                setPopUpComputerTabletNoteBook({})
                setPopUpConsumabileAccessori({})
                setPopUpHardwareAccessori({})
                setPopUpMonitorStampantiPeriferiche({
                    visibility: "visible",
                    filter: "brightness(100%)"
                })
                setPopUpTelefoniaWrable({})
                setPopUpGiochi({})

                break;
            case "telefonia_werabile":
                setpopUpCase("")
                setPopUpComputerTabletNoteBook({})
                setPopUpConsumabileAccessori({})
                setPopUpHardwareAccessori({})
                setPopUpMonitorStampantiPeriferiche({})
                setPopUpTelefoniaWrable({
                    visibility: "visible",
                    filter: "brightness(100%)"
                })
                setPopUpGiochi({})

                break;
            case "giochi":
                setpopUpCase("")
                setPopUpComputerTabletNoteBook({})
                setPopUpConsumabileAccessori({})
                setPopUpHardwareAccessori({})
                setPopUpMonitorStampantiPeriferiche({})
                setPopUpTelefoniaWrable({})
                setPopUpGiochi({
                    visibility: "visible",
                    filter: "brightness(100%)"
                })

                break;
            case "none":
                setpopUpCase("")
                setPopUpComputerTabletNoteBook({})
                setPopUpConsumabileAccessori({})
                setPopUpHardwareAccessori({})
                setPopUpMonitorStampantiPeriferiche({})
                setPopUpTelefoniaWrable({})
                setPopUpGiochi({})

                break;

            default:
                break;
        }

    }, [popUpCase])


    return <>

        <nav id="nav_bar" className={style.nav_bar} onMouseLeave={() => setpopUpCase("none")}>
            <div id='nav_bar_category' className={style.nav_bar_category}>
                <div id='categories' className={style.categories}>
                    <div id="computer_tablet_notebook" onMouseOver={(e) => setpopUpCase(e.target.id)}>COMPUTER TABLET NOTEBOOK</div>
                    <div id="consumabile_accessori" onMouseOver={(e) => setpopUpCase(e.target.id)}>CONSUMABILE ACCESSORI</div>
                    <div id="hardware_software" onMouseOver={(e) => setpopUpCase(e.target.id)}>HARDWARE SOFTWARE</div>
                    <div id="monitor_stampanti_periferiche" onMouseOver={(e) => setpopUpCase(e.target.id)}>MONITOR STAMPANTI PERIFERICHE</div>
                    <div id="telefonia_werabile" onMouseOver={(e) => setpopUpCase(e.target.id)}>TELEFONIA WEARABLE</div>
                    <div id="giochi" onMouseOver={(e) => setpopUpCase(e.target.id)}>GIOCHI</div>
                </div>
                <div id='popup_computer_tablet_notebook' className={style.popup_computer_tablet_notebook} style={{ visibility: PopUpComputerTabletNoteBook.visibility, filter: PopUpComputerTabletNoteBook.filter }}>
                    <div id='popup_options' className={style.popup_options}>
                        <h2 id='popup_title'>Computer Tablet NoteBook</h2>
                        <div id='popup_links' className={style.popup_links}>
                            <div id='popup_col1' className={style.popup_col1}>
                                <Link to="/product/Accessori Apple">Accessori Apple</Link>
                                <Link to="/product/Accessori Tablet">Accessori Tablet</Link>
                                <Link to="/product/Computer">Computer</Link>
                                <Link to="/product/NoteBook Rigenerati">NoteBook Rigenerati</Link>
                                <Link to="/product/NoteBook">NoteBook</Link>
                            </div>
                            <div id='popup_col2'>
                                <Link to="/product/Accessori Desktop">Accessori Desktop</Link>
                                <Link to="/product/App">App</Link>
                                <Link to="/product/Microsoft Surface">Microsoft Surface</Link>
                                <Link to="/product/Tablet">Tablet</Link>
                            </div>
                            <div id='popup_col3'>
                                <Link to="/product/Accessori NoteBook">Accessori NoteBook</Link>
                                <Link to="/product/Borse">Borse, Zaini, etc</Link>
                                <Link to="/product/NoteBook">NoteBook</Link>
                                <Link to="/product/WorkStation Server">WorkStation/Server</Link>
                            </div>
                        </div>
                        <div id='popup_button_option' className={style.popup_button_option}>
                            <button>PC ASSEMBLATI</button>
                            <button>CONFIGURATORE PC</button>
                            <button>GAMING</button>
                            <button>REFURBISHED</button>
                        </div>
                    </div>

                    <div id='popup_adv' className={style.popup_adv}>
                        <img src={navBarComputerAdv}></img>
                    </div>
                </div>
                <div id='popup_consumabile_accessori' className={style.popup_consumabile_accessori} style={{ visibility: PopUpConsumabileAccessori.visibility, filter: PopUpConsumabileAccessori.filter }} >
                    <div id='popup_options' className={style.popup_options}>
                        <h2 id='popup_title'>Computer Tablet NoteBook</h2>
                        <div id='popup_links' className={style.popup_links}>
                            <div id='popup_col1' className={style.popup_col1}>
                                <Link to="/product/Cavi">Cavi</Link>
                                <Link to="/product/Power Bank">Power Bank</Link>
                                <Link to="/product/Accesori iPhone">Accesori iPhone</Link>
                                <Link to="/product/Accessori Samsung">Accessori Samsung</Link>
                                <Link to="/product/Pendrive USB">Pendrive USB</Link>
                            </div>
                            <div id='popup_col2'>
                                <Link to="/product/Consumabile">Consumabile</Link>
                                <Link to="/product/Accessori Apple">Accessori Apple</Link>
                                <Link to="/product/Accessori Tablet">Accessori Tablet</Link>
                                <Link to="/product/Sedie Gaming">Sedie Gaming</Link>

                            </div>
                            <div id='popup_col3'>
                                <Link to="/product/Multiprese">Multiprese</Link>
                                <Link to="/product/Accessori Asus">Accessori Asus</Link>
                                <Link to="/product/Accessori NoteBook">Accessori NoteBook</Link>
                                <Link to="/product/Case Accesori">Case Accesori</Link>
                            </div>
                        </div>
                        <div id='popup_button_option' className={style.popup_button_option}>
                            <img id='menu_configuratore_batterie' className={style.menu_configuratore_batterie} src={menuConfiguratoreBatterie}></img>
                        </div>
                    </div>

                    <div id='popup_adv' className={style.popup_adv}>
                        <img src={navBarConsumbiliAdv}></img>
                    </div>
                </div>
                <div id='popup_hardware_software' className={style.popup_computer_tablet_notebook} style={{ visibility: PopUpHardwareAccessori.visibility, filter: PopUpHardwareAccessori.filter }}>
                    <div id='popup_options' className={style.popup_options}>
                        <h2 id='popup_title'>Computer Tablet NoteBook</h2>
                        <div id='popup_links' className={style.popup_links}>
                            <div id='popup_col1' className={style.popup_col1}>
                                <Link to="/product/Alimentatori">Alimentatori</Link>
                                <Link to="/product/Case Accesori">Case Accesori</Link>
                                <Link to="/product/Dissipatori Cpu">Dissipatori Cpu</Link>
                                <Link to="/product/Masterizzatori">Masterizzatori</Link>
                                <Link to="/product/Rack Case">Rack Case</Link>
                                <Link to="/product/Software Antivirus">Software Antivirus</Link>
                                <Link to="/product/Networiking">Networiking</Link>
                                <Link to="/product/Webcam">Webcam</Link>
                            </div>
                            <div id='popup_col2'>
                                <Link to="/product/Card Reader">Card Reader, Hub</Link>
                                <Link to="/product/Controller Raid">Controller Raid</Link>
                                <Link to="/product/Hard Disk e SSD">Hard Disk e SSD</Link>
                                <Link to="/product/Memorie Flash">Memorie Flash</Link>
                                <Link to="/product/Schede IO">Schede I/O</Link>
                                <Link to="/product/Water Cooling">Water Cooling</Link>
                                <Link to="/product/Router">Router</Link>
                            </div>
                            <div id='popup_col3'>
                                <Link to="/product/Case">Case</Link>
                                <Link to="/product/Cpu">Cpu</Link>
                                <Link to="/product/MainBoard">MainBoard</Link>
                                <Link to="/product/Memorie Ram">Memorie Ram</Link>
                                <Link to="/product/Schede Video">Schede Video</Link>
                                <Link to="/product/Windows e Office">Windows e Office</Link>
                                <Link to="/product/Ups">Ups</Link>
                            </div>
                        </div>
                    </div>

                    <div id='popup_adv' className={style.popup_adv}>
                        <img src={navBarHardwareAdv}></img>
                    </div>
                </div>
                <div id='popup_monitor_stampanti_periferiche' className={style.popup_computer_tablet_notebook} style={{ visibility: PopUpMonitorStampantiPeriferiche.visibility, filter: PopUpMonitorStampantiPeriferiche.filter }}>
                    <div id='popup_options' className={style.popup_options}>
                        <h2 id='popup_title'>Computer Tablet NoteBook</h2>
                        <div id='popup_links' className={style.popup_links}>
                            <div id='popup_col1' className={style.popup_col1}>
                                <Link to="/product/Caming Chair">Caming Chair</Link>
                                <Link to="/product/NAS">NAS</Link>
                                <Link to="/product/Stampanti Scanner">Stampanti/Scanner</Link>
                                <Link to="/product/Ufficio">Ufficio</Link>
                                <Link to="/product/Cuffie">Cuffie</Link>
                            </div>
                            <div id='popup_col2'>
                                <Link to="/product/Monitor">Monitor</Link>
                                <Link to="/product/Networiking">Networiking</Link>
                                <Link to="/product/Tastiere">Tastiere</Link>
                                <Link to="/product/Ups">Ups</Link>
                                <Link to="/product/Videosorveglianza">Videosorveglianza</Link>
                            </div>
                            <div id='popup_col3'>
                                <Link to="/product/Mouse">Mouse</Link>
                                <Link to="/product/Periferiche Gaming">Periferiche Gaming</Link>
                                <Link to="/product/Tavoletta Grafica">Tavoletta Grafica</Link>
                                <Link to="/product/Webcam">Webcam</Link>
                            </div>
                        </div>
                    </div>

                    <div id='popup_adv' className={style.popup_adv}>
                        <img src={navBarMonitorAdv}></img>
                    </div>
                </div>
                <div id='popup_telefonia_werabile' className={style.popup_computer_tablet_notebook} style={{ visibility: PopUpTelefoniaWrable.visibility, filter: PopUpTelefoniaWrable.filter }} >
                    <div id='popup_options' className={style.popup_options}>
                        <h2 id='popup_title'>Computer Tablet NoteBook</h2>
                        <div id='popup_links' className={style.popup_links}>
                            <div id='popup_col1' className={style.popup_col1}>
                                <Link to="/product/Accessori Asus">Accessori Asus</Link>
                                <Link to="/product/Caricatori">Caricatori</Link>
                                <Link to="/product/Watch">Watch</Link>
                            </div>
                            <div id='popup_col2'>
                                <Link to="/product/Accessori iPhone">Accessori iPhone</Link>
                                <Link to="/product/iPhone">iPhone</Link>
                                <Link to="/product/Tablet">Tablet</Link>
                            </div>
                            <div id='popup_col3'>
                                <Link to="/product/Accesori Mobile">Accesori Mobile</Link>
                                <Link to="/product/Smartphone">Smartphone</Link>
                                <Link to="/product/Visore VR">Visore VR</Link>
                            </div>
                        </div>
                    </div>

                    <div id='popup_adv' className={style.popup_adv}>
                        <img src={navBarTelefoniaAdv}></img>
                    </div>
                </div>
                <div id='popup_giochi' className={style.popup_computer_tablet_notebook} style={{ visibility: PopUpGiochi.visibility, filter: PopUpGiochi.filter }}>
                    <div id='popup_options' className={style.popup_options}>
                        <h2 id='popup_title'>Computer Tablet NoteBook</h2>
                        <div id='popup_links' className={style.popup_links}>
                            <div id='popup_col1' className={style.popup_col1}>
                                <Link to="/product/Benessere">Benessere</Link>
                                <Link to="/product/Elettrodomestici">Elettrodomestici</Link>
                                <Link to="/product/Speakers">Speakers</Link>
                                <Link to="/product/Videoproiettori">Videoproiettori</Link>
                                <Link to="/product/Soundbar">Soundbar</Link>
                            </div>
                            <div id='popup_col2'>
                                <Link to="/product/Console">Console</Link>
                                <Link to="/product/Giochi Viedogiochi">Giochi Viedogiochi</Link>
                                <Link to="/product/Streaming">Streaming</Link>
                                <Link to="/product/Videosorveglianza">Videosorveglianza</Link>
                                <Link to="/product/Webcam">Webcam</Link>
                            </div>
                            <div id='popup_col3'>
                                <Link to="/product/Cuffie">Cuffie</Link>
                                <Link to="/product/Smart Home">Smart Home</Link>
                                <Link to="/product/TV">TV</Link>
                                <Link to="/product/LEGO">LEGO</Link>
                            </div>
                        </div>
                    </div>
                    <div id='popup_adv' className={style.popup_adv}>
                        <img src={navBarGiochiAdv}></img>
                    </div></div>
            </div>



        </nav>

    </>
}