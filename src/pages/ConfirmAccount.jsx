import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import axiosClient from '../config/axiosClient'

const ConfirmAccount = () => {
    const { id } = useParams();
    const [confirmed, setConfirmed] = useState(false);

    useEffect(() => {
        const confirm = async () => {
            try {
                const { data } = await axiosClient.get(`/users/confirm/${id}`);
                toast.info(data.msg, {
                    theme: "colored",
                    autoClose: false,
                });
                setConfirmed(true);
            } catch (error) {
                toast.error(error.response.data.msg);
            }
        }

        confirm();
    }, []);

    return (
        <>
            <h1 className="text-sky-600 text-6xl font-black">Confirma tu cuenta y administra tus {" "}
                <span className="text-slate-700">proyectos</span>
            </h1>

            {confirmed && (
                <div className="mt-20 md:mt-5 shadow-lg px-5 py-10 rounded-xl bg-white">

                    <Link
                        to="/"
                        className="block text-center my-5 text-slate-500 uppercase text-sm font-bold"
                    >
                        Iniciar Sesión
                    </Link>
                </div>
            )}
        </>
    )
}

export default ConfirmAccount