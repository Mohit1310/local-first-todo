import TodoList from "@/components/todo-list";

export default function HomePage() {
	return (
		<div className="container mx-auto flex max-w-xl flex-col items-center justify-center gap-5">
			<h1 className="text-xl">Your Todo list</h1>
			<TodoList />
		</div>
	);
}
