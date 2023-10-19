import { useState } from "react"
import { Link } from "react-router-dom"
import { toast } from "react-toastify";
import axiosClient from "../config/axiosClient";

const Register = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmP, setConfirmP] = useState("");

    const handleSubmit = async e => {
        e.preventDefault();

        if ([name, email, password, confirmP].includes("")) {
            toast.error("All field are required");
            return;
        }

        if (password !== confirmP) {
            toast.error("Passwords do not match");
            return;
        }

        if (password.length < 6) {
            toast.error("Password must be at least 6 characters long");
            return;
        }

        try {
            const { data } = await axiosClient.post('/users', {
                name,
                email,
                password
            });

            toast.info(data.msg, {
                theme: "colored",
                autoClose: false,
            });

            setName("");
            setEmail("");
            setPassword("");
            setConfirmP("");

        } catch (error) {
            toast.error(error.response.data.msg);
        }

    }


    return (
        <>
            <h1 className="text-sky-600 text-6xl font-black">Crea tu cuenta y administra tus {" "}
                <span className="text-slate-700">proyectos</span>
            </h1>
            <form
                className="my-10 bg-white shadow rounded-lg p-10"
                onSubmit={handleSubmit}
            >
                <div className="my-5">
                    <label
                        className="uppercase text-gray-600 block text-xl font-bold"
                        htmlFor="name"
                    >
                        Nombre
                    </label>
                    <input
                        id="name"
                        className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
                        type="text"
                        placeholder="Nombre de registro"
                        value={name}
                        onChange={e => setName(e.target.value)}
                    />
                </div>
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
                        onChange={e => setEmail(e.target.value)}
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
                        onChange={e => setPassword(e.target.value)}
                    />
                </div>
                <div className="my-5">
                    <label
                        className="uppercase text-gray-600 block text-xl font-bold"
                        htmlFor="password2"
                    >
                        Confirmar password
                    </label>
                    <input
                        id="password2"
                        className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
                        type="password"
                        placeholder="Password de registro"
                        value={confirmP}
                        onChange={e => setConfirmP(e.target.value)}
                    />
                </div>

                <input
                    type="submit"
                    value="Registrarse"
                    className="bg-sky-700 w-full py-3 mb-5 text-white uppercase font-bold rounded-lg hover:bg-sky-800 hover:cursor-pointer transition-colors"
                />
            </form>

            <nav className="lg:flex lg:justify-between">
                <Link
                    to="/"
                    className="block text-center my-5 text-slate-500 uppercase text-sm hover:font-bold"
                >
                    ¿Ya tienes una cuenta? Iniciar Sesión
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

export default Register