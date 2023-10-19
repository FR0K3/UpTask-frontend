import useProject from "../hooks/useProject";

const Collaborator = ({ collaborator }) => {
    const { handleModalDelC } = useProject();
    const { email, name } = collaborator;

    return (
        <div className="border-b p-5 flex justify-between items-center">
            <div>
                <p className="text-xl font-bold">{name}</p>
                <p className="text-gray-700">{email}</p>
            </div>
            <div>
                <button
                    type="button"
                    className="bg-red-600 px-4 py-3 text-white font-bold uppercase rounded-lg"
                    onClick={() => handleModalDelC(collaborator)}
                >
                    Delete
                </button>
            </div>
        </div>
    )
}

export default Collaborator