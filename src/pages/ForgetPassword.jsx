import { useState } from "react"
import { Link } from "react-router-dom"
import { toast } from "react-toastify";
import axiosClient from "../config/axiosClient";

const ForgetPassword = () => {
	const [email, setEmail] = useState('');

	const handleSubmit = async (e) => {
		e.preventDefault();
		// let regex = new RegExp("[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?");

		if (!email.match(/(?:[a-z0-9+!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/gi)) {
			toast.error("Invalid email");
			return;
		}

		try {
			const { data } = await axiosClient.post(`/users/forget-password`, {
				email
			});

			toast.info(data.msg, {
				theme: "colored",
				autoClose: false,
			});

		} catch (error) {
			toast.error(error.response.data.msg);
		}

		// toast.info("Sending email...");
	}

	return (
		<>
			<h1 className="text-sky-600 text-6xl font-black">Recupera tu acceso y no pierdas tus {" "}
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

				<input
					type="submit"
					value="Enviar"
					className="bg-sky-700 w-full py-3 mb-5 text-white uppercase font-bold rounded-lg hover:bg-sky-800 hover:cursor-pointer transition-colors"
				/>
			</form>

			<nav className="lg:flex lg:justify-between lg:flex-row-reverse">
				<Link
					to="/"
					className="block text-center my-5 text-slate-500 uppercase text-sm hover:font-bold"
				>
					¿Ya tienes una cuenta? Iniciar Sesión
				</Link>

				<Link
					to="register"
					className="block text-center my-5 text-slate-500 uppercase text-sm hover:font-bold"
				>
					¿No tienes una cuenta? Registrarse
				</Link>
			</nav>
		</>
	)
}

export default ForgetPassword