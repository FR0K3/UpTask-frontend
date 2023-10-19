import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { toast } from "react-toastify";
import axiosClient from "../config/axiosClient"
import useAuth from "../hooks/useAuth";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { setAuth, auth } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (auth._id)
            navigate('/projects');
    }, [auth])


    const handleSubmit = async (e) => {
        e.preventDefault();

        if ([email, password].includes('')) {
            toast.error("All fields are required");
            return;
        }

        try {
            const { data } = await axiosClient.post("/users/login", {
                email,
                password
            });

            localStorage.setItem("token", data.token);
            setAuth(data);

        } catch (error) {
            toast.error(error.response.data.msg);
        }
    }


    return (
        <>
            <h1 className="text-sky-600 text-6xl font-black">Inicia Sesión y administra tus {" "}
                <span className="text-slate-700">proyectos</span>
            </h1>
            <form className="my-10 bg-white shadow rounded-lg p-10" onSubmit={handleSubmit}>
                <div className="my-5">
                    <label
                        className="uppercase text-gray-600 block text-xl font-bold"
                        htmlFor="email"
                    >
                        Email
                    </label>
                    <input
                        id="email"
                        className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
                        type="email"
                        placeholder="Email de registro"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div className="my-5">
                    <label
                        className="uppercase text-gray-600 block text-xl font-bold"
                        htmlFor="password"
                    >
                        Password
                    </label>
                    <input
                        id="password"
                        className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
                        type="password"
                        placeholder="Password de registro"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>

                <input
                    type="submit"
                    value="Login"
                    className="bg-sky-700 w-full py-3 mb-5 text-white uppercase font-bold rounded-lg hover:bg-sky-800 hover:cursor-pointer transition-colors"
                />
            </form>

            <nav className="lg:flex lg:justify-between">
                <Link
                    to="register"
                    className="block text-center my-5 text-slate-500 uppercase text-sm hover:font-bold"
                >
                    ¿No tienes una cuenta? Registrarse
                </Link>

                <Link
                    to="forget-password"
                    className="block text-center my-5 text-slate-500 uppercase text-sm hover:font-bold"
                >
                    Olvidé mi contraseña
                </Link>
            </nav>
        </>
    )
}

export default Login