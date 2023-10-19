import { useState, useEffect, createContext } from "react";
import { toast } from "react-toastify";
import axiosClient from "../config/axiosClient";
import { useNavigate } from 'react-router-dom'
import { io } from "socket.io-client";

let socket;

const ProjectsContext = createContext();

const ProjectsProvider = ({ children }) => {
    const [projects, setProjects] = useState([]);
    const [project, setProject] = useState({});
    const [loading, setLoading] = useState(false);
    const [modalTask, setModalTask] = useState(false);
    const [modalDel, setModalDel] = useState(false);
    const [task, setTask] = useState({});
    const [collaborator, setCollaborator] = useState({});
    const [modalDelC, setModalDelC] = useState(false);
    const [search, setSearch] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        socket = io(import.meta.env.VITE_API_URL);
    }, [])

    const getProjects = async () => {
        setLoading(true);

        try {
            const token = localStorage.getItem("token");
            if (!token) return;

            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }

            const { data } = await axiosClient('/projects', config);
            setProjects(data);

        } catch (error) {
            toast.error(error.response.data.msg);
        } finally {
            setLoading(false);
        }
    }

    const submitProject = async project => {
        if (project.id)
            await updateProject(project);
        else
            await newProject(project);
    }

    const updateProject = async (project) => {
        try {
            const token = localStorage.getItem("token");
            if (!token) return;

            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }

            const { data } = await axiosClient.put(`/projects/${project.id}`, project, config);

            const updatedProjects = projects.map(prj => prj._id === data._id ? data : prj);
            setProjects(updatedProjects);

            toast.success("Project updated successfully");

            navigate('/projects');

        } catch (error) {
            toast.error(error.response.data.msg);
        }
    }

    const newProject = async (project) => {
        try {
            const token = localStorage.getItem("token");
            if (!token) return;

            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }

            const { data } = await axiosClient.post('/projects', project, config);

            setProjects([...projects, data]);

            toast.success("Project created successfully");

            // setTimeout(() => {
            navigate('/projects');
            // }, 1000);

        } catch (error) {
            toast.error(error.response.data.msg);
        }
    }


    const getProject = async (id) => {
        setLoading(true);

        try {
            const token = localStorage.getItem("token");
            if (!token) return;

            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }

            const { data } = await axiosClient(`/projects/${id}`, config);

            setProject(data);
        } catch (error) {
            toast.error(error.response.data.msg);
        } finally {
            setLoading(false);
        }
    }

    const deleteProject = async (id) => {
        try {
            const token = localStorage.getItem("token");
            if (!token) return;

            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }

            const { data } = await axiosClient.delete(`/projects/${id}`, config);

            toast.success(data.msg);

            const updatedProjects = projects.filter(prj => prj._id !== id);
            setProjects(updatedProjects);

            navigate('/projects');
        } catch (error) {
            toast.error(error.response.data.msg);
        }
    }


    const handleModalTask = () => {
        setModalTask(!modalTask);
        setTask({});
    }

    const submitTask = async (task) => {
        if (task?.id)
            await updateTask(task);
        else
            await createTask(task);
    }

    const updateTask = async task => {
        try {

            const token = localStorage.getItem("token");
            if (!token) return;

            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }

            const { data } = await axiosClient.put(`/tasks/${task.id}`, task, config);

            setModalTask(false);

            // Socket
            socket.emit('update task', data);
            toast.success("Task updated successfully");
        } catch (error) {
            toast.error(error.response.data.msg);
        }
    }

    const createTask = async task => {
        try {
            const token = localStorage.getItem("token");
            if (!token) return;

            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }

            const { data } = await axiosClient.post('/tasks', task, config);


            setModalTask(false);

            // Socket io
            socket.emit('new task', data);
            toast.success("Task created successfully");

        } catch (error) {
            toast.error(error.response.data.msg);
        }
    }


    const handleModalETask = task => {
        setTask(task);
        setModalTask(true);
    }

    const handleModalDel = (task) => {
        setTask(task);
        setModalDel(!modalDel);
    }

    const deleteTask = async () => {
        try {
            const token = localStorage.getItem("token");
            if (!token) return;

            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }

            const { data } = await axiosClient.delete(`/tasks/${task._id}`, config);


            setModalDel(false);
            setTask({});

            // Socket
            socket.emit('delete task', task);
            toast.success(data.msg);

        } catch (error) {
            toast.error(error.response.data.msg);
        }
    }

    const submitCollaborator = async (email) => {
        setLoading(true);

        try {
            const token = localStorage.getItem("token");
            if (!token) return;

            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }

            const { data } = await axiosClient.post('/projects/collaborators', { email }, config);

            setCollaborator(data);

        } catch (error) {
            toast.error(error.response.data.msg);
        } finally {
            setLoading(false);
        }
    }

    const addCollaborator = async email => {
        try {
            const token = localStorage.getItem("token");
            if (!token) return;

            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }

            const { data } = await axiosClient.post(`/projects/collaborators/${project._id}`, email, config);

            toast.success(data.msg);

            setCollaborator({});

        } catch (error) {
            toast.error(error.response.data.msg);
        }
    }

    const handleModalDelC = (collaborator) => {
        setModalDelC(!modalDelC);
        setCollaborator(collaborator);
    }

    const deleteCollaborator = async () => {
        try {
            const token = localStorage.getItem("token");
            if (!token) return;

            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }

            const { data } = await axiosClient.post(`/projects/delete-collaborator/${project._id}`, { id: collaborator._id }, config);

            const projectUpdated = { ...project };

            projectUpdated.collaborators = projectUpdated.collaborators.filter(c => c._id !== collaborator._id);
            setProject(projectUpdated);

            toast.success(data.msg);

            setCollaborator({});
            setModalDelC(false);

        } catch (error) {
            toast.error(error.response.data.msg);
        }
    }

    const completeTask = async id => {
        try {
            const token = localStorage.getItem("token");
            if (!token) return;

            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }

            const { data } = await axiosClient.post(`/tasks/status/${id}`, {}, config);
            setTask({});

            // Socket
            socket.emit('complete task', data);

        } catch (error) {
            console.error(error.response);
        }
    }

    const handleSearch = () => {
        setSearch(!search);
    }


    // SOCKET IO
    const submitProjectTask = (newTask) => {
        const projectUpdated = { ...project };
        projectUpdated.tasks = [...projectUpdated.tasks, newTask];
        setProject(projectUpdated);
    }

    const deleteProjectTask = task => {
        const updatedProject = { ...project };
        updatedProject.tasks = updatedProject.tasks.filter(t => t._id !== task._id)
        setProject(updatedProject);
    }

    const updateProjectTask = task => {
        const updatedProject = { ...project };
        updatedProject.tasks = updatedProject.tasks.map(t => t._id === task._id ? task : t);
        setProject(updatedProject);
    }

    const completeProjectTask = task => {
        const updatedProject = { ...project };
        updatedProject.tasks = updatedProject.tasks.map(t => t._id === task._id ? task : t);
        setProject(updatedProject);
    }

    const logoutPrj = () => {
        setProjects([]);
        setProject({});

    }

    return (
        <ProjectsContext.Provider
            value={{
                getProjects,
                projects,
                submitProject,
                getProject,
                project,
                loading,
                deleteProject,
                handleModalTask,
                modalTask,
                submitTask,
                handleModalETask,
                task,
                modalDel,
                handleModalDel,
                deleteTask,
                submitCollaborator,
                collaborator,
                addCollaborator,
                handleModalDelC,
                modalDelC,
                deleteCollaborator,
                completeTask,
                search,
                handleSearch,
                submitProjectTask,
                deleteProjectTask,
                updateProjectTask,
                completeProjectTask,
                logoutPrj
            }}
        >
            {children}
        </ProjectsContext.Provider>
    )
}

export {
    ProjectsProvider
}

export default ProjectsContext;