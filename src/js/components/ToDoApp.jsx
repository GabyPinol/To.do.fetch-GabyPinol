import React, { useEffect, useState } from "react";

//create your first component

const ToDoApp = () => {
	const [inputValue, setInputValue] = useState("");
	const [list, setList] = useState([]);

	const loadTodos = async () => {
		const resp = await fetch("https://playground.4geeks.com/todo/users/Gaby", { method: "GET" })

		if (resp.status === 404) {
			// ejecutar func de crear usuario con fetch
			console.log("hay que crear el user")
		} else {
			const data = await resp.json()

			setList(data.todos);
		}

	}

	const createTodo = async () => {
		const resp = await fetch("https://playground.4geeks.com/todo/todos/Gaby", {
			method: "POST",
			headers: {
				"Content-Type":"application/json"
			},
			body: JSON.stringify({
				"label": inputValue,
				"is_done": false
			})
		})
		resp.status === 201 && loadTodos()
	}

	const deleteTodo = async (id) => {
		const resp = await fetch(`https://playground.4geeks.com/todo/todos/${id}`, {
			method: "DELETE"
		})
		resp.status === 204 && loadTodos()
	}

	useEffect(() => {
		loadTodos()
	}, [])

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
								createTodo()
								setInputValue("");
							}
						}
					}}
				/>

				<ul className="list-group list-group-flush">
					<ul className="list-group list-group-flush">
						{list.map((item, index) => (
							<li key={index} className="list-group-item d-flex justify-content-between align-items-center p-3 fs-5 task-item">
								{item.label}
								<i
									className="fas fa-times text-danger delete-icon"
									onClick={() => deleteTodo(item.id)}
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