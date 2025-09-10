import logo from '../assets/NextLogo.png'
import negoziNextMappa from '../assets/negozi-next-mappa.jpg'


export default function HeaderLayout() {



    return <>
        <header>
            <div id="logo_search_bar">
                <img id="logo" src={logo} alt='logo'></img>
                <div id='search_bar'></div>
            </div>

            <div id="login_logout">
                <button id="login">Accedi</button>
                <button id="chart">Carrello</button>
                <img id="store_map" src={negoziNextMappa} alt='vai a negozi'></img>
            </div>

        </header>

    </>
}