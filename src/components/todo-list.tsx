"use client";
import type { TodoType } from "@/types/todo";
import { Pin } from "lucide-react";
import { useState } from "react";
import Todo from "./todo";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

const TodoList = () => {
	const [input, setInput] = useState<string>("");
	const [todoList, setTodoList] = useState<TodoType[]>([]);

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const newTodo: TodoType = {
			id: todoList.length + 1,
			text: input,
			completed: false,
			isPinned: false,
		};
		setTodoList((prev) => [...prev, newTodo]);
		setInput("");
	};

	const pinnedTodos = todoList.filter((t) => t.isPinned);
	const unpinnedTodos = todoList.filter((t) => !t.isPinned);

	return (
		<div className="flex flex-col gap-4">
			<form className="flex items-center gap-2" onSubmit={handleSubmit}>
				<Input
					placeholder="add items"
					value={input}
					onChange={(e) => setInput(e.target.value)}
				/>
				<Button type="submit">Save</Button>
			</form>
			{pinnedTodos.length > 0 ? (
				<div className="flex flex-col gap-3">
					<div className="flex gap-2 items-center">
						<Pin className="size-3" />
						<span className="text-xs">Pinned</span>
					</div>
					{pinnedTodos.map((t) => (
						<Todo
							key={t.id}
							t={t}
							todoList={todoList}
							setTodoList={setTodoList}
						/>
					))}
				</div>
			) : null}
			<div className="flex flex-col gap-3">
				<span className="text-xs">Recent</span>
				{unpinnedTodos.map((t) => (
					<Todo
						key={t.id}
						t={t}
						todoList={todoList}
						setTodoList={setTodoList}
					/>
				))}
			</div>
		</div>
	);
};

export default TodoList;
