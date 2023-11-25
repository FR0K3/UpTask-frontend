import { BrowserRouter, Routes, Route } from "react-router-dom"
import AuthLayout from "./layouts/AuthLayout"
import Login from "./pages/Login"
import Register from "./pages/Register"
import ForgetPassword from "./pages/ForgetPassword"
import NewPassword from "./pages/NewPassword"
import ConfirmAccount from "./pages/ConfirmAccount"
import { AuthProvider } from "./context/AuthProvider"
import { ProjectsProvider } from "./context/ProjectsProvider"
import ProtectedRoute from "./layouts/ProtectedRoute"
import Projects from "./pages/Projects"
import NewProject from "./pages/NewProject"
import Project from "./pages/Project"
import EditProject from "./pages/EditProject"
import NewCollaborator from "./pages/NewCollaborator"
import TaskTemplates from "./pages/TaskTemplates"

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <ProjectsProvider>

          <Routes>
            <Route path="/" element={<AuthLayout />}>
              <Route index element={<Login />} />
              <Route path="register" element={<Register />} />
              <Route path="forget-password" element={<ForgetPassword />} />
              <Route path="forget-password/:token" element={<NewPassword />} />
              <Route path="confirm/:id" element={<ConfirmAccount />} />
            </Route>


            <Route path="/projects" element={<ProtectedRoute />}>
              <Route index element={<Projects />} />
              <Route path="create-project" element={<NewProject />} />
              <Route path="new-collaborator/:id" element={<NewCollaborator />} />
              <Route path=":id" element={<Project />} />
              <Route path="edit/:id" element={<EditProject />} />
              <Route path=":id/task-templates" element={<TaskTemplates />} />
            </Route>
          </Routes>

        </ProjectsProvider>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App
