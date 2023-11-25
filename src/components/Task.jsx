import { formatDate } from "../helpers/date";
import useAdmin from "../hooks/useAdmin";
import useProject from "../hooks/useProject";

const Task = ({ task }) => {
    const { handleModalETask, handleModalDel, completeTask, handleModalComment } = useProject();
    const { description, name, priority, deadline, _id, status, tag, comments } = task;
    const admin = useAdmin();
    const colors = {
        "QA": "bg-yellow-500",
        "Dev": "bg-pink-500",
        "Administrator": "bg-green-500",
        "UX/UI": "bg-sky-500",
    }

    return (
        <div className="border-b p-5 flex justify-between items-center">
            <div className="flex flex-col items-start">
                <p className="mb-2 text-xl font-bold flex items-center gap-4">{name} <span className={`${colors[tag]} text-white text-sm font-semibold uppercase px-3 rounded-lg`}>{tag}</span></p>
                <p className="mb-2 text-lg">{description}</p>
                <p className="mb-2 text-lg">Priority: {priority}</p>
                <p className="mb-2 text-lg text-gray-600">{formatDate(deadline)}</p>
                {status && (<p className="text-xs bg-green-600 uppercase rounded-lg text-white font-bold py-1 px-3">Completed by: {task.completed.name}</p>)}
            </div>

            <div className=" flex flex-col gap-16">

                <div className="flex flex-col lg:flex-row gap-2">
                    {admin && (
                        <button className="bg-indigo-600 px-4 py-3 text-sm text-white uppercase font-bold rounded-lg" onClick={() => handleModalETask(task)}>Edit</button>
                    )}

                    <button
                        className={`${status ? 'bg-sky-600' : 'bg-gray-600'}  px-4 py-3 text-sm text-white uppercase font-bold rounded-lg`}
                        onClick={() => completeTask(_id)}
                    >
                        {status ? 'Complete' : 'Incomplete'}
                    </button>

                    {admin && (
                        <button className="bg-red-600 px-4 py-3 text-sm text-white uppercase font-bold rounded-lg" onClick={() => handleModalDel(task)}>Delete</button>
                    )}
                </div>

                <div className="text-end p-2 mr-5 font-medium text-gray-400 hover:cursor-pointer" onClick={() => handleModalComment(task)}>
                    Ver comentarios
                </div>
            </div>

        </div>
    )
}

export default Task