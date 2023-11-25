import { formatDate } from "../helpers/date";
import useAdmin from "../hooks/useAdmin";
import useProject from "../hooks/useProject";

const Template = ({ template }) => {
  const { handleModalETask, setLoading } = useProject();
  const { description, name, taskName, priority, deadline } = template;
  const admin = useAdmin();
  const loadTemplate = () => {
    const task = {
      name: template.taskName,
      description: template.description,
      deadline: template.deadline,
      priority: template.priority,
    };
    handleModalETask(task);
  };
  return (
    <div
      onClick={loadTemplate}
      className="flex justify-between items-center border rounded-lg p-10 cursor-pointer"
    >
      <div className="flex flex-col items-center w-60">
        <p className="mb-2 text-xl font-bold">{name}</p>
        <p className="mb-2 text-xl font-semibold">{taskName}</p>
        <p className="mb-2 text-lg">{description}</p>
        <p className="mb-2 text-lg">Priority: {priority}</p>
        <p className="mb-2 text-lg text-gray-600">{deadline.substring(0,10)}</p>
      </div>
    </div>
  );
};

export default Template;
