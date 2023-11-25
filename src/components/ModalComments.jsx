import { Fragment } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import useProject from '../hooks/useProject'
import { useEffect, useState } from 'react'
import useAuth from "../hooks/useAuth"




const ModalComments = () => {
    const { auth } = useAuth();
    const { modalComments, handleModalComment, task, updateTask } = useProject();
    const [commentText, setCommentText] = useState('');
    const [comments, setComments] = useState([])



    const handleChange = (e) => {
        setCommentText(e.target.value);
    };


    const handleSendClick = () => {
        const commentList = ([...task.comments, { 'user': auth.name, 'comment': commentText }])

        task.comments = commentList
        updateTask(task)
        setCommentText('')
    };

    const emptyComments = () => {
        setComments([])
    }



    return (
        <Transition.Root show={modalComments} as={Fragment}>
            <Dialog as="div" className="fixed z-10 inset-0 overflow-y-auto" onClose={handleModalComment}>
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
                        <div className="inline-block align-bottom bg-white rounded-lg px-4 p-3 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">


                            <div className="hidden sm:block absolute top-0 right-0 pt-4 pr-4">
                                <button
                                    type="button"
                                    className="bg-white rounded-md text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                    onClick={handleModalComment}
                                >
                                    <span className="sr-only">Cerrar</span>
                                    <svg onClick={() => { emptyComments() }} xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                                    </svg>
                                </button>
                            </div>


                            <div className="sm:flex sm:items-start">


                                <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">


                                    <Dialog.Title as="h3" className="text-lg leading-6 font-bold text-gray-900">
                                        Comments
                                    </Dialog.Title>

                                    <div className="mt-5 sm:mt-4 sm:flex flex-col" >
                                        <div className='h-[20rem] flex flex-col gap-2 overflow-auto p-5'>
                                            {
                                                task.comments?.map((comment, index) => (

                                                    <div key={index} className='p-2 border-2 border-sky-400 rounded-md ' >
                                                        <p className='font-semibold'>{comment.user}</p>
                                                        <p>{comment.comment}</p>
                                                    </div>
                                                ))
                                            }
                                        </div>
                                        <div className='mt-5 flex justify-center items-center'>


                                            <input className="bg-slate-300 w-[20rem] p-2  rounded-xl"
                                                id='comment'
                                                type="text"
                                                placeholder='comment'
                                                onChange={handleChange}
                                                value={commentText}
                                            />

                                            <button onClick={handleSendClick} disabled={!commentText} >

                                                <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#2c3e50" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                                    <path d="M10 14l11 -11" />
                                                    <path d="M21 3l-6.5 18a.55 .55 0 0 1 -1 0l-3.5 -7l-7 -3.5a.55 .55 0 0 1 0 -1l18 -6.5" />
                                                </svg>
                                            </button>



                                        </div>
                                    </div>



                                </div>
                            </div>

                        </div>
                    </Transition.Child>
                </div>
            </Dialog >
        </Transition.Root >
    )
}

export default ModalComments