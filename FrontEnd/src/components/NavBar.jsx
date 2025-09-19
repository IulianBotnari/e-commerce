import style from './componentsStyle/NavBar.module.scss'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import navbarcomputeradv from '../assets/navbarcomputeradv.jpg'
import { use } from 'react'


export default function NavBar() {
    const [PopUpComputerTabletNoteBook, setPopUpComputerTabletNoteBook] = useState()
    const [PopUpConsumabileAccessori, setPopUpConsumabileAccessori] = useState()
    const [PopUpHardwareAccessori, setPopUpHardwareAccessori] = useState()
    const [PopUpMonitorStampantiPeriferiche, setPopUpMonitorStampantiPeriferiche] = useState()
    const [PopUpTelefoniaWrable, setPopUpTelefoniaWrable] = useState()
    const [PopUpGiochi, setPopUpGiochi] = useState()
    const [popUpCase, setpopUpCase] = useState()

    useEffect(() => {
        switch (popUpCase) {
            case "computer_tablet_notebook":
                setpopUpCase("")
                setPopUpComputerTabletNoteBook(1)
                setPopUpConsumabileAccessori("")
                setPopUpHardwareAccessori("")
                setPopUpMonitorStampantiPeriferiche("")
                setPopUpTelefoniaWrable("")
                setPopUpGiochi("")

                break;
            case "consumabile_accessori":
                setpopUpCase("")
                setPopUpComputerTabletNoteBook("")
                setPopUpConsumabileAccessori(1)
                setPopUpHardwareAccessori("")
                setPopUpMonitorStampantiPeriferiche("")
                setPopUpTelefoniaWrable("")
                setPopUpGiochi("")

                break;
            case "hardware_software":
                setpopUpCase("")
                setPopUpComputerTabletNoteBook("")
                setPopUpConsumabileAccessori("")
                setPopUpHardwareAccessori(1)
                setPopUpMonitorStampantiPeriferiche("")
                setPopUpTelefoniaWrable("")
                setPopUpGiochi("")

                break;
            case "monitor_stampanti_periferiche":
                setpopUpCase("")
                setPopUpComputerTabletNoteBook("")
                setPopUpConsumabileAccessori("")
                setPopUpHardwareAccessori("")
                setPopUpMonitorStampantiPeriferiche(1)
                setPopUpTelefoniaWrable("")
                setPopUpGiochi("")

                break;
            case "telefonia_werabile":
                setpopUpCase("")
                setPopUpComputerTabletNoteBook("")
                setPopUpConsumabileAccessori("")
                setPopUpHardwareAccessori("")
                setPopUpMonitorStampantiPeriferiche("")
                setPopUpTelefoniaWrable(1)
                setPopUpGiochi("")

                break;
            case "giochi":
                setpopUpCase("")
                setPopUpComputerTabletNoteBook("")
                setPopUpConsumabileAccessori("")
                setPopUpHardwareAccessori("")
                setPopUpMonitorStampantiPeriferiche("")
                setPopUpTelefoniaWrable("")
                setPopUpGiochi(1)

                break;
            case "null":
                setpopUpCase("")
                setPopUpComputerTabletNoteBook("")
                setPopUpConsumabileAccessori("")
                setPopUpHardwareAccessori("")
                setPopUpMonitorStampantiPeriferiche("")
                setPopUpTelefoniaWrable("")
                setPopUpGiochi("")

                break;

            default:
                break;
        }

    }, [popUpCase])


    return <>

        <nav id="nav_bar" className={style.nav_bar} onMouseLeave={() => setpopUpCase("null")}>
            <div id='nav_bar_category' className={style.nav_bar_category}>
                <div id='categories' className={style.categories}>
                    <div id="computer_tablet_notebook" onMouseOver={(e) => setpopUpCase(e.target.id)}>COMPUTER TABLET NOTEBOOK</div>
                    <div id="consumabile_accessori" onMouseOver={(e) => setpopUpCase(e.target.id)}>CONSUMABILE ACCESSORI</div>
                    <div id="hardware_software" onMouseOver={(e) => setpopUpCase(e.target.id)}>HARDWARE SOFTWARE</div>
                    <div id="monitor_stampanti_periferiche" onMouseOver={(e) => setpopUpCase(e.target.id)}>MONITOR STAMPANTI PERIFERICHE</div>
                    <div id="telefonia_werabile" onMouseOver={(e) => setpopUpCase(e.target.id)}>TELEFONIA WEARABLE</div>
                    <div id="giochi" onMouseOver={(e) => setpopUpCase(e.target.id)}>GIOCHI</div>
                </div>
                <div id='popup_computer_tablet_notebook' className={style.popup_computer_tablet_notebook} style={{ opacity: PopUpComputerTabletNoteBook }}>
                    <div id='popup_options' className={style.popup_options}>
                        <h2 id='popup_title'>Computer Tablet NoteBook</h2>
                        <div id='popup_links' className={style.popup_links}>
                            <div id='popup_col1' className={style.popup_col1}>
                                <Link>Accessori Apple</Link>
                                <Link>Accessori Tablet</Link>
                                <Link>Computer</Link>
                                <Link>NoteBook Rigenerati</Link>
                                <Link>WorkStation e Server</Link>
                            </div>
                            <div id='popup_col2'>
                                <Link>Accessori Desktop</Link>
                                <Link>App</Link>
                                <Link>Microsoft Surface</Link>
                                <Link>Tablet</Link>
                            </div>
                            <div id='popup_col3'>
                                <Link>Accessori NoteBook</Link>
                                <Link>Borse, Zaini, etc</Link>
                                <Link>NoteBook</Link>
                                <Link>WorkStation/Server</Link>
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
                        <img src={navbarcomputeradv}></img>
                    </div>
                </div>
                <div id='popup_consumabile_accessori' className={style.popup_consumabile_accessori} style={{ opacity: PopUpConsumabileAccessori }} >
                    <div id='popup_options' className={style.popup_options}>
                        <h2 id='popup_title'>Computer Tablet NoteBook</h2>
                        <div id='popup_links' className={style.popup_links}>
                            <div id='popup_col1' className={style.popup_col1}>
                                <Link>Accessori Apple</Link>
                                <Link>Accessori Tablet</Link>
                                <Link>Computer</Link>
                                <Link>NoteBook Rigenerati</Link>
                                <Link>WorkStation e Server</Link>
                            </div>
                            <div id='popup_col2'>
                                <Link>Accessori Desktop</Link>
                                <Link>App</Link>
                                <Link>Microsoft Surface</Link>
                                <Link>Tablet</Link>
                            </div>
                            <div id='popup_col3'>
                                <Link>Accessori NoteBook</Link>
                                <Link>Borse, Zaini, etc</Link>
                                <Link>NoteBook</Link>
                                <Link>WorkStation/Server</Link>
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
                        {/* <img src={navbarcomputeradv}></img> */}
                    </div>
                </div>
                <div id='popup_hardware_software' className={style.popup_computer_tablet_notebook} style={{ opacity: PopUpHardwareAccessori }}>
                    <div id='popup_options' className={style.popup_options}>
                        <h2 id='popup_title'>Computer Tablet NoteBook</h2>
                        <div id='popup_links' className={style.popup_links}>
                            <div id='popup_col1' className={style.popup_col1}>
                                <Link>Accessori Apple</Link>
                                <Link>Accessori Tablet</Link>
                                <Link>Computer</Link>
                                <Link>NoteBook Rigenerati</Link>
                                <Link>WorkStation e Server</Link>
                            </div>
                            <div id='popup_col2'>
                                <Link>Accessori Desktop</Link>
                                <Link>App</Link>
                                <Link>Microsoft Surface</Link>
                                <Link>Tablet</Link>
                            </div>
                            <div id='popup_col3'>
                                <Link>Accessori NoteBook</Link>
                                <Link>Borse, Zaini, etc</Link>
                                <Link>NoteBook</Link>
                                <Link>WorkStation/Server</Link>
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
                        <img src={navbarcomputeradv}></img>
                    </div>
                </div>
                <div id='popup_monitor_stampanti_periferiche' className={style.popup_computer_tablet_notebook} style={{ opacity: PopUpMonitorStampantiPeriferiche }}>
                    <div id='popup_options' className={style.popup_options}>
                        <h2 id='popup_title'>Computer Tablet NoteBook</h2>
                        <div id='popup_links' className={style.popup_links}>
                            <div id='popup_col1' className={style.popup_col1}>
                                <Link>Accessori Apple</Link>
                                <Link>Accessori Tablet</Link>
                                <Link>Computer</Link>
                                <Link>NoteBook Rigenerati</Link>
                                <Link>WorkStation e Server</Link>
                            </div>
                            <div id='popup_col2'>
                                <Link>Accessori Desktop</Link>
                                <Link>App</Link>
                                <Link>Microsoft Surface</Link>
                                <Link>Tablet</Link>
                            </div>
                            <div id='popup_col3'>
                                <Link>Accessori NoteBook</Link>
                                <Link>Borse, Zaini, etc</Link>
                                <Link>NoteBook</Link>
                                <Link>WorkStation/Server</Link>
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
                        <img src={navbarcomputeradv}></img>
                    </div>
                </div>
                <div id='popup_telefonia_werabile' className={style.popup_computer_tablet_notebook} style={{ opacity: PopUpTelefoniaWrable }} >
                    <div id='popup_options' className={style.popup_options}>
                        <h2 id='popup_title'>Computer Tablet NoteBook</h2>
                        <div id='popup_links' className={style.popup_links}>
                            <div id='popup_col1' className={style.popup_col1}>
                                <Link>Accessori Apple</Link>
                                <Link>Accessori Tablet</Link>
                                <Link>Computer</Link>
                                <Link>NoteBook Rigenerati</Link>
                                <Link>WorkStation e Server</Link>
                            </div>
                            <div id='popup_col2'>
                                <Link>Accessori Desktop</Link>
                                <Link>App</Link>
                                <Link>Microsoft Surface</Link>
                                <Link>Tablet</Link>
                            </div>
                            <div id='popup_col3'>
                                <Link>Accessori NoteBook</Link>
                                <Link>Borse, Zaini, etc</Link>
                                <Link>NoteBook</Link>
                                <Link>WorkStation/Server</Link>
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
                        <img src={navbarcomputeradv}></img>
                    </div>
                </div>
                <div id='popup_giochi' className={style.popup_computer_tablet_notebook} style={{ opacity: PopUpGiochi }}>
                    <div id='popup_options' className={style.popup_options}>
                        <h2 id='popup_title'>Computer Tablet NoteBook</h2>
                        <div id='popup_links' className={style.popup_links}>
                            <div id='popup_col1' className={style.popup_col1}>
                                <Link>Accessori Apple</Link>
                                <Link>Accessori Tablet</Link>
                                <Link>Computer</Link>
                                <Link>NoteBook Rigenerati</Link>
                                <Link>WorkStation e Server</Link>
                            </div>
                            <div id='popup_col2'>
                                <Link>Accessori Desktop</Link>
                                <Link>App</Link>
                                <Link>Microsoft Surface</Link>
                                <Link>Tablet</Link>
                            </div>
                            <div id='popup_col3'>
                                <Link>Accessori NoteBook</Link>
                                <Link>Borse, Zaini, etc</Link>
                                <Link>NoteBook</Link>
                                <Link>WorkStation/Server</Link>
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
                        <img src={navbarcomputeradv}></img>
                    </div></div>
            </div>



        </nav>

    </>
}