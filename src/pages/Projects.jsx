import { useEffect } from 'react';
import PreviewProject from '../components/PreviewProject';
import Spinner from '../components/Spinner';
import useProject from '../hooks/useProject';
import ModalImport from '../components/ModalImport';

const Projects = () => {
    const { getProjects, projects, loading, handleModalImport } = useProject();

    useEffect(() => {
        getProjects();
    }, [])


    return (
        loading ?
            <Spinner />
            :
            <>
                <div className="flex justify-between">
                    <h1 className="text-4xl font-black">Projects</h1>
                    <button
                        onClick={handleModalImport}
                        type="button"
                        className="flex gap-2 items-center justify-center text-sm px-5 py-1 mt-5 w-full md:w-auto rounded-lg uppercase font-bold bg-sky-500 text-white text-center hover:bg-sky-600 transition-colors"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" viewBox="0 0 24 24" strokeWidth="2" stroke="#fff" fill="none" strokeLinecap="round" strokeLinejoin="round">
                            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                            <path d="M14 3v4a1 1 0 0 0 1 1h4" />
                            <path d="M5 13v-8a2 2 0 0 1 2 -2h7l5 5v11a2 2 0 0 1 -2 2h-5.5m-9.5 -2h7m-3 -3l3 3l-3 3" />
                        </svg>
                        Import
                    </button>
                </div>

                <div className="bg-white shadow mt-10 rounded-lg">
                    {projects.length ?
                        projects.map(project => (
                            <PreviewProject
                                key={project._id}
                                project={project}
                            />
                        ))
                        :
                        <p className="text-center text-gray-600 font-bold uppercase p-5">There are no projects</p>
                    }
                </div>

                <ModalImport />
            </>
    )
}

export default Projects