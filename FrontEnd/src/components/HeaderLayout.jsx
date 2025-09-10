import logo from '../assets/NextLogo.png'
import negoziNextMappa from '../assets/negozi-next-mappa.jpg'
import searchIcon from '../assets/search-icon.png'
import style from './componentsStyle/HeaderLayout.module.css'


export default function HeaderLayout() {



    return <>
        <header className={style.header_style}>
            <div id="logo_search_bar" className={style.logo_search_bar}>
                <div id='container_logo' className={style.container_logo}>
                    <img id="logo" src={logo} alt='logo'></img>
                </div>
                <div id='search_bar_container' className={style.search_bar_container}>
                    <input id='input_search_bar' className={style.input_search_bar} type='text' placeholder='Cerca prodotti o marca'></input>
                    <img className={style.search_icon} src={searchIcon}></img>
                </div>
            </div>

            <div id="login_logout" className={style.login_logout}>
                <div id='button_container' className={style.button_container}>
                    <button id="login">Accedi</button>
                    <button id="chart">Carrello</button>
                </div>
                <img id="store_map" src={negoziNextMappa} className={style.store_map} alt='vai a negozi'></img>
            </div>

        </header>

    </>
}