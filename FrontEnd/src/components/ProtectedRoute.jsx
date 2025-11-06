import { Navigate } from "react-router-dom";
import { useAuthContext } from "../contexts/AuthContext.jsx";

/**
 * @file ProtectedRoute.jsx
 * @description Componente Route Wrapper che protegge l'accesso ai componenti figli.
 * Reindirizza l'utente alla pagina informativa (/infopage) se non è autenticato (manca l'accessToken).
 *
 * @param {object} props - Le props del componente.
 * @param {React.ReactNode} props.children - I componenti che devono essere visualizzati solo se l'utente è autenticato.
 */
export default function ProtectedRoute({ children }) {
    // Recupera lo stato dell'autenticazione dal contesto.
    const { accessToken } = useAuthContext();

    // Logica di protezione: se non c'è un accessToken, reindirizza l'utente.
    if (!accessToken) {
        // Usa 'replace' per impedire all'utente di tornare alla pagina protetta con il tasto indietro.
        return <Navigate to="/infopage" replace />;
    }

    // Se l'utente è autenticato, visualizza i componenti figli.
    return children;
}