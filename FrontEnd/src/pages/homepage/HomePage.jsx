/*#region assets import */
import asusHomeAdv from '../../assets/homeadv/asushomeadv.jpg'
import discountAdv from '../../assets/homeadv/bannerino-hp-offerte.jpg'
import gigaByteHomeAdv from '../../assets/homeadv/gigabytehomeadv.jpg'
import msiHomeAdv from '../../assets/homeadv/msihomeadv.jpg'
import rtx50HomeAdv from '../../assets/homeadv/rtx50homeadv.jpg'
import rtxBackToSchoolHomeAdv from '../../assets/homeadv/rtxbacktoschoolhomeadv.jpg'
import rtx5060homeAdv from '../../assets/homeadv/rtx5060homeadv.jpg'
import plusIcon from '../../assets/icons/plus-icon.png'
import arrowIcon from '../../assets/icons/icons8-freccia-100.png'
import logoShop from '../../assets/headerassets/negozi-next-mappa.jpg'

import faceBook from '../../assets/assistenza/facebook.png'
import youTube from '../../assets/assistenza/youTube.png'
import instagram from '../../assets/assistenza/instagram.png'
import tikTok from '../../assets/assistenza/tiktok.png'
import linkedin from '../../assets/assistenza/linkedin.png'
import contattaci from '../../assets/assistenza/contattaci.png'
import volantino from '../../assets/assistenza/volantino.png'

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
import { Link, useNavigate } from 'react-router-dom'
import { useAuthContext } from '../../contexts/AuthContext'
import { use } from 'react'

let carouselStart = true
const NUMBER_ELMENTS_BRAND_CAROUSEL = 13

export default function HomePage() {
    const advArray = [msiHomeAdv, asusHomeAdv, rtxBackToSchoolHomeAdv, rtx50HomeAdv, rtx5060homeAdv, gigaByteHomeAdv]
    const colorArray = ["rgb(0, 0, 0)", "rgb(235, 35, 35)", "rgb(35, 88, 235)", "rgb(82, 235, 35)", "rgb(35, 151, 0)", "rgb(188, 35, 235)"]
    const logoArray = [zotacLogo, targusLogo, supermicroLogo, sapphireLogo, samsungLogo, qnapLogo, pnyLogo, nvidiaLogo, msiLogo, lenovoLogo, intelLogo, hpLogo, gigabyteLogo, acerLogo, akracingLogo, amdLogo, aocLogo, appleLogo, asusLogo, barrowLogo, canonLogo, coolerMasterLogo, corsairLogo, dLinkLogo]
    const [homeAdvImg, setHomeAdvImg] = useState(advArray[0])
    const [backgroundButtonColor, setBackgroundButtonColor] = useState(colorArray[0])
    const [activeIndex, setActiveIndex] = useState(0)
    const timerRef = useRef(null)
    const [initialIndex, setInitialIndex] = useState(0)
    const [endIndex, setEndIndex] = useState(13)
    const { authApi } = useAuthContext()
    const [offertaDelGiorno, setOffertaDelGiorno] = useState()
    const [newProducts, setNewProducts] = useState()





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
            setEndIndex(endIndex - 1)
        }




    }
    function handleForwardArrow() {
        if (endIndex + 1 >= logoArray.length) {
            setInitialIndex(0)
            setEndIndex(NUMBER_ELMENTS_BRAND_CAROUSEL)
            return
        } else {
            setInitialIndex(initialIndex + 1)
            setEndIndex(endIndex + 1)
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

    async function getOfferDayProducts() {
        try {
            const response = await authApi.get("/products/daydiscountoffer")
            console.log(response.data);

            setOffertaDelGiorno(response.data)


        } catch (error) {
            console.error(error);

        }

    }


    async function getNewProducts() {
        try {
            const response = await authApi.get("/products/newproduct")
            console.log("Nuovi prodotti", response.data);

            setNewProducts(response.data)
        } catch (error) {
            console.error(error);


        }
    }

    useEffect(() => {
        getOfferDayProducts()
        getNewProducts()
    }, [])

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

                        {offertaDelGiorno?.map((element, index) => (

                            <>
                                <div className={style.card} key={index} >
                                    <span>{element.discountvalue}%</span>
                                    <img src={`data:image/jpeg;base64,${element.image}`}></img>
                                    <p className={style.short_description}>{handleStringLength(element.description)}</p>
                                    <p className={style.original_price}>{`${element.price} €`}</p>
                                    <p className={style.price}>{`${element.price - (element.price / 100 * element.discountvalue)} €`}</p>
                                    <div className={`${style.separator}`}></div>
                                    <p >Fino a esaurimento scorte</p>
                                    <button >Scopri di più</button>

                                </div>
                            </>
                        ))}


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


                <div id="discount_adv" className={style.discount_adv}>
                    <img src={discountAdv}></img>
                </div>


                <div id="novita" className={style.novita}>
                    <h3>Novita <Link><img src={plusIcon}></img></Link></h3>
                    <div id="novita_cards" className={style.novita_cards}>
                        {newProducts?.map((element, index) => (
                            <>
                                <div className={style.card} key={index}>
                                    <img src={`data:image/jpeg;base64,${element.image}`}></img>
                                    <p className={style.short_description}>{handleStringLength(element.description)}</p>
                                    <p className={style.news_price}>{`${element.price - (element.price / 100 * element.discountvalue)} €`}</p>
                                    <p >Fino a esaurimento scorte</p>
                                    <button >Scopri di più</button>
                                </div>
                            </>
                        ))}

                    </div>
                </div>


                <div id='assistenza' className={style.assistenza}>
                    <div id='assistenza_clienti' className={style.assistenza_clienti}>
                        <p><Link>ASSITENZA CLIENTI</Link></p>
                        <p id='tel'>03621791804</p>
                        <p><Link>serivizioclienti@next.it</Link></p>
                        <div id='contacts' className={style.contacts}><span>CONTATTI</span><img src={contattaci}></img></div>
                        <div id='social_links' className={style.social_links}>
                            <img src={faceBook}></img>
                            <img src={youTube}></img>
                            <img src={instagram}></img>
                            <img src={tikTok}></img>
                            <img src={linkedin}></img>
                        </div>
                    </div>

                    <div id='volantino' className={style.volantino}>
                        <img src={volantino}></img>
                    </div>

                    <div id='shop' className={style.shop}>
                        <p>COMPRA ONLINE O RITIRA GRATUITAMENTE IN NEGOZIO</p>
                        <p>Scopri il punto vendita più vicino a te:</p>
                        <img src={logoShop}></img>
                        <p>
                            <Link>Cantù</Link>
                            <Link>Como</Link>
                            <Link>Seregno</Link>
                            <Link>Limbiate</Link>
                        </p>
                        <p>
                            <Link>Milano Procaccini</Link>
                            <Link>Milano Vitruvio</Link>
                            <Link>Monza</Link>
                        </p>
                    </div>

                </div>
            </main>

            <FooterLayout />
        </>
    )
}