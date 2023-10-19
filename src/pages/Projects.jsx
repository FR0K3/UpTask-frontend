import { useEffect } from 'react';
import PreviewProject from '../components/PreviewProject';
import Spinner from '../components/Spinner';
import useProject from '../hooks/useProject';

const Projects = () => {
    const { getProjects, projects, loading } = useProject();

    useEffect(() => {
        getProjects();
    }, [])


    return (
        loading ?
            <Spinner />
            :
            <>
                <h1 className="text-4xl font-black">Projects</h1>

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
            </>
    )
}

export default Projects