import HeaderLayout from "../../components/HeaderLayout"
import FooterLayout from "../../components/FooterLayout"
import NavBar from "../../components/NavBar"
import style from './HomePage.module.css'

export default function HomePage() {


    return <>
        <HeaderLayout />
        <NavBar />

        <main>
            <h1>Questa e la mia home</h1>

        </main>

        <FooterLayout />




    </>
}