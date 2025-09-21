import HeaderLayout from "../../components/HeaderLayout"
import FooterLayout from "../../components/FooterLayout"
import NavBar from "../../components/NavBar"
import asusHomeAdv from '../../assets/homeadv/asushomeadv.jpg'
import gigaByteHomeAdv from '../../assets/homeadv/gigabytehomeadv.jpg'
import msiHomeAdv from '../../assets/homeadv/msihomeadv.jpg'
import rtx50HomeAdv from '../../assets/homeadv/rtx50homeadv.jpg'
import rtxBackToSchoolHomeAdv from '../../assets/homeadv/rtxbacktoschoolhomeadv.jpg'
import rtx5060homeAdv from '../../assets/homeadv/rtx5060homeadv.jpg'
import style from './HomePage.module.scss'
import { useEffect, useState, useRef } from "react"
let carouselStart = true

export default function HomePage() {
    const [homeAdvImg, setHomeAdvImg] = useState('')
    const [contatore, setContatore] = useState(1)
    const advArray = [msiHomeAdv, asusHomeAdv, rtxBackToSchoolHomeAdv, rtx50HomeAdv, rtx5060homeAdv, gigaByteHomeAdv]
    const timerRef = useRef(null)


    function handleButtonClick(id) {
        carouselStart = false
        setHomeAdvImg(advArray[id])
        clearTimeout(timerRef.current)
    }

    useEffect(() => {

        if (carouselStart == true) {

            timerRef.current = setTimeout(() => {
                setHomeAdvImg(advArray[contatore])
                if (contatore == advArray.length - 1) {
                    setContatore(0);
                } else {
                    setContatore(contatore + 1);
                }
            }, 1000)
        }
    }, [homeAdvImg])


    return <>
        <HeaderLayout />
        <NavBar />

        <main>
            <div id="home_adv" className={style.home_adv}>
                <img key={homeAdvImg} className={style.image} src={homeAdvImg ? homeAdvImg : advArray[0]}></img>
                <div id="home_adv_button_container" className={style.home_adv_button_container}>
                    <button id="0" onFocus={(e) => handleButtonClick(e.target.id)}>MSI a 100$ di steam code</button>
                    <button id="1" onFocus={(e) => handleButtonClick(e.target.id)}>ASUS Back to School</button>
                    <button id="2" onFocus={(e) => handleButtonClick(e.target.id)}>Back to School con RTX serie 50</button>
                    <button id="3" onFocus={(e) => handleButtonClick(e.target.id)}>Geforce RTX 50</button>
                    <button id="4" onFocus={(e) => handleButtonClick(e.target.id)}>Geforce-RTX-5060</button>
                    <button id="5" onFocus={(e) => handleButtonClick(e.target.id)}>GIGABYTE game bundle</button>
                </div>
            </div>

        </main>

        <FooterLayout />




    </>
}