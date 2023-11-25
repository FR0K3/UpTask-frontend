import { useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import useProject from "../hooks/useProject";
import Spinner from "../components/Spinner";
import useAdmin from "../hooks/useAdmin";
import { io } from "socket.io-client";
import ModalTask from '../components/ModalTask';
import ModalTemplate from "../components/ModalTemplate";
import Template from "../components/Template";

let socket;

const TaskTemplates = () => {
  const {
    getProject,
    project,
    loading,
    handleModalTemplate,
    submitProjectTask,
    deleteProjectTask,
    updateProjectTask,
    completeProjectTask,
  } = useProject();
  const { id } = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    getProject(id);
  }, []);

  useEffect(() => {
    socket = io(import.meta.env.VITE_API_URL);
    socket.emit("open project", id);
  }, []);

  useEffect(() => {
    socket.on("task added", (newTask) => {
      if (newTask.project === project._id) submitProjectTask(newTask);
      navigate(`/projects/${project._id}`)
    });

    socket.on("task deleted", (deletedTask) => {
      if (deletedTask.project === project._id) deleteProjectTask(deletedTask);
    });

    socket.on("task updated", (updatedTask) => {
      if (updatedTask.project._id === project._id)
        updateProjectTask(updatedTask);
    });

    socket.on("task completed", (completedTask) => {
      if (completedTask.project._id === project._id)
        completeProjectTask(completedTask);
    });
  });

  const handleAddTask = () => {
    console.log(project);
  };

  const handleBackButton = () =>{
    navigate(-1);
  }

  if (!project?._id && !loading)
    return (
      <p className="py-5 w-full text-2xl bg-red-600 text-center rounded-lg text-white font-bold">
        This project does not exist
      </p>
    );

  return (
    !loading ?  
    <div className="flex flex-col gap-4">
      <h1 className="text-black font-bold text-4xl">Task templates</h1>
      <div className="flex gap-4">
        <button onClick={handleBackButton} className="bg-slate-400 rounded-lg hover:bg-slate-500">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="44"
            height="44"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="#ffffff"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-6 w-9"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M5 12l14 0" />
            <path d="M5 12l6 6" />
            <path d="M5 12l6 -6" />
          </svg>
        </button>
        <button
          className="p-2 rounded-lg bg-sky-500 hover:bg-sky-600 font-bold text-white flex gap-2 items-center"
          onClick={handleModalTemplate}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="44"
            height="44"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="#ffffff"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="w-6 h-6"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M19 10h-14" />
            <path d="M5 6h14" />
            <path d="M14 14h-9" />
            <path d="M5 18h6" />
            <path d="M18 15v6" />
            <path d="M15 18h6" />
          </svg>
          Add Template
        </button>
      </div>
      <div className="bg-white w-full rounded-lg p-10 flex flex-row gap-5">
            {
                project.templates?.length ?  project.templates?.map((template)=>
                  (<Template key={template.id} template={template} />)
                ) : <p className="text-lg font-bold uppercase text-center">There are no templates in this project</p>
            }
      </div>
      <ModalTask />
      <ModalTemplate />
    </div> : <Spinner />
  );
};

export default TaskTemplates;
