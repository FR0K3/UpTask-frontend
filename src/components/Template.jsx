import useProject from "../hooks/useProject";

const Template = ({ template }) => {
  const { handleModalETask, setLoading } = useProject();
  const { description, name, taskName, priority, deadline, tag } = template;
  const colors = {
    "QA": "bg-yellow-500",
    "Dev": "bg-pink-500",
    "Administrator": "bg-green-500",
    "UX/UI": "bg-sky-500",
  }

  const loadTemplate = () => {
    const task = {
      name: taskName,
      description: description,
      deadline: deadline,
      priority: priority,
      tag: tag
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
        <span className={`${colors[tag]} text-white text-sm font-semibold uppercase px-3 rounded-lg`}>{tag}</span>
      </div>
    </div>
  );
};

export default Template;
