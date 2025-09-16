import style from './componentsStyle/NavBar.module.css'
import { useState } from 'react'


export default function NavBar() {
    const [PopUpComputerTabletNoteBook, setPopUpComputerTabletNoteBook] = useState()
    const [PopUpConsumabileAccessori, setPopUpConsumabileAccessori] = useState()
    const [PopUpHardwareAccessori, setPopUpHardwareAccessori] = useState()
    const [PopUpMonitorStampantiPeriferiche, setPopUpMonitorStampantiPeriferiche] = useState()
    const [PopUpTelefoniaWrable, setPopUpTelefoniaWrable] = useState()
    const [PopUpGiochi, setPopUpGiochi] = useState()


    return <>

        <nav id="nav_bar" className={style.nav_bar}>
            <div id='nav_bar_category' className={style.nav_bar_category}>
                <div id="computer_tablet_notebook" onMouseLeave={() => setPopUpComputerTabletNoteBook("0")} onMouseOver={() => setPopUpComputerTabletNoteBook("1")}>COMPUTER TABLET NOTEBOOK</div>
                <div id="consumabile_accessori" onMouseLeave={() => setPopUpConsumabileAccessori("0")} onMouseOver={() => setPopUpConsumabileAccessori("1")}>CONSUMABILE ACCESSORI</div>
                <div id="hardware_software" onMouseLeave={() => setPopUpHardwareAccessori("0")} onMouseOver={() => setPopUpHardwareAccessori("1")}>HARDWARE SOFTWARE</div>
                <div id="monitor_stampanti_periferiche" onMouseLeave={() => setPopUpMonitorStampantiPeriferiche("0")} onMouseOver={() => setPopUpMonitorStampantiPeriferiche("1")}>MONITOR STAMPANTI PERIFERICHE</div>
                <div id="telefonia_werabile" onMouseLeave={() => setPopUpTelefoniaWrable("0")} onMouseOver={() => setPopUpTelefoniaWrable("1")}>TELEFONIA WEARABLE</div>
                <div id="giochi" onMouseLeave={() => setPopUpGiochi("0")} onMouseOver={() => setPopUpGiochi("1")}>GIOCHI</div>
            </div>
        </nav>
        <div id='popup_computer_tablet_notebook' className={style.popup_computer_tablet_notebook} style={{ opacity: PopUpComputerTabletNoteBook }} onMouseOver={() => setPopUpComputerTabletNoteBook("1")} onMouseLeave={() => setPopUpComputerTabletNoteBook("0")}>
            <div id='popup_options' className={style.popup_options}>
                <h2 id='popup_title'>Computer Tablet NoteBook</h2>
                <div id='popup_links'>
                    <div id='popup_col1'>
                        <a>Accessori Apple</a>
                        <a>Accessori Tablet</a>
                        <a>Computer</a>
                        <a>NoteBook Rigenerati</a>
                        <a>WorkStation e Server</a>
                    </div>
                    <div id='popup_col2'>
                        <a>Accessori Desktop</a>
                        <a>App</a>
                        <a>Microsoft Surface</a>
                        <a>Tablet</a>
                    </div>
                    <div id='popup_col3'>
                        <a>Accessori NoteBook</a>
                        <a>Borse, Zaini, etc</a>
                        <a>NoteBook</a>
                        <a>WorkStation/Server</a>
                    </div>
                </div>
            </div>

            <div id='popup_adv' className={style.popup_adv}>
                <h1>dsfsadf</h1>
            </div>
        </div>
        <div id='popup_consumabile_accessori' className={style.popup_consumabile_accessori} style={{ opacity: PopUpConsumabileAccessori }} onMouseOver={() => setPopUpComputerTabletNoteBook("1")} onMouseLeave={() => setPopUpComputerTabletNoteBook("0")}></div>
        <div id='popup_hardware_software' className={style.popup_computer_tablet_notebook} style={{ opacity: PopUpHardwareAccessori }} onMouseOver={() => setPopUpComputerTabletNoteBook("1")} onMouseLeave={() => setPopUpComputerTabletNoteBook("0")}></div>
        <div id='popup_monitor_stampanti_periferiche' className={style.popup_computer_tablet_notebook} style={{ opacity: PopUpMonitorStampantiPeriferiche }} onMouseOver={() => setPopUpComputerTabletNoteBook("1")} onMouseLeave={() => setPopUpComputerTabletNoteBook("0")}></div>
        <div id='popup_telefonia_werabile' className={style.popup_computer_tablet_notebook} style={{ opacity: PopUpTelefoniaWrable }} onMouseOver={() => setPopUpComputerTabletNoteBook("1")} onMouseLeave={() => setPopUpComputerTabletNoteBook("0")}></div>
        <div id='popup_giochi' className={style.popup_computer_tablet_notebook} style={{ opacity: PopUpGiochi }} onMouseOver={() => setPopUpComputerTabletNoteBook("block")} onMouseLeave={() => setPopUpComputerTabletNoteBook("0")}></div>



    </>
}