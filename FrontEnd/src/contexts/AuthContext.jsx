
import { useContext, createContext, useState } from "react";
import axios from "axios";

const context = createContext()


export function AuthContext({ children }) {

    const [accessToken, setAccessToken] = useState()
    const [userName, setUserName] = useState()

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


    authApi.interceptors.response.use((response) => response,
        async (error) => {
            if (error.response && error.response.status === 401) {
                try {
                    const response = await authApi.post("/users/refresh", {})
                    setAccessToken(response.data.accessToken)
                    error.config.headers.Authorization = `Bearer ${response.data.accessToken}`
                    return authApi.request(error.config)
                } catch (e) {
                    console.error("Refresj scaduto");

                }
            }

            return Promise.reject(error)
        }
    )



    const values = { accessToken, setAccessToken, authApi, setUserName, userName }

    return (
        <context.Provider value={values}>
            {children}
        </context.Provider>
    )
}

export const useAuthContext = () => useContext(context)