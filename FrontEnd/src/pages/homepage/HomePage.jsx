/*#region assets import */
import asusHomeAdv from '../../assets/homeadv/asushomeadv.jpg'
import gigaByteHomeAdv from '../../assets/homeadv/gigabytehomeadv.jpg'
import msiHomeAdv from '../../assets/homeadv/msihomeadv.jpg'
import rtx50HomeAdv from '../../assets/homeadv/rtx50homeadv.jpg'
import rtxBackToSchoolHomeAdv from '../../assets/homeadv/rtxbacktoschoolhomeadv.jpg'
import rtx5060homeAdv from '../../assets/homeadv/rtx5060homeadv.jpg'
import plusIcon from '../../assets/icons/plus-icon.png'
import arrowIcon from '../../assets/icons/icons8-freccia-100.png'
import msiGeForce5080 from '../../assets/productimages/MSI GeForce RTX 5060 8g.jpg'
import fujitsuEsprimo from '../../assets/productimages/FujitsuEsprimo E956 Intel Core i5-6500.jpg'
import samsung980SSD from '../../assets/productimages/Samsung 980 SSD 1TB M.2.jpg'
import dellProIntel from '../../assets/productimages/Dell Pro Intel Core Ultra 7 255U 16 GB.jpg'
import acerLogo from '../../assets/brandLogoHomePageCarousel/acer-sm.gif'
import akracingLogo from '../../assets/brandLogoHomePageCarousel/akracing-sm.gif'
import amdLogo from '../../assets/brandLogoHomePageCarousel/amd-sm.gif'
import aocLogo from '../../assets/brandLogoHomePageCarousel/aoc-sm.gif'
import appleLogo from '../../assets/brandLogoHomePageCarousel/apple-sm.gif'
import asusLogo from '../../assets/brandLogoHomePageCarousel/asus-sm.gif'
import barrowLogo from '../../assets/brandLogoHomePageCarousel/barrow-sm.gif'
import canonLogo from '../../assets/brandLogoHomePageCarousel/canon-sm.gif'
import coolerMasterLogo from '../../assets/brandLogoHomePageCarousel/coolermaster-sm.gif'
import corsairLogo from '../../assets/brandLogoHomePageCarousel/corsair-sm.gif'
import dLinkLogo from '../../assets/brandLogoHomePageCarousel/d-link-sm.gif'
import gigabyteLogo from '../../assets/brandLogoHomePageCarousel/gigabyte-sm.gif'
import hpLogo from '../../assets/brandLogoHomePageCarousel/hp-sm.gif'
import intelLogo from '../../assets/brandLogoHomePageCarousel/intel-sm.gif'
import lenovoLogo from '../../assets/brandLogoHomePageCarousel/lenovo-sm.gif'
import msiLogo from '../../assets/brandLogoHomePageCarousel/msimicrostar-sm.gif'
import nvidiaLogo from '../../assets/brandLogoHomePageCarousel/nvidia-sm.gif'
import pnyLogo from '../../assets/brandLogoHomePageCarousel/pny-sm.gif'
import qnapLogo from '../../assets/brandLogoHomePageCarousel/qnap-sm.gif'
import samsungLogo from '../../assets/brandLogoHomePageCarousel/samsung-sm.gif'
import sapphireLogo from '../../assets/brandLogoHomePageCarousel/sapphire-sm.gif'
import supermicroLogo from '../../assets/brandLogoHomePageCarousel/supermicro-sm.gif'
import targusLogo from '../../assets/brandLogoHomePageCarousel/targus-sm.gif'
import zotacLogo from '../../assets/brandLogoHomePageCarousel/zotac-sm.gif'
/*#endregion assets import */


import HeaderLayout from "../../components/HeaderLayout"
import FooterLayout from "../../components/FooterLayout"
import NavBar from "../../components/NavBar"
import style from './HomePage.module.scss'
import { useEffect, useState, useRef } from "react"
import { Link } from 'react-router-dom'

let carouselStart = true
const tempShortDescriprionMsi = "MSI GeForce RTX 5060 OC 8GB GDDR7 DLSS"
const tempShortDescriprionFujitsu = "FSP Fortron Vita BD 750W 80+Bronze PFC Attivo ATX 3.1"
const tempShortDescriprionSsd = "Digital WD Black SN7100 SSD 2TB M.2 NVMe PCIe 4.0 7250/6900 MB/s"
const tempShortDescriprionCpu = "Intel Core Ultra 7 265F 20 Core 2,4 GHz 30MB sk1851 Box"
const NUMBER_ELMENTS_BRAND_CAROUSEL = 13

export default function HomePage() {
    const advArray = [msiHomeAdv, asusHomeAdv, rtxBackToSchoolHomeAdv, rtx50HomeAdv, rtx5060homeAdv, gigaByteHomeAdv]
    const colorArray = ["rgb(0, 0, 0)", "rgb(235, 35, 35)", "rgb(35, 88, 235)", "rgb(82, 235, 35)", "rgb(35, 151, 0)", "rgb(188, 35, 235)"]
    const logoArray = [zotacLogo, targusLogo, supermicroLogo, sapphireLogo, samsungLogo, qnapLogo, pnyLogo, nvidiaLogo, msiLogo, lenovoLogo, intelLogo, hpLogo, gigabyteLogo, acerLogo, akracingLogo, amdLogo, aocLogo, appleLogo, asusLogo, barrowLogo, canonLogo, coolerMasterLogo, corsairLogo, dLinkLogo]

    const [homeAdvImg, setHomeAdvImg] = useState(advArray[0])
    const [backgroundButtonColor, setBackgroundButtonColor] = useState(colorArray[0])
    const [activeIndex, setActiveIndex] = useState(0)
    const timerRef = useRef(null)
    const [logoCarouselIndex, setLogoCarouselIndex] = useState(0)

    const [initialIndex, setInitialIndex] = useState(0)
    const [endIndex, setEndIndex] = useState(13)
    console.log("inital index = " + initialIndex);
    console.log("end index = " + endIndex);



    function handleAdvCarousel(index) {
        carouselStart = false
        setHomeAdvImg(advArray[index])
        setBackgroundButtonColor(colorArray[index])
        setActiveIndex(index)
        clearTimeout(timerRef.current)
    }




    function handleLogoCarousel(logo, index) {

        if (
            (initialIndex <= endIndex && index >= initialIndex && index <= endIndex) ||
            (initialIndex > endIndex && (index >= initialIndex || index <= endIndex))
        ) {
            return <img key={index} className={style.img_logo} src={logo} />;
        }

        return null
    }
    function handleBackArrow() {
        if (initialIndex - 1 < 0) {
            setInitialIndex((logoArray.length - 1) - NUMBER_ELMENTS_BRAND_CAROUSEL)
            setEndIndex(logoArray.length - 1)
            return
        } else {
            setInitialIndex(initialIndex - 1)
        }
        if (endIndex - 1 < 0) {
            setInitialIndex((logoArray.length - 1) - NUMBER_ELMENTS_BRAND_CAROUSEL)
            setEndIndex(logoArray.length - 1)
            return
        } else {
            setEndIndex(endIndex - 1)
        }



    }
    function handleForwardArrow() {
        if (endIndex + 1 >= logoArray.length) {
            setInitialIndex(0)
            setEndIndex(NUMBER_ELMENTS_BRAND_CAROUSEL)
            return
        } else {
            setEndIndex(endIndex + 1)
        }
        if (initialIndex + 1 >= logoArray.length) {
            setInitialIndex(0)
            setEndIndex(NUMBER_ELMENTS_BRAND_CAROUSEL)
            return
        } else {
            setInitialIndex(initialIndex + 1)
        }
    }


    function handleStringLength(string) {
        let stringLength = string.length

        if (stringLength > 50) {
            let cutString = string.substring(0, 40)

            return cutString + "..."
        } else {
            return string + "..."
        }
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
                            <button key={i} onClick={() => handleAdvCarousel(i)} className={activeIndex === i ? style.active : ""} style={{ backgroundColor: backgroundButtonColor }}>
                                {label}
                            </button>
                        ))}
                    </div>
                </div>

                <div id="offerte_del_giorno" className={style.offerte_del_giorno}>
                    <h3>Offerte del giorno <Link><img src={plusIcon}></img></Link></h3>
                    <div id="offerte_del_giorno_cards" className={style.offerte_del_giorno_cards}>
                        <div id="card" className={style.card}>
                            <span id="discount">-3%</span>
                            <img id="product_img" src={msiGeForce5080}></img>
                            <p id="short_description" className={style.short_description}>{handleStringLength(tempShortDescriprionMsi)}</p>
                            <p id="original_price" className={style.original_price}> € 385,00</p>
                            <p id="price" className={style.price}>€ 375,00</p>
                            <div id="separator" className={style.separator}></div>
                            <p id="scorte">Fino a esaurimento scorte</p>
                            <button id="product_details">Scopri di più</button>

                        </div>
                        <div id="card" className={style.card}>
                            <span id="discount">-3%</span>
                            <img id="product_img" src={fujitsuEsprimo}></img>
                            <p id="short_description" className={style.short_description}>{handleStringLength(tempShortDescriprionFujitsu)}</p>
                            <p id="original_price" className={style.original_price}> € 109,00</p>
                            <p id="price" className={style.price}>€ 98,00</p>
                            <div id="separator" className={style.separator}></div>
                            <p id="scorte">Fino a esaurimento scorte</p>
                            <button id="product_details">Scopri di più</button>

                        </div>
                        <div id="card" className={style.card}>
                            <span id="discount">-3%</span>
                            <img id="product_img" src={samsung980SSD}></img>
                            <p id="short_description" className={style.short_description}>{handleStringLength(tempShortDescriprionSsd)}</p>
                            <p id="original_price" className={style.original_price}> € 156,00</p>
                            <p id="price" className={style.price}>€ 126,00</p>
                            <div id="separator" className={style.separator}></div>
                            <p id="scorte">Fino a esaurimento scorte</p>
                            <button id="product_details">Scopri di più</button>

                        </div>
                        <div id="card" className={style.card}>
                            <span id="discount">-3%</span>
                            <img id="product_img" src={dellProIntel}></img>
                            <p id="short_description" className={style.short_description}>{handleStringLength(tempShortDescriprionCpu)}</p>
                            <p id="original_price" className={style.original_price}> € 380,00</p>
                            <p id="price" className={style.price}>€ 298,00</p>
                            <div id="separator" className={style.separator}></div>
                            <p id="scorte">Fino a esaurimento scorte</p>
                            <button id="product_details">Scopri di più</button>

                        </div>

                    </div>
                </div>

                <hr style={{ height: "2px", backgroundColor: "lightgray", width: "80%", margin: "auto", marginTop: "2rem" }}></hr>

                <div id='brand_list_logo' className={style.brand_list_logo}>
                    <img id='back_arrow' className={style.back_arrow} src={arrowIcon} onClick={(e) => handleBackArrow()}></img>
                    {logoArray.map((logo, index) => {

                        return handleLogoCarousel(logo, index)

                    })}
                    <img id='forward_arrow' className={style.forward_arrow} src={arrowIcon} onClick={(e) => handleForwardArrow()}></img>
                </div>
            </main>

            <FooterLayout />
        </>
    )
}