
import { Navigate } from "react-router-dom"
import { useAuthContext } from "../../contexts/AuthContext"



export default function Infopage() {
    const { accessToken } = useAuthContext()

    return <>
        <h1>Non autorizzato 401</h1>
    </>
}