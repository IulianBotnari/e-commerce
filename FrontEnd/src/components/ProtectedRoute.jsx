import { Navigate } from "react-router-dom";
import { useAuthContext } from "../contexts/AuthContext.jsx";

export default function ProtectedRoute({ children }) {
    const { accessToken } = useAuthContext();

    if (!accessToken) {
        return <Navigate to="/infopage" replace />;
    }

    return children;
}