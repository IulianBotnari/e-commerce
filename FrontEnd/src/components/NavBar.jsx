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
                <div id="computer_tablet_notebook" onMouseLeave={() => setPopUpComputerTabletNoteBook("none")} onMouseOver={() => setPopUpComputerTabletNoteBook("block")}>COMPUTER TABLET NOTEBOOK</div>
                <div id="consumabile_accessori" onMouseLeave={() => setPopUpConsumabileAccessori("none")} onMouseOver={() => setPopUpConsumabileAccessori("block")}>CONSUMABILE ACCESSORI</div>
                <div id="hardware_software" onMouseLeave={() => setPopUpHardwareAccessori("none")} onMouseOver={() => setPopUpHardwareAccessori("block")}>HARDWARE SOFTWARE</div>
                <div id="monitor_stampanti_periferiche" onMouseLeave={() => setPopUpMonitorStampantiPeriferiche("none")} onMouseOver={() => setPopUpMonitorStampantiPeriferiche("block")}>MONITOR STAMPANTI PERIFERICHE</div>
                <div id="telefonia_werabile" onMouseLeave={() => setPopUpTelefoniaWrable("none")} onMouseOver={() => setPopUpTelefoniaWrable("block")}>TELEFONIA WEARABLE</div>
                <div id="giochi" onMouseLeave={() => setPopUpGiochi("none")} onMouseOver={() => setPopUpGiochi("block")}>GIOCHI</div>
            </div>
        </nav>
        <div id='popup_computer_tablet_notebook' className={style.popup_computer_tablet_notebook} style={{ display: PopUpComputerTabletNoteBook }} onMouseOver={() => setPopUpComputerTabletNoteBook("block")} onMouseLeave={() => setPopUpComputerTabletNoteBook("none")}></div>
        <div id='popup_consumabile_accessori' className={style.popup_consumabile_accessori} style={{ display: PopUpConsumabileAccessori }} onMouseOver={() => setPopUpComputerTabletNoteBook("block")} onMouseLeave={() => setPopUpComputerTabletNoteBook("none")}></div>
        <div id='popup_hardware_software' className={style.popup_computer_tablet_notebook} style={{ display: PopUpHardwareAccessori }} onMouseOver={() => setPopUpComputerTabletNoteBook("block")} onMouseLeave={() => setPopUpComputerTabletNoteBook("none")}></div>
        <div id='popup_monitor_stampanti_periferiche' className={style.popup_computer_tablet_notebook} style={{ display: PopUpMonitorStampantiPeriferiche }} onMouseOver={() => setPopUpComputerTabletNoteBook("block")} onMouseLeave={() => setPopUpComputerTabletNoteBook("none")}></div>
        <div id='popup_telefonia_werabile' className={style.popup_computer_tablet_notebook} style={{ display: PopUpTelefoniaWrable }} onMouseOver={() => setPopUpComputerTabletNoteBook("block")} onMouseLeave={() => setPopUpComputerTabletNoteBook("none")}></div>
        <div id='popup_giochi' className={style.popup_computer_tablet_notebook} style={{ display: PopUpGiochi }} onMouseOver={() => setPopUpComputerTabletNoteBook("block")} onMouseLeave={() => setPopUpComputerTabletNoteBook("none")}></div>



    </>
}