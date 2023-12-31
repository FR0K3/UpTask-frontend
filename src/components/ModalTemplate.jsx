import { Fragment, useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import { Dialog, Transition } from '@headlessui/react'
import useProyecto from '../hooks/useProject'
import { toast } from 'react-toastify';

const PRIORITY = ["Low", "Medium", "High"];

const ModalTemplate = () => {

    const [id, setId] = useState("");
    const [name, setName] = useState("");
    const [taskName, setTaskName] = useState("");
    const [description, setDescription] = useState("");
    const [priority, setPriority] = useState("");
    const [deadline, setDeadline] = useState("");
    const [tag, setTag] = useState("");
    const { modalTemplate, handleModalTemplate, submitProjectTemplate, submitTemplate, template } = useProyecto();
    const params = useParams();

    useEffect(() => {
        setId("");
        setTaskName("");
        setName("");
        setDescription("");
        setDeadline("");
        setPriority("");
        setTag("");
    }, [template])

    const handleSubmit = e => {
        e.preventDefault();

        if ([name, taskName, description, deadline, priority, tag].includes("")) {
            toast.error("All fields are required");
            return;
        }

        submitProjectTemplate({ id, name, taskName, description, deadline, priority, project: params.id, tag });
        submitTemplate({ id, name, taskName, description, deadline, priority, project: params.id, tag })
        setName("");
        setTaskName("")
        setDescription("");
        setDeadline("");
        setPriority("");
    }

    return (
        <Transition.Root show={modalTemplate} as={Fragment}>
            <Dialog as="div" className="fixed z-10 inset-0 overflow-y-auto" onClose={handleModalTemplate}>
                <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <Dialog.Overlay
                            className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
                        />
                    </Transition.Child>

                    {/* This element is to trick the browser into centering the modal contents. */}
                    <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
                        &#8203;
                    </span>

                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                        enterTo="opacity-100 translate-y-0 sm:scale-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                        leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                    >
                        <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">


                            <div className="hidden sm:block absolute top-0 right-0 pt-4 pr-4">
                                <button
                                    type="button"
                                    className="bg-white rounded-md text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                    onClick={handleModalTemplate}
                                >
                                    <span className="sr-only">Cerrar</span>
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                                    </svg>
                                </button>
                            </div>


                            <div className="sm:flex sm:items-start">
                                <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
                                    <Dialog.Title as="h3" className="text-lg leading-6 font-bold text-gray-900">
                                        {id ? 'Save changes' : 'Create New Task'}
                                    </Dialog.Title>

                                    <form className="my-10" onSubmit={handleSubmit}>
                                        <div className="mb-5">
                                            <label htmlFor="template-name" className="text-gray-700 font-bold uppercase text-sm">Template name:</label>
                                            <input
                                                type="text"
                                                id="name"
                                                placeholder="Task name"
                                                className="border w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                                                value={name}
                                                onChange={e => setName(e.target.value)}
                                            />
                                        </div>
                                        <div className="mb-5">
                                            <label htmlFor="name" className="text-gray-700 font-bold uppercase text-sm">Task name:</label>
                                            <input
                                                type="text"
                                                id="name"
                                                placeholder="Task name"
                                                className="border w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                                                value={taskName}
                                                onChange={e => setTaskName(e.target.value)}
                                            />
                                        </div>

                                        <div className="mb-5">
                                            <label htmlFor="description" className="text-gray-700 font-bold uppercase text-sm">Description:</label>
                                            <textarea
                                                id="description"
                                                placeholder="Task description..."
                                                className="border w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                                                value={description}
                                                onChange={e => setDescription(e.target.value)}
                                            />
                                        </div>

                                        <div className="mb-5">
                                            <label htmlFor="deadline" className="text-gray-700 font-bold uppercase text-sm">Deadline:</label>
                                            <input
                                                type="date"
                                                id="deadline"
                                                className="border w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                                                value={deadline}
                                                onChange={e => setDeadline(e.target.value)}
                                            />
                                        </div>

                                        <div className="mb-5">
                                            <label htmlFor="priority" className="text-gray-700 font-bold uppercase text-sm">Priority:</label>
                                            <select
                                                id="priority"
                                                className="border w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                                                value={priority}
                                                onChange={e => setPriority(e.target.value)}
                                            >
                                                <option value="">-- Select the priority --</option>
                                                {
                                                    PRIORITY.map(option => (
                                                        <option key={option}>{option}</option>
                                                    ))

                                                }
                                            </select>
                                        </div>
                                        <div className="mb-5">
                                            <label htmlFor="tag" className="text-gray-700 font-bold uppercase text-sm">Tag:</label>
                                            <select
                                                id="tag"
                                                className="border w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                                                value={tag}
                                                onChange={e => setTag(e.target.value)}
                                            >
                                                <option value="" disabled>-- Select the priority --</option>
                                                <option value="Dev">Dev</option>
                                                <option value="QA">QA</option>
                                                <option value="Administrator">Administrator</option>
                                                <option value="UX/UI">UX/UI</option>
                                            </select>
                                        </div>
                                        <input
                                            type="submit"
                                            className="bg-sky-600 hover:bg-sky-700 text-white font-bold uppercase w-full rounded cursor-pointer mt-3 p-3 text-sm transition-colors"
                                            value={id ? 'Save changes' : 'Create New Task'}
                                        />


                                    </form>
                                </div>
                            </div>
                        </div>
                    </Transition.Child>
                </div>
            </Dialog>
        </Transition.Root>
    )
}

export default ModalTemplate;