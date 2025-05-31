"use client";
import { db } from "@/lib/db";
import { cn } from "@/lib/utils";
import type { TodoType } from "@/types/todo";
import { Pin, X } from "lucide-react";
import { useEffect, useState } from "react";
import { Input } from "./ui/input";

const Todo = ({
	t,
	todoList,
	setTodoList,
}: {
	t: TodoType;
	todoList: TodoType[];
	setTodoList: React.Dispatch<React.SetStateAction<TodoType[]>>;
}) => {
	const [input, setInput] = useState<string>(t.text);

	const updateTodo = async (
		id: number,
		updates: Partial<Pick<TodoType, "text" | "isPinned">>,
	) => {
		try {
			await db.todos.update(id, updates);
			// biome-ignore lint: error must be of type any
		} catch (error: any) {
			throw new Error("Failed to update todo:", error.message);
		}
	};

	// biome-ignore lint: unecessary warning
	useEffect(() => {
		updateTodo(t.id, { text: input });
	}, [input]);

	const deleteTodo = async (id: number) => {
		const todo = await db.todos.get(id);
		if (!todo) return;
		await db.todos.delete(id);
		setTodoList(todoList.filter((t) => t.id !== id));
	};

	return (
		<div className="flex items-center justify-between rounded-sm border p-1 group/input hover:bg-accent">
			<Input
				type="text"
				value={input}
				onChange={(e) => setInput(e.target.value)}
				className="focus-visible:ring-0 focus-visible:border-none border-none dark:bg-input/0 shadow-none"
			/>
			<div className="flex items-center gap-0.5 group-hover/input:opacity-100 opacity-0">
				<button
					type="button"
					className="rounded-xs p-1.5 text-primary hover:bg-primary/40 flex items-center justify-center cursor-pointer"
					onClick={() => {
						updateTodo(t.id, { isPinned: !t.isPinned });
					}}
				>
					<Pin
						className={cn(
							"size-4 text-primary",
							t.isPinned ? "fill-primary" : "",
						)}
					/>
				</button>
				<button
					type="button"
					className="rounded-xs p-1.5 text-destructive hover:bg-destructive/40 cursor-pointer"
					onClick={() => deleteTodo(t.id)}
				>
					<X className="size-4" />
				</button>
			</div>
		</div>
	);
};

export default Todo;
