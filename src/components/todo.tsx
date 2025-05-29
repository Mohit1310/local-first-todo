import { db } from "@/lib/db";
import { cn } from "@/lib/utils";
import type { TodoType } from "@/types/todo";
import { Pin, X } from "lucide-react";
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
	const pinTodo = (id: number) => {
		setTodoList(
			todoList.map((t) => {
				if (t.id === id) {
					return {
						...t,
						isPinned: !t.isPinned,
					};
				}
				return t;
			}),
		);
	};

	const updateTodo = async (
		// e: React.ChangeEvent<HTMLInputElement>,
		// id: number,
		t: TodoType,
	) => {
		// setTodoList(
		// 	todoList.map(async (t) => {
		// 		if (t.id === id) {
		// 			return await db.todos.update(id, {
		// 				text: e.target.value,
		// 			});
		// 		}
		// 		return t;
		// 	}),
		// );

		const todo = await db.todos.get(t.id);
	};

	const deleteTodo = (id: number) => {
		setTodoList(todoList.filter((t) => t.id !== id));
	};

	return (
		<div className="flex items-center justify-between rounded-sm border p-1 group/input hover:bg-accent">
			<Input
				type="text"
				value={t.text}
				onChange={() => updateTodo(t)}
				className="focus-visible:ring-0 focus-visible:border-none border-none dark:bg-input/0 shadow-none"
			/>
			<div className="flex items-center gap-0.5 group-hover/input:opacity-100 opacity-0">
				<button
					type="button"
					className="rounded-xs p-1.5 text-primary hover:bg-primary/40 flex items-center justify-center cursor-pointer"
					onClick={() => {
						pinTodo(t.id);
						updateTodo({ ...t, isPinned: !t.isPinned });
					}}
				>
					<Pin
						className={cn(
							"size-4 text-primary",
							t.isPinned ? "fill-primary" : "",
						)}
					/>
				</button>
				{/* <button
					type="button"
					className="rounded-xs p-1.5 text-primary hover:bg-primary/40 flex items-center justify-center cursor-pointer"
					onClick={() => updateTodo(t)}
				>
					<Pin
						className={cn(
							"size-4 text-primary",
							t.isPinned ? "fill-primary" : "",
						)}
					/>
				</button> */}
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
