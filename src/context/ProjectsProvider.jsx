import { useState, useEffect, createContext } from "react";
import { toast } from "react-toastify";
import axiosClient from "../config/axiosClient";
import { useNavigate } from 'react-router-dom'
import FileSaver from "file-saver"
import { io } from "socket.io-client";

let socket;

const ProjectsContext = createContext();

const ProjectsProvider = ({ children }) => {
    const [projects, setProjects] = useState([]);
    const [project, setProject] = useState({});
    const [loading, setLoading] = useState(false);
    const [modalTask, setModalTask] = useState(false);
    const [modalDel, setModalDel] = useState(false);
    const [modalTemplate, setModalTemplate] = useState(false);
    const [template, setTemplate] = useState({});
    const [task, setTask] = useState({});
    const [collaborator, setCollaborator] = useState({});
    const [modalDelC, setModalDelC] = useState(false);
    const [search, setSearch] = useState(false);
    const [modalImport, setModalImport] = useState(false);
    const [projectImport, setProjectImport] = useState({});
    const navigate = useNavigate();
    const [modalComments, setModalComments] = useState(false);
    const [comments, setComments] = useState([])


    useEffect(() => {
        socket = io(import.meta.env.VITE_API_URL);
    }, [])

    const handleModalImport = () => {
        setModalImport(!modalImport);
    }

    const handleProjectImport = (prj) => {
        setProjectImport(prj);
    }

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

    const getComments = async (task) => {
        setComments(task.comments)

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

    const exportProject = () => {
        const token = localStorage.getItem("token");
        if (!token) return;

        const tasksCopy = project.tasks.map((t) => (
            {
                name: t.name,
                description: t.description,
                deadline: t.deadline,
                priority: t.priority
            }
        ));

        const projectToExport = {
            name: project.name,
            description: project.description,
            deadline: project.deadline,
            client: project.client,
            tasks: tasksCopy
        };

        const blob = new Blob([JSON.stringify(projectToExport)], { type: "application/json" });
        FileSaver.saveAs(blob, `${project.name.replace(/\s/g, "")}_UpTask.json`);
    }

    const importProject = async () => {
        try {
            const token = localStorage.getItem("token");
            if (!token) return;

            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }

            const projectToSave = {
                name: projectImport.name,
                client: projectImport.client,
                deadline: projectImport.deadline,
                description: projectImport.description
            }

            const { data } = await axiosClient.post('/projects', projectToSave, config);

            const tasksToSave = projectImport.tasks.map((t) => (
                {
                    name: t.name,
                    description: t.description,
                    deadline: t.deadline,
                    priority: t.priority,
                    project: data._id
                }
            ));

            tasksToSave.forEach(async (ts) => {
                await axiosClient.post('/tasks', ts, config)
            });

            setProjects([...projects, data]);

            toast.success("Project created successfully");
            handleModalImport();
            setProjectImport({});

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

            const { data } = await axiosClient.put(`/tasks/${task._id}`, task, config);

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

    const handleModalComment = task => {
        setTask(task)
        setModalComments(!modalComments);
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

    const handleModalTemplate = () => {
        setModalTemplate(!modalTemplate);
        setTemplate({});
    }

    const submitTemplate = async (template) => {
        await createTemplate(template);
    }

    const createTemplate = async template => {
        try {
            const token = localStorage.getItem("token");
            if (!token) return;

            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }

            const { data } = await axiosClient.post('/templates', template, config);

            setModalTemplate(false);

            // Socket io
            socket.emit('new template', data);
            toast.success("Template created successfully");

        } catch (error) {
            toast.error(error.response.data.msg);
        }
    }

    const deleteTemplate = async () => {
        try {
            const token = localStorage.getItem("token");
            if (!token) return;

            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }

            const { data } = await axiosClient.delete(`/templates/${task._id}`, config);

            setModalDel(false);
            setTask({});

            // Socket
            socket.emit('delete template', task);
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

    const completeProject = async (id) => {
        try {
            const token = localStorage.getItem("token");
            if (!token) return;

            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }

            const { data } = await axiosClient.post(`/projects/status/${id}`, {}, config);

            setProject(data);

        } catch (error) {
            console.error(error);
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
    const submitProjectTemplate = (newTemplate) => {
        const projectUpdated = { ...project };
        projectUpdated.templates = [...projectUpdated.templates, newTemplate];
        setProject(projectUpdated);
    }

    const deleteProjectTemplate = template => {
        const updatedProject = { ...project };
        updatedProject.templates = updatedProject.templates.filter(t => t._id !== template._id)
        setProject(updatedProject);
    }

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
                submitTemplate,
                submitProjectTemplate,
                handleModalTemplate,
                modalTemplate,
                setModalTemplate,
                template,
                setTemplate,
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
                logoutPrj,
                handleModalComment,
                modalComments,
                getComments,
                comments,
                exportProject,
                handleModalImport,
                modalImport,
                handleProjectImport,
                importProject,
                projectImport,
                completeProject,
                updateTask
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