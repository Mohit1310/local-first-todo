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

	const updateTodo = (e: React.ChangeEvent<HTMLInputElement>, id: number) => {
		setTodoList(
			todoList.map((t) => {
				if (t.id === id) {
					return {
						id: t.id,
						text: e.target.value,
					};
				}
				return t;
			}),
		);
	};

	return (
		<div className="flex items-center justify-between rounded-sm border p-1 group/input hover:bg-accent">
			<Input
				type="text"
				value={t.text}
				onChange={(e) => updateTodo(e, t.id)}
				className="focus-visible:ring-0 focus-visible:border-none border-none dark:bg-input/0 shadow-none"
			/>
			<div className="flex items-center gap-0.5 group-hover/input:opacity-100 opacity-0">
				<button
					type="button"
					className="rounded-xs p-1.5 text-primary hover:bg-primary/40 flex items-center justify-center cursor-pointer"
					onClick={() => pinTodo(t.id)}
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
				>
					<X className="size-4" />
				</button>
			</div>
		</div>
	);
};

export default Todo;
