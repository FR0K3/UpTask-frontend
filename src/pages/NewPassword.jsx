import { useState, useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { toast } from "react-toastify"
import axiosClient from "../config/axiosClient"

const NewPassword = () => {
    const [validToken, setValidToken] = useState(false);
    const [pass, setPass] = useState("");
    const { token } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        const verifyToken = async () => {
            try {
                await axiosClient.get(`/users/forget-password/${token}`);
                setValidToken(true);
            } catch (error) {
                toast.error(error.response.data.msg);
            }
        }
        verifyToken();
    }, []);

    const handleSubmit = async e => {
        e.preventDefault();

        if (pass === "") {
            toast.error("All fields are required");
            return;
        }

        try {
            const { data } = await axiosClient.post(`/users/forget-password/${token}`, { password: pass });

            setPass("");

            toast.success(`${data.msg}. You will be redirected to login`, {
                autoClose: 6000,
            });

            setTimeout(() => {
                return navigate("/");
            }, 6000);



        } catch (error) {
            toast.error(error.response.data.msg);
        }
    }


    return (
        <>
            <h1 className="text-sky-600 text-6xl font-black">Restablece tus contraseña y accede a tus {" "}
                <span className="text-slate-700">proyectos</span>
            </h1>

            {
                validToken && (
                    <form className="my-10 bg-white shadow rounded-lg p-10" onSubmit={handleSubmit}>

                        <div className="my-5">
                            <label
                                className="uppercase text-gray-600 block text-xl font-bold"
                                htmlFor="password"
                            >
                                Nueva Contraseña
                            </label>
                            <input
                                id="password"
                                className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
                                type="password"
                                placeholder="Escribe tu nuevo password"
                                value={pass}
                                onChange={e => setPass(e.target.value)}
                            />
                        </div>

                        <input
                            type="submit"
                            value="Guardar"
                            className="bg-sky-700 w-full py-3 mb-5 text-white uppercase font-bold rounded-lg hover:bg-sky-800 hover:cursor-pointer transition-colors"
                        />
                    </form>
                )
            }

        </>
    )
}

export default NewPassword