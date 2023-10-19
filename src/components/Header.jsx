import { Link } from "react-router-dom"
import useAuth from "../hooks/useAuth";
import useProject from "../hooks/useProject"
import Search from "./Search";

const Header = () => {
    const { handleSearch, logoutPrj } = useProject();
    const { logout } = useAuth();

    const handleLogout = () => {
        logout();
        logoutPrj();
        localStorage.removeItem("token");
    }

    return (
        <header className="px-4 py-5 bg-white border-b">
            <div className="md:flex md:justify-between">
                <h2 className="text-4xl text-sky-600 font-black text-center mb-5 md:mb-0">UpTask</h2>

                <div className="flex flex-col md:flex-row items-center gap-4">
                    <button
                        type="button"
                        className="font-bold uppercase"
                        onClick={handleSearch}
                    >
                        Search Project
                    </button>


                    <Link
                        to="/projects"
                        className="font-bold uppercase"
                    >
                        Projects
                    </Link>

                    <button
                        className="text-white text-sm bg-sky-600 p-3 rounded-md uppercase font-bold"
                        type="button"
                        onClick={handleLogout}
                    >
                        Cerrar sesión
                    </button>

                    <Search />
                </div>
            </div>
        </header>
    )
}

export default Header