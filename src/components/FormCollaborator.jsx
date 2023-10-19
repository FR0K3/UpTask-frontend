import { useState } from "react"
import { toast } from "react-toastify";
import useProject from "../hooks/useProject";

const FormCollaborator = () => {
    const [email, setEmail] = useState("");
    const { submitCollaborator, collaborator } = useProject();

    const handleSubmit = e => {
        e.preventDefault();

        if (email === "") {
            toast.error("Email is required");
            return;
        }

        submitCollaborator(email);
    }

    return (
        <form className="bg-white py-10 px-5 w-full md:w-1/2 rounded-lg shadow" onSubmit={handleSubmit}>
            <div className="mb-5">
                <label htmlFor="email" className="text-gray-700 font-bold uppercase text-sm">Collaborator Email:</label>
                <input
                    type="email"
                    id="email"
                    placeholder="User email"
                    className="border w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                />
            </div>

            <input
                type="submit"
                className="bg-sky-600 hover:bg-sky-700 text-white font-bold uppercase w-full rounded cursor-pointer mt-3 p-3 text-sm transition-colors"
                value="Search collaborator"
            // onClick={() => submitCollaborator({ email: collaborator.email })}
            />
        </form>
    )
}

export default FormCollaborator