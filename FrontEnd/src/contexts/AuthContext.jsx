
import { useContext, createContext, useState } from "react";
import axios from "axios";
import { use } from "react";

const context = createContext()


export function AuthContext({ children }) {

    const [accessToken, setAccessToken] = useState()
    const [userName, setUserName] = useState()
    const [infoPageMessage, setInfoPageMessage] = useState()


    const authApi = axios.create({
        baseURL: "http://localhost:8080",
        withCredentials: true
    })

    authApi.interceptors.request.use(async (config) => {
        if (accessToken) {
            config.headers.Authorization = `Bearer ${accessToken}`
        }

        return config
    })

    authApi.interceptors.response.use(
        (response) => response,
        async (error) => {
            const originalRequest = error.config;

            if (
                error.response &&
                error.response.status === 401 &&
                !originalRequest._retry &&
                originalRequest.url !== "/users/refresh"
            ) {
                originalRequest._retry = true;

                try {
                    const response = await authApi.post("/users/refresh", {});
                    setAccessToken(response.data.accessToken);

                    originalRequest.headers.Authorization = `Bearer ${response.data.accessToken}`;

                    return authApi.request(originalRequest);
                } catch (e) {
                    console.error("Refresj fallito, logout necessario");
                    return Promise.reject(e);
                }
            }

            return Promise.reject(error);
        }
    );



    const values = { accessToken, setAccessToken, authApi, setUserName, userName, setInfoPageMessage, infoPageMessage }

    return (
        <context.Provider value={values}>
            {children}
        </context.Provider>
    )
}

export const useAuthContext = () => useContext(context)