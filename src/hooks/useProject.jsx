import { useContext } from "react";
import ProjectContext from "../context/ProjectsProvider";

const useAuth = () => {
    return useContext(ProjectContext);
}

export default useAuth;