import asusHomeAdv from '../../assets/homeadv/asushomeadv.jpg' // Immagine ADV Asus
import discountAdv from '../../assets/homeadv/bannerino-hp-offerte.jpg' // Immagine ADV Sconti
import gigaByteHomeAdv from '../../assets/homeadv/gigabytehomeadv.jpg' // Immagine ADV Gigabyte
import msiHomeAdv from '../../assets/homeadv/msihomeadv.jpg' // Immagine ADV MSI
import rtx50HomeAdv from '../../assets/homeadv/rtx50homeadv.jpg' // Immagine ADV RTX 50 series
import rtxBackToSchoolHomeAdv from '../../assets/homeadv/rtxbacktoschoolhomeadv.jpg' // Immagine ADV Back to School
import rtx5060homeAdv from '../../assets/homeadv/rtx5060homeadv.jpg' // Immagine ADV RTX 5060
import plusIcon from '../../assets/icons/plus-icon.png' // Icona Più
import arrowIcon from '../../assets/icons/icons8-freccia-100.png' // Icona Freccia
import logoShop from '../../assets/headerassets/negozi-next-mappa.jpg' // Mappa Negozi

// Icone social e assistenza
import faceBook from '../../assets/assistenza/facebook.png'
import youTube from '../../assets/assistenza/youtube.png'
import instagram from '../../assets/assistenza/instagram.png'
import tikTok from '../../assets/assistenza/tiktok.png'
import linkedin from '../../assets/assistenza/linkedin.png'
import contattaci from '../../assets/assistenza/contattaci.png'
import volantino from '../../assets/assistenza/volantino.png'

// Loghi per il carosello brand
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


import HeaderLayout from "../../components/HeaderLayout"
import FooterLayout from "../../components/FooterLayout"
import NavBar from "../../components/NavBar"
import style from './HomePage.module.scss'
import { useEffect, useState, useRef } from "react"
import { Link, useNavigate } from 'react-router-dom'
import { useAuthContext } from '../../contexts/AuthContext'
// L'importazione di 'use' non è necessaria in questo contesto e può essere rimossa.
// import { use } from 'react' 

// Variabile globale (per semplicità) che indica se il carosello ADV deve continuare a ciclare automaticamente.
let carouselStart = true
// Numero di elementi da mostrare contemporaneamente nel carosello dei brand.
const NUMBER_ELMENTS_BRAND_CAROUSEL = 13

/**
 * @file HomePage.jsx
 * @description Componente principale per la Home Page, gestisce caroselli e il fetch iniziale dei dati.
 */
export default function HomePage() {
    // Array di immagini pubblicitarie per il carosello principale.
    const advArray = [msiHomeAdv, asusHomeAdv, rtxBackToSchoolHomeAdv, rtx50HomeAdv, rtx5060homeAdv, gigaByteHomeAdv]
    // Array di colori corrispondenti ad ogni ADV per i bottoni di navigazione.
    const colorArray = ["rgb(0, 0, 0)", "rgb(235, 35, 35)", "rgb(35, 88, 235)", "rgb(82, 235, 35)", "rgb(35, 151, 0)", "rgb(188, 35, 235)"]
    // Array di loghi dei brand per il carosello inferiore.
    const logoArray = [zotacLogo, targusLogo, supermicroLogo, sapphireLogo, samsungLogo, qnapLogo, pnyLogo, nvidiaLogo, msiLogo, lenovoLogo, intelLogo, hpLogo, gigabyteLogo, acerLogo, akracingLogo, amdLogo, aocLogo, appleLogo, asusLogo, barrowLogo, canonLogo, coolerMasterLogo, corsairLogo, dLinkLogo]

    // Stato per l'immagine ADV attualmente visualizzata.
    const [homeAdvImg, setHomeAdvImg] = useState(advArray[0])
    // Stato per il colore di sfondo del bottone ADV attivo.
    const [backgroundButtonColor, setBackgroundButtonColor] = useState(colorArray[0])
    // Stato per l'indice corrente dell'ADV attivo.
    const [activeIndex, setActiveIndex] = useState(0)
    // Ref per mantenere l'ID del timer del carosello automatico.
    const timerRef = useRef(null)

    // Stati per la gestione della visualizzazione dei loghi nel carosello brand.
    const [initialIndex, setInitialIndex] = useState(0)
    const [endIndex, setEndIndex] = useState(NUMBER_ELMENTS_BRAND_CAROUSEL)

    // Ottiene l'istanza Axios pre-configurata per le chiamate API.
    const { authApi } = useAuthContext()

    // Stato per memorizzare i prodotti in offerta del giorno.
    const [offertaDelGiorno, setOffertaDelGiorno] = useState()
    // Stato per memorizzare i nuovi prodotti.
    const [newProducts, setNewProducts] = useState()

    /**
     * @function handleAdvCarousel
     * @description Gestisce il cambio manuale dell'ADV (cliccando sui bottoni).
     * @param {number} index - L'indice dell'ADV da visualizzare.
     * Interrompe il ciclo automatico e resetta il timer.
     */
    function handleAdvCarousel(index) {
        carouselStart = false // Ferma il ciclo automatico
        setHomeAdvImg(advArray[index])
        setBackgroundButtonColor(colorArray[index])
        setActiveIndex(index)
        clearTimeout(timerRef.current) // Pulisce il timer esistente
    }

    /**
     * @function handleLogoCarousel
     * @description Funzione di rendering condizionale per il carosello dei brand.
     * Mostra solo i loghi compresi tra `initialIndex` e `endIndex`.
     */
    function handleLogoCarousel(logo, index) {
        // Logica per gestire il wrapping del carosello (quando l'indice finale supera la lunghezza)
        const isVisible = (initialIndex <= endIndex && index >= initialIndex && index <= endIndex) ||
            (initialIndex > endIndex && (index >= initialIndex || index <= endIndex));

        if (isVisible) {
            return <img key={index} className={style.img_logo} src={logo} alt={`Logo Brand ${index + 1}`} />;
        }

        return null
    }

    /**
     * @function handleBackArrow
     * @description Sposta il carosello dei loghi indietro di una posizione.
     * Gestisce il wrapping al raggiungimento dell'inizio dell'array.
     */
    function handleBackArrow() {
        if (initialIndex - 1 < 0) {
            // Se si è al primo elemento, torna alla fine dell'array.
            setInitialIndex(logoArray.length - NUMBER_ELMENTS_BRAND_CAROUSEL)
            setEndIndex(logoArray.length - 1)
            return
        } else {
            // Sposta entrambi gli indici indietro.
            setInitialIndex(initialIndex - 1)
            setEndIndex(endIndex - 1)
        }
    }

    /**
     * @function handleForwardArrow
     * @description Sposta il carosello dei loghi avanti di una posizione.
     * Gestisce il wrapping al raggiungimento della fine dell'array.
     */
    function handleForwardArrow() {
        if (endIndex + 1 >= logoArray.length) {
            // Se si è all'ultimo elemento, ricomincia dall'inizio.
            setInitialIndex(0)
            setEndIndex(NUMBER_ELMENTS_BRAND_CAROUSEL - 1) // Deve essere 12 se NUMBER_ELMENTS è 13
            return
        } else {
            // Sposta entrambi gli indici avanti.
            setInitialIndex(initialIndex + 1)
            setEndIndex(endIndex + 1)
        }
    }

    /**
     * @function handleStringLength
     * @description Trunca una stringa (es. descrizione prodotto) se supera una certa lunghezza.
     * @param {string} string - La stringa da valutare.
     * @returns {string} La stringa troncata o originale con puntini di sospensione.
     */
    function handleStringLength(string) {
        let stringLength = string.length

        if (stringLength > 50) {
            let cutString = string.substring(0, 40)

            return cutString + "..."
        } else {
            return string + "..."
        }
    }

    /**
     * @function useEffect (Carosello ADV Automatico)
     * @description Gestisce la logica di avanzamento automatico del carosello ADV ogni 5 secondi.
     * Dipende da `activeIndex` per il loop.
     */
    useEffect(() => {
        if (carouselStart) {
            timerRef.current = setTimeout(() => {
                const nextIndex = activeIndex === advArray.length - 1 ? 0 : activeIndex + 1
                setHomeAdvImg(advArray[nextIndex])
                setBackgroundButtonColor(colorArray[nextIndex])
                setActiveIndex(nextIndex)
            }, 5000)
        }
        // Cleanup function: pulisce il timer quando il componente si smonta o `activeIndex` cambia.
        return () => clearTimeout(timerRef.current)
    }, [activeIndex, advArray.length]) // Aggiunta dipendenza da advArray.length per robustezza

    /**
     * @async
     * @function getOfferDayProducts
     * @description Recupera i prodotti in offerta del giorno dal backend.
     */
    async function getOfferDayProducts() {
        try {
            const response = await authApi.get("/products/daydiscountoffer")
            // console.log("Offerte del giorno:", response.data);
            setOffertaDelGiorno(response.data)
        } catch (error) {
            console.error("Errore nel recupero delle offerte:", error);
        }
    }

    /**
     * @async
     * @function getNewProducts
     * @description Recupera gli ultimi prodotti aggiunti.
     */
    async function getNewProducts() {
        try {
            const response = await authApi.get("/products/newproduct")
            // console.log("Nuovi prodotti:", response.data);
            setNewProducts(response.data)
        } catch (error) {
            console.error("Errore nel recupero dei nuovi prodotti:", error);
        }
    }

    /**
     * @function useEffect (Caricamento Iniziale Dati)
     * @description Esegue il fetch iniziale dei dati (offerte e nuovi prodotti) al montaggio del componente.
     */
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

                            <div className={style.card} key={index}>
                                <img src={`data:image/jpeg;base64,${element.image}`}></img>
                                <p className={style.short_description}>{handleStringLength(element.description)}</p>
                                <p className={style.news_price}>{`${element.price - (element.price / 100 * element.discountvalue)} €`}</p>
                                <p >Fino a esaurimento scorte</p>
                                <button >Scopri di più</button>
                            </div>

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