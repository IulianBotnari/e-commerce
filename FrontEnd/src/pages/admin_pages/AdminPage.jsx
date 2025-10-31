import adminStyle from '../admin_pages/AdminPage.module.scss'
import { useAuthContext } from '../../contexts/AuthContext'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function AdminPage() {

    const { authApi } = useAuthContext()
    const navigateToHome = useNavigate()
    const [productData, setProductData] = useState()
    const [searchBarValue, setSearchBarValue] = useState()
    const [searchedProduct, setSearchedProduct] = useState()
    const formData = new FormData()
    console.log(productData?.image);



    function handleProductData(e) {
        const { name, value, files } = e.target


        setProductData((prev) => ({
            ...prev,
            [name]: name === "image" ? files[0] : value,
        }
        ))

    }

    async function registerProduct(e) {
        e.preventDefault();
        const formData = new FormData();
        formData.append("file", productData.image);
        const metadata = {
            category: productData.category,
            brand: productData.brand,
            name: productData.name,
            description: productData.description,
            price: productData.price,
        };
        formData.append("image", productData.image)

        formData.append(
            "metadata",
            new Blob([JSON.stringify(metadata)], { type: "application/json" })
        );
        try {
            const response = await authApi.post('/products/postproduct', formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });

            console.log(response.data);
            setProductData(null)
        } catch (error) {
            console.error(error);
        }
    }


    async function findProductByCode(e, code) {
        e.preventDefault()

        try {
            const response = await authApi.get(`/products/${code}`)
            console.log(response.data);
            setProductData(response.data)
            setSearchedProduct(response.data)


        } catch (e) {
            console.error(e.getMessage());

        }

    }

    function selectCategory(productData, searchedProduct) {
        if (productData != null) {
            return productData.category
        } else if (searchedProduct != null) {
            return searchedProduct.category
        } else {
            return ""
        }
    }


    async function updateProduct(e) {
        e.preventDefault();
        const formData = new FormData();
        const metadata = {
            category: productData.category,
            brand: productData.brand,
            name: productData.name,
            description: productData.description,
            price: productData.price,
        };

        if (productData.image) {
            formData.append("image", productData.image);
            console.log("image  " + productData.image);

        }
        formData.append(
            "metadata",
            new Blob([JSON.stringify(metadata)], { type: "application/json" })
        );
        try {
            const response = await authApi.put('/products/updateproduct', formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });

        } catch (error) {
            console.error(error.message);
        }
    }






    return <>

        <h1>Amministrazione</h1>
        <h2>Gestisci i tuoi prodotti</h2>
        <button onClick={() => navigateToHome("/")}>Torna a HomePage</button>
        <form className={adminStyle.add_product_form} onSubmit={registerProduct}>
            <h3>Aggiungi prodotto</h3>
            <div className={adminStyle.row}>
                <label>Categoria: </label>
                <select name={"category"} onChange={(e) => handleProductData(e)} >
                    <option>Seleziona</option>
                    <optgroup label={'Computer Tablet NoteBook'}>
                        <option>Accessori Apple</option>
                        <option>Accesori Tablet</option>
                        <option>Computer</option>
                        <option>NoteBook Rigenerati</option>
                        <option>WorkStation e Server</option>
                        <option>Accessori Desktop</option>
                        <option>App</option>
                        <option>Microsoft Surface</option>
                        <option>Tablet</option>
                        <option>Accessori NoteBook</option>
                        <option>Borse, Zaini, etc</option>
                        <option>NoteBook</option>
                    </optgroup>
                    <optgroup label={'Consumabile Accessori'}>
                        <option>Cavi</option>
                        <option>Power Bank</option>
                        <option>Accessori iPhone</option>
                        <option>Accessori Samsung</option>
                        <option>Pendrive USB</option>
                        <option>Consumabile</option>
                        <option>Accessori Apple</option>
                        <option>Accessori Mobile</option>
                        <option>Accesori Tablet</option>
                        <option>Sedie Gaming</option>
                        <option>Multiprese</option>
                        <option>Accessori Asus</option>
                        <option>Accessori NoteBook</option>
                        <option>Case Accesori</option>
                    </optgroup>
                    <optgroup label='Hardware e Software'>
                        <option>Alimentatori</option>
                        <option>Case Accessori</option>
                        <option>Dissipatore CPU</option>
                        <option>Masterizzatori</option>
                        <option>Rack Case</option>
                        <option>Software Antivirus</option>
                        <option>Networking</option>
                        <option>Webcam</option>
                        <option>Card Reader, Hub</option>
                        <option>Controller Raid</option>
                        <option>Hard Disk e SSD</option>
                        <option>Memorie Flash</option>
                        <option>Schede I/O</option>
                        <option>Water Cooling</option>
                        <option>Router</option>
                        <option>Case</option>
                        <option>CPU</option>
                        <option>Schede Video</option>
                        <option>Memorie Ram</option>
                        <option>Main Board</option>
                        <option>Windows e Office</option>
                        <option>UPS</option>
                    </optgroup>
                    <optgroup label={'Monitor Stampanti Periferiche'}>
                        <option>Gaming Chair</option>
                        <option>NAS</option>
                        <option>Stampanti/Scanner</option>
                        <option>Ufficio</option>
                        <option>Cuffie</option>
                        <option>Monitor</option>
                        <option>Tastiere</option>
                        <option>UPS</option>
                        <option>Videosorveglianza</option>
                        <option>Mouse</option>
                        <option>Periferiche Gaming</option>
                        <option>Tavoletta Grafica</option>
                        <option>Webcam</option>
                    </optgroup>
                    <optgroup label={'Telefonia wearable'}>
                        <option>Accessori Asus</option>
                        <option>Caricatori</option>
                        <option>Watch</option>
                        <option>Accessori iPhone</option>
                        <option>iPhone</option>
                        <option>Tablet</option>
                        <option>Accessori Mobile</option>
                        <option>Smartphone</option>
                        <option>Visore VR</option>
                    </optgroup>
                </select>
            </div>
            <div className={adminStyle.row}>
                <label htmlFor='brand'>Brand: </label>
                <input type='text' name='brand' placeholder='Inserisci il brand del prodotto' onChange={(e) => handleProductData(e)} required></input>
            </div>
            <div className={adminStyle.row}>
                <label htmlFor='name'>Nome: </label>
                <input type='text' name='name' placeholder='Inserisci il nome del prodotto' onChange={(e) => handleProductData(e)} required></input>
            </div>
            <div className={adminStyle.row}>
                <label htmlFor='description'>Descrizione: </label>
                <input type='text' name='description' placeholder='Inserisci la descrizione del prodotto' onChange={(e) => handleProductData(e)} required></input>
            </div>
            <div className={adminStyle.row}>
                <label htmlFor='price'>Prezzo: </label>
                <input type='number' name='price' onChange={(e) => handleProductData(e)} required></input>
            </div>
            <div className={adminStyle.row}>
                <label htmlFor='image'>Immagine: </label>
                <input type='file' name='image' onChange={(e) => handleProductData(e)} ></input>
            </div>
            <div className={adminStyle.row}>
                <button type='submit'>Aggiungi prodotto</button>
            </div>
        </form>

        <form className={adminStyle.add_product_form}>
            <h3>Modifica prodotto</h3>
            <div className={adminStyle.search_bar}>
                <label>Ricerca per codice prodotto</label>
                <input type='text' onChange={(e) => setSearchBarValue(e.target.value)}></input>
                <button onClick={(e) => findProductByCode(e, searchBarValue)}>Cerca</button>

            </div>
            <div className={adminStyle.row}>
                <label>Categoria: </label>
                <select name={"category"} value={selectCategory(productData, searchedProduct)} onChange={(e) => handleProductData(e)} >
                    <option>Seleziona</option>
                    <optgroup label={'Computer Tablet NoteBook'}>
                        <option>Accessori Apple</option>
                        <option>Accesori Tablet</option>
                        <option>Computer</option>
                        <option>NoteBook Rigenerati</option>
                        <option>WorkStation e Server</option>
                        <option>Accessori Desktop</option>
                        <option>App</option>
                        <option>Microsoft Surface</option>
                        <option>Tablet</option>
                        <option>Accessori NoteBook</option>
                        <option>Borse, Zaini, etc</option>
                        <option>NoteBook</option>
                    </optgroup>
                    <optgroup label={'Consumabile Accessori'}>
                        <option>Cavi</option>
                        <option>Power Bank</option>
                        <option>Accessori iPhone</option>
                        <option>Accessori Samsung</option>
                        <option>Pendrive USB</option>
                        <option>Consumabile</option>
                        <option>Accessori Apple</option>
                        <option>Accessori Mobile</option>
                        <option>Accesori Tablet</option>
                        <option>Sedie Gaming</option>
                        <option>Multiprese</option>
                        <option>Accessori Asus</option>
                        <option>Accessori NoteBook</option>
                        <option>Case Accesori</option>
                    </optgroup>
                    <optgroup label='Hardware e Software'>
                        <option>Alimentatori</option>
                        <option>Case Accessori</option>
                        <option>Dissipatore CPU</option>
                        <option>Masterizzatori</option>
                        <option>Rack Case</option>
                        <option>Software Antivirus</option>
                        <option>Networking</option>
                        <option>Webcam</option>
                        <option>Card Reader, Hub</option>
                        <option>Controller Raid</option>
                        <option>Hard Disk e SSD</option>
                        <option>Memorie Flash</option>
                        <option>Schede I/O</option>
                        <option>Water Cooling</option>
                        <option>Router</option>
                        <option>Case</option>
                        <option>CPU</option>
                        <option>Schede Video</option>
                        <option>Memorie Ram</option>
                        <option>Main Board</option>
                        <option>Windows e Office</option>
                        <option>UPS</option>
                    </optgroup>
                    <optgroup label={'Monitor Stampanti Periferiche'}>
                        <option>Gaming Chair</option>
                        <option>NAS</option>
                        <option>Stampanti/Scanner</option>
                        <option>Ufficio</option>
                        <option>Cuffie</option>
                        <option>Monitor</option>
                        <option>Tastiere</option>
                        <option>UPS</option>
                        <option>Videosorveglianza</option>
                        <option>Mouse</option>
                        <option>Periferiche Gaming</option>
                        <option>Tavoletta Grafica</option>
                        <option>Webcam</option>
                    </optgroup>
                    <optgroup label={'Telefonia wearable'}>
                        <option>Accessori Asus</option>
                        <option>Caricatori</option>
                        <option>Watch</option>
                        <option>Accessori iPhone</option>
                        <option>iPhone</option>
                        <option>Tablet</option>
                        <option>Accessori Mobile</option>
                        <option>Smartphone</option>
                        <option>Visore VR</option>
                    </optgroup>
                </select>
            </div>
            <div className={adminStyle.row}>
                <label htmlFor='brand'>Brand: </label>
                <input type='text' name='brand' placeholder='Inserisci il brand del prodotto' onChange={(e) => handleProductData(e)} value={searchedProduct != null ? searchedProduct.brand : ""} required></input>
            </div>
            <div className={adminStyle.row}>
                <label htmlFor='name'>Nome: </label>
                <input type='text' name='name' placeholder='Inserisci il nome del prodotto' onChange={(e) => handleProductData(e)} value={searchedProduct != null ? searchedProduct.name : ""} required></input>
            </div>
            <div className={adminStyle.row}>
                <label htmlFor='description'>Descrizione: </label>
                <input type='text' name='description' placeholder='Inserisci la descrizione del prodotto' onChange={(e) => handleProductData(e)} value={searchedProduct != null ? searchedProduct.description : ""} required></input>
            </div>
            <div className={adminStyle.row}>
                <label htmlFor='price'>Prezzo: </label>
                <input type='number' name='price' onChange={(e) => handleProductData(e)} value={searchedProduct != null ? searchedProduct.price : ""} required></input>
            </div>
            <div className={adminStyle.row}>
                <label htmlFor='image'>Immagine: </label>
                <input type='file' name='image' onChange={(e) => handleProductData(e)} ></input>
            </div>
            <img src={searchedProduct != null ? `data:image/jpeg;base64,${searchedProduct.image}` : null}></img>
            <div className={adminStyle.row_button}>
                <button onClick={(e) => updateProduct(e)}>Modifica prodotto</button><button>Elimina Prodotto</button>
            </div>
        </form>


    </>
}