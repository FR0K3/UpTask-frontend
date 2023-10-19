import { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import useProject from '../hooks/useProject'
import Spinner from '../components/Spinner';
import Task from '../components/Task';
import ModalTask from '../components/ModalTask';
import ModalDelTask from '../components/ModalDelTask';
import Collaborator from '../components/Collaborator';
import ModalDelC from '../components/ModalDelC';
import useAdmin from '../hooks/useAdmin';
import { io } from 'socket.io-client';

let socket;

const Project = () => {
    const { getProject, project, loading, handleModalTask, submitProjectTask, deleteProjectTask, updateProjectTask, completeProjectTask } = useProject()
    const { id } = useParams();
    const { name } = project;
    const admin = useAdmin();

    useEffect(() => {
        getProject(id);
    }, []);

    useEffect(() => {
        socket = io(import.meta.env.VITE_API_URL);
        socket.emit('open project', id);
    }, [])

    useEffect(() => {
        socket.on('task added', newTask => {
            if (newTask.project === project._id)
                submitProjectTask(newTask);
        });

        socket.on('task deleted', deletedTask => {
            if (deletedTask.project === project._id)
                deleteProjectTask(deletedTask);
        });

        socket.on('task updated', updatedTask => {
            if (updatedTask.project._id === project._id)
                updateProjectTask(updatedTask);
        });

        socket.on('task completed', completedTask => {
            if (completedTask.project._id === project._id)
                completeProjectTask(completedTask);
        });
    })


    if (!project?._id && !loading) return <p className="py-5 w-full text-2xl bg-red-600 text-center rounded-lg text-white font-bold">This project does not exist</p>

    return (
        loading ?
            <Spinner />
            :
            <>

                <div className="flex items-center gap-4">
                    <h1 className="text-4xl font-black">{name}</h1>

                    {admin && (
                        <Link
                            to={`/projects/edit/${id}`}
                            className="text-gray-600 hover:text-gray-900 transition-colors"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                            </svg>

                        </Link>
                    )}
                </div>

                {admin && (
                    <button
                        onClick={handleModalTask}
                        type="button"
                        className="flex gap-2 items-center justify-center text-sm px-5 py-3 mt-5 w-full md:w-auto rounded-lg uppercase font-bold bg-sky-400 text-white text-center hover:bg-sky-600 transition-colors"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                            <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zM12.75 9a.75.75 0 00-1.5 0v2.25H9a.75.75 0 000 1.5h2.25V15a.75.75 0 001.5 0v-2.25H15a.75.75 0 000-1.5h-2.25V9z" clipRule="evenodd" />
                        </svg>

                        New Task
                    </button>
                )}

                <p className="font-bold text-xl mt-10">Project tasks</p>

                <div className="bg-white shadow mt-10 rounded-lg">
                    {project.tasks?.length ?
                        project.tasks?.map((task) => (
                            <Task
                                key={task._id}
                                task={task}
                            />
                        )) :
                        <p className="text-center mt-5 p-10 uppercase text-gray-700 font-bold">
                            There are no tasks in this project
                        </p>
                    }
                </div>

                {admin && (
                    <>
                        <div className="flex items-center justify-between mt-10">
                            <p className="font-bold text-xl mt-10">Collaborators</p>
                            <Link
                                className="text-gray-400 hover:text-gray-500 uppercase font-bold"
                                to={`/projects/new-collaborator/${project._id}`}
                            >
                                Add collaborator
                            </Link>
                        </div>


                        <div className="bg-white shadow mt-10 rounded-lg">
                            {project.collaborators?.length ?
                                project.collaborators?.map(collab => (
                                    <Collaborator
                                        key={collab._id}
                                        collaborator={collab}
                                    />
                                )) :
                                <p className="text-center mt-5 p-10 uppercase text-gray-700 font-bold">
                                    There are no collaborators in this project
                                </p>
                            }
                        </div>
                    </>
                )}


                <ModalTask />
                <ModalDelTask />
                <ModalDelC />
            </>

    )
}

export default Project