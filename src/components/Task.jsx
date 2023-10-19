import { formatDate } from "../helpers/date";
import useAdmin from "../hooks/useAdmin";
import useProject from "../hooks/useProject";

const Task = ({ task }) => {

    const { handleModalETask, handleModalDel, completeTask } = useProject();
    const { description, name, priority, deadline, _id, status } = task;
    const admin = useAdmin();

    return (
        <div className="border-b p-5 flex justify-between items-center">
            <div className="flex flex-col items-start">
                <p className="mb-2 text-xl font-bold">{name}</p>
                <p className="mb-2 text-lg">{description}</p>
                <p className="mb-2 text-lg">Priority: {priority}</p>
                <p className="mb-2 text-lg text-gray-600">{formatDate(deadline)}</p>
                {status && (<p className="text-xs bg-green-600 uppercase rounded-lg text-white font-bold py-1 px-3">Completed by: {task.completed.name}</p>)}
            </div>
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

        </div>
    )
}

export default Task