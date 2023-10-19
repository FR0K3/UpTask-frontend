import useAuth from "./useAuth";
import useProject from "./useProject";

const useAdmin = () => {
    const { project } = useProject();
    const { auth } = useAuth();

    return project.creator === auth._id;
}

export default useAdmin;