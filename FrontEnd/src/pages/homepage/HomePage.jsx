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
    const advArray = [msiHomeAdv, asusHomeAdv, rtxBackToSchoolHomeAdv, rtx50HomeAdv, rtx5060homeAdv, gigaByteHomeAdv]
    const colorArray = ["rgb(0, 0, 0)", "rgb(235, 35, 35)", "rgb(35, 88, 235)", "rgb(82, 235, 35)", "rgb(35, 151, 0)", "rgb(188, 35, 235)"]

    const [homeAdvImg, setHomeAdvImg] = useState(advArray[0])
    const [backgroundButtonColor, setBackgroundButtonColor] = useState(colorArray[0])
    const [activeIndex, setActiveIndex] = useState(0)
    const timerRef = useRef(null)

    function handleButtonClick(index) {
        carouselStart = false
        setHomeAdvImg(advArray[index])
        setBackgroundButtonColor(colorArray[index])
        setActiveIndex(index)
        clearTimeout(timerRef.current)
    }

    useEffect(() => {
        if (carouselStart) {
            timerRef.current = setTimeout(() => {
                const nextIndex = activeIndex === advArray.length - 1 ? 0 : activeIndex + 1
                setHomeAdvImg(advArray[nextIndex])
                setBackgroundButtonColor(colorArray[nextIndex])
                setActiveIndex(nextIndex)
            }, 5000)
        }
        return () => clearTimeout(timerRef.current)
    }, [activeIndex])

    return (
        <>
            <HeaderLayout />
            <NavBar />

            <main>
                <div id="home_adv" className={style.home_adv}>
                    <img key={homeAdvImg} className={style.image} src={homeAdvImg} alt="adv" />
                    <div id="home_adv_button_container" className={style.home_adv_button_container} style={{ backgroundColor: backgroundButtonColor }}  >
                        {["MSI a 100$ di steam code", "ASUS Back to School", "Back to School con RTX serie 50", "Geforce RTX 50", "Geforce-RTX-5060", "GIGABYTE game bundle"
                        ].map((label, i) => (
                            <button key={i} onClick={() => handleButtonClick(i)} className={activeIndex === i ? style.active : ""} style={{ backgroundColor: backgroundButtonColor }}>
                                {label}
                            </button>
                        ))}
                    </div>
                </div>
            </main>

            <FooterLayout />
        </>
    )
}