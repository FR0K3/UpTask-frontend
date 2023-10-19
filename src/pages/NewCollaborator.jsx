
import { useEffect } from "react"
import { useParams } from "react-router-dom"
import FormCollaborator from "../components/FormCollaborator"
import Spinner from "../components/Spinner"
import useProject from "../hooks/useProject"

const NewCollaborator = () => {
    const { getProject, project, loading, collaborator, addCollaborator } = useProject();
    const params = useParams();

    useEffect(() => {
        getProject(params.id);
    }, [])


    if (!project?._id) return <p className="py-5 w-full text-2xl bg-red-600 text-center rounded-lg text-white font-bold">This project does not exist</p>

    return (

        <>
            <h1 className="text-4xl font-black">Add New Collaborator to {project.name}</h1>
            <div className="mt-10 flex justify-center">
                <FormCollaborator />
            </div>

            {loading ? <Spinner />
                :
                collaborator._id && (
                    <div className="flex justify-center mt-10">
                        <div className="bg-white py-10 px-5 md:w-1/2 rounded-lg shadow w-full">
                            <h2 className="text-center mb-10 text-2xl font-bold">Resultado:</h2>

                            <div className="flex justify-between items-center">
                                <p>{collaborator.name}</p>
                                <button
                                    type="button"
                                    className="bg-slate-500 py-2 px-5 rounded-lg uppercase text-white font-bold hover:bg-slate-600"
                                    onClick={() => addCollaborator({ email: collaborator.email })}
                                >Add to project</button>
                            </div>
                        </div>
                    </div>
                )}

        </>
    )
}

export default NewCollaborator