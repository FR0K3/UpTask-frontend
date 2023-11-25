
const TaskDropDownItem = ({ onClick, text, children }) => {
	return (
		<div className="flex flex-row-reverse items-center mt-2 justify-end gap-2">
			<button
				onClick={onClick}
				type="button"
				className=" text-sm py-1 px-2 md:w-auto rounded-lg font-bold bg-sky-400 text-white text-center hover:bg-sky-600 transition-colors"
			>
				{text}
			</button>
			{children}
		</div>
	)
}

export default TaskDropDownItem;