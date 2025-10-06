import logo from '../assets/headerassets/NextLogo.png'
import negoziNextMappa from '../assets/headerassets/negozi-next-mappa.jpg'
import searchIcon from '../assets/headerassets/search-icon.png'
import style from './componentsStyle/HeaderLayout.module.scss'
import { useNavigate } from 'react-router-dom'
import { useAuthContext } from '../contexts/AuthContext'
import { useRef } from 'react'


export default function HeaderLayout() {

    const navigateTo = useNavigate()
    const navigateToHome = useNavigate()
    const { userName, authApi } = useAuthContext()
    const buttonRef = useRef()

    function handleAccessButton() {
        const value = buttonRef.current.innerText


        if (value === "Accedi") {
            navigateTo('/user/login')
        } else {
            (async () => {

                try {
                    const response = await authApi.get('/users/verify-credentials')
                    console.log(response.status);

                    if (response.status === 202) {

                        navigateTo('/user/user-account')
                    }
                } catch (error) {
                    console.log(error.status);


                }
            })()
        }


    }





    return <>
        <header className={style.header_style}>
            <div id="logo_search_bar" className={style.logo_search_bar}>
                <div id='container_logo' className={style.container_logo}>
                    <img id="logo" src={logo} alt='logo' onClick={() => navigateToHome("/")}></img>
                </div>
                <div id='search_bar_container' className={style.search_bar_container}>
                    <input id='input_search_bar' className={style.input_search_bar} type='text' placeholder='Cerca prodotti o marca'></input>
                    <img className={style.search_icon} src={searchIcon}></img>
                </div>
            </div>

            <div id="login_logout" className={style.login_logout}>
                <div id='button_container' className={style.button_container}>
                    <button id="login" ref={buttonRef} onClick={() => handleAccessButton()}>{userName ? userName : "Accedi"}</button>
                    <button id="chart">Carrello</button>
                </div>
                <img id="store_map" src={negoziNextMappa} className={style.store_map} alt='vai a negozi'></img>
            </div>

        </header>

    </>
}