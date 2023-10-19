import { useState, useEffect } from "react"
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import useProject from "../hooks/useProject";

const Form = () => {
    const [id, setId] = useState(null);
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [deadline, setDeadline] = useState("");
    const [client, setClient] = useState("");
    const { submitProject, project } = useProject();
    const params = useParams();

    useEffect(() => {
        if (params.id) {
            setId(project._id);
            setName(project.name);
            setDescription(project.description);
            setDeadline(project.deadline?.split("T")[0]);
            setClient(project.client);
        }
    }, [params])


    const handleSubmit = async (e) => {
        e.preventDefault();

        if ([name, description, deadline, client].includes("")) {
            toast.error("All fields are required");
            return;
        }

        await submitProject({ id, name, description, deadline, client });
        setId(null);
        setName("");
        setDescription("");
        setDeadline("");
        setClient("");
    }

    return (
        <form className="bg-white py-10 px-5 md:w-1/2 rounded-lg shadow" onSubmit={handleSubmit}>
            <div className="mb-5">
                <label
                    className="text-gray-700 uppercase font-bold text-sm"
                    htmlFor="name"
                >
                    Name Project
                </label>

                <input
                    id="name"
                    type="text"
                    className="border w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                    placeholder="Project's name"
                    value={name}
                    onChange={e => setName(e.target.value)}
                />
            </div>

            <div className="mb-5">
                <label
                    className="text-gray-700 uppercase font-bold text-sm"
                    htmlFor="description"
                >
                    Description Project
                </label>

                <textarea
                    id="description"
                    className="border w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                    placeholder="Project's description..."
                    value={description}
                    onChange={e => setDescription(e.target.value)}
                />
            </div>

            <div className="mb-5">
                <label
                    className="text-gray-700 uppercase font-bold text-sm"
                    htmlFor="deadline"
                >
                    Deadline Project
                </label>

                <input
                    id="deadline"
                    type="date"
                    className="border w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                    value={deadline}
                    onChange={e => setDeadline(e.target.value)}
                />
            </div>

            <div className="mb-5">
                <label
                    className="text-gray-700 uppercase font-bold text-sm"
                    htmlFor="client"
                >
                    Client Project
                </label>

                <input
                    id="client"
                    type="text"
                    className="border w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                    placeholder="Project's client"
                    value={client}
                    onChange={e => setClient(e.target.value)}
                />
            </div>

            <input
                type="submit"
                value={id ? "Update project" : "Create new project"}
                className="bg-sky-600 w-full p-3 uppercase text-white font-bold rounded hover:cursor-pointer hover:bg-sky-700 transition-colors"
            />
        </form>
    )
}

export default Form