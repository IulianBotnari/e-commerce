import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import { useAuthContext } from "../../contexts/AuthContext";
import HeaderLayout from "../../components/HeaderLayout";
import NavBar from "../../components/NavBar";
import FooterLayout from "../../components/FooterLayout";
import style from "./ProductByCategory.module.scss"


/**
 * @fileoverview Componente funzionale che gestisce la visualizzazione dei prodotti filtrati per categoria.
 * Recupera il parametro di categoria dall'URL tramite `useParams`, quindi effettua una chiamata API
 * per ottenere i prodotti corrispondenti e li memorizza nello stato locale (`products`).
 * Include anche una funzione di utilità per troncare le stringhe.
 *
 * @component
 * @returns {JSX.Element} Il markup completo della pagina che mostra i prodotti filtrati.
 */
export default function ProductByCategory() {

    const { authApi, accessToken, userId } = useAuthContext()

    const category = useParams()
    const [products, setProducts] = useState([])
    console.log(category.category)

    async function getProductByCategory() {
        try {
            const response = await authApi.get(`/products/productbycategory/${category.category}`)
            setProducts(response.data)
            console.log(response.data);

        } catch (error) {
            console.error(error);

        }
    }

    async function addProductToCart(userId, productId) {
        if (accessToken) {
            console.log(userId);

            try {
                const response = await authApi.post(`/cart/${userId}/add/${productId}/${0}`)
                console.log(response.data);

            } catch (error) {
                console.error(console.error());

            }
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
        getProductByCategory()
    }, [category])



    return <>
        <HeaderLayout />
        <NavBar />
        <main>
            <div className={style.product_by_category_container}>
                {products.length > 0 ? products.map((element, index) => (
                    <div className={style.product_by_category_card} key={element.id}>
                        <span>{element.discountvalue}%</span>
                        <img src={`data:image/jpeg;base64,${element.image}`}></img>
                        <p className={style.short_description}>{handleStringLength(element.description)}</p>
                        {element.discountvalue > 0 ? <p className={style.original_price}>{`${element.price} €`}</p> : ""}
                        <p className={style.price}>{`${element.price - (element.price / 100 * element.discountvalue)} €`}</p>
                        <div className={`${style.separator}`}></div>
                        <p >Fino a esaurimento scorte</p>
                        <div>
                            <button className={style.scopri_di_piu}>Scopri di più</button>
                            <button className={style.aggiungi_al_carrello} onClick={() => addProductToCart(userId, element.id)}>Aggiungi al carrello</button>

                        </div>

                    </div>

                )) : <h1>Non ci sono articoli appartenenti a questa categoria</h1>}

            </div>

        </main>

        <FooterLayout />

    </>
}