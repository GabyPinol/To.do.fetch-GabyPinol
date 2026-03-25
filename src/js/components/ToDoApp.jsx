import React, { useState } from "react";

//create your first component

const ToDoApp = () => {
	const [inputValue, setInputValue] = useState("");
	const [list, setList] = useState([]);

	return (
		<div className="container mt-5">
			<h1 className="text-center display-1">ToDo's</h1>
			<div className="todo-container shadow-lg">
				<input
					type="text"
					className="form-control border-0 p-3 fs-4"
					placeholder="Qué hacemos hoy?"
					value={inputValue}
					onChange={(e) => setInputValue(e.target.value)}
					onKeyDown={(e) => {
						if (e.key === "Enter") {
							if (inputValue.trim() !== "") {
								setList([...list, inputValue]);
								setInputValue("");
							}
						}
					}}
				/>

				<ul className="list-group list-group-flush">
					<ul className="list-group list-group-flush">
						{list.map((item, index) => (
							<li key={index} className="list-group-item d-flex justify-content-between align-items-center p-3 fs-5 task-item">
								{item}
								<i
									className="fas fa-times text-danger delete-icon"
									onClick={() => setList(list.filter((t, i) => i !== index))}
								></i>
							</li>
						))}

						<li className="list-group-item text-secondary p-2" style={{ fontSize: "12px" }}>
							{list.length} {list.length === 1 ? "tarea pendiente" : "tareas pendientes"} 
						</li>
					</ul>
				</ul>
			</div>
		</div>
	);
};

export default ToDoApp;