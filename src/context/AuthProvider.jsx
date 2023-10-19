import { useState, useEffect, createContext } from 'react'
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import axiosClient from '../config/axiosClient'


const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState({});
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    // Verifying if user is already authenticated
    useEffect(() => {
        const authenticateUser = async () => {
            const token = localStorage.getItem("token");

            if (!token) {
                setLoading(false);
                return;
            }

            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }

            try {
                const { data } = await axiosClient("/users/profile", config);
                setAuth(data);
            } catch (error) {
                toast.error(error.response.data.msg);
            } finally {
                setLoading(false);
            }

        }

        authenticateUser();

    }, [])

    const logout = () => {
        setAuth({});
    }

    return (
        <AuthContext.Provider
            value={{
                auth,
                setAuth,
                loading,
                logout
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}

export {
    AuthProvider
}

export default AuthContext;