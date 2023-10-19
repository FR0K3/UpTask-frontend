import { Outlet, Navigate } from "react-router-dom"
import { ToastContainer } from "react-toastify";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import useAuth from "../hooks/useAuth"

const ProtectedRoute = () => {
    const { auth, loading } = useAuth();

    if (loading) return "Loading.."

    return (
        <>
            {auth._id ? (
                <div className="bg-gray-100">
                    <Header />

                    <div className="md:flex lg:min-h-screen">
                        <Sidebar />

                        <main className="flex-1 p-10">
                            <Outlet />
                        </main>
                    </div>
                    <ToastContainer />
                </div>
            ) : <Navigate to="/" />}
        </>
    )
}

export default ProtectedRoute