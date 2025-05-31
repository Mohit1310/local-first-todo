"use client";
import { db } from "@/lib/db";
import type { TodoType } from "@/types/todo";
import { Pin } from "lucide-react";
import { useEffect, useState } from "react";
import Todo from "./todo";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

const TodoList = () => {
	const [input, setInput] = useState<string>("");
	let [todoList, setTodoList] = useState<TodoType[]>([]);

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const newTodo = await db.todos.add({
			text: input,
			completed: false,
			isPinned: false,
		});
		// @ts-expect-error: unable to figure out proper type
		setTodoList((prev) => [...prev, newTodo]);
		setInput("");
		getAllTodos();
	};

	const getAllTodos = async () => {
		todoList = await db.todos.toArray();
		setTodoList(todoList);
	};

	useEffect(() => {
		getAllTodos();
	});

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
			<>
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
				{unpinnedTodos.length > 0 ? (
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
				) : null}
			</>
		</div>
	);
};

export default TodoList;
