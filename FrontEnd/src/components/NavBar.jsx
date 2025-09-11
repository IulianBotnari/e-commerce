import style from './componentsStyle/NavBar.module.css'
import { useState } from 'react'


export default function NavBar() {
    const [popUpDisplay, setPopUpDisplay] = useState()


    return <>

        <nav id="nav_bar" className={style.nav_bar}>
            <div id='nav_bar_category' className={style.nav_bar_category}>
                <div id="computer_tablet_notebook" className={style.computer_tablet_notebook} onMouseLeave={() => setPopUpDisplay("none")} onMouseOver={() => setPopUpDisplay("block")}>COMPUTER TABLET NOTEBOOK</div>
                <div id="consumabile_accessori">CONSUMABILE ACCESSORI</div>
                <div id="hardware_software">HARDWARE SOFTWARE</div>
                <div id="monitor_stampanti_periferiche">MONITOR STAMPANTI PERIFERICHE</div>
                <div id="telefonia_werabile">TELEFONIA WEARABLE</div>
                <div id="giochi">GIOCHI</div>
            </div>
        </nav>
        <div id='nav_bar_popup' className={style.nav_bar_popup} style={{ display: popUpDisplay }} onMouseOver={() => setPopUpDisplay("block")} onMouseLeave={() => setPopUpDisplay("none")}></div>



    </>
}