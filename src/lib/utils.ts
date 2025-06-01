import type { TodosPage } from "@/types/todo";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { db } from "./db";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

// Modify your getAllTodos to handle pagination
// This function will be passed to queryFn
export const getAllTodosPaginated = async ({
	pageParam = 0, // This will be `initialPageParam` on the first call, then `nextCursor`
}: {
	pageParam?: number;
}): Promise<TodosPage> => {
	const LIMIT = 10; // Number of items per page

	let collection = db.todos;

	// If pageParam is 0, it's the first page, no offset
	// Otherwise, fetch items with id > pageParam
	if (pageParam > 0) {
		collection = collection.where("id").above(pageParam);
	}

	// Order by id to ensure consistent pagination and get the next cursor
	// and limit the number of items
	const todos = await collection.orderBy("id").reverse().limit(LIMIT).toArray();

	// Determine the next cursor: the ID of the last todo in the current page
	const nextCursor =
		todos.length === LIMIT ? todos[todos.length - 1]?.id : undefined;

	return {
		data: todos,
		nextCursor: nextCursor,
	};
};

/**
 * // Function to generate a random string
function generateRandomText(length = 20) {
	let result = "";
	const characters =
		"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789 ";
	const charactersLength = characters.length;
	for (let i = 0; i < length; i++) {
		result += characters.charAt(Math.floor(Math.random() * charactersLength));
	}
	return result;
}

// Inside TodoList.tsx (for temporary testing)
const handleAddManyTodos = async (getAllTodos: () => void) => {
	const count = 500;
	console.log(`Starting to add ${count} random todos...`);
	const startTime = Date.now();
	let successfulAdds = 0;

	for (let i = 0; i < count; i++) {
		const randomText = generateRandomText(Math.floor(Math.random() * 50) + 10);
		const isCompleted = Math.random() < 0.2;
		const isPinned = Math.random() < 0.1;

		try {
			await db.todos.add({
				text: randomText,
				completed: isCompleted,
			});
			successfulAdds++;
			getAllTodos();
		} catch (error) {
			console.error("Error adding todo:", error);
		}

		if (successfulAdds % 500 === 0) {
			console.log(`Added ${successfulAdds} todos...`);
		}
	}

	const endTime = Date.now();
	const duration = (endTime - startTime) / 1000;
	console.log(
		`Finished adding ${successfulAdds} random todos in ${duration.toFixed(2)} seconds.`,
	);
};

  <Button onClick={() => handleAddManyTodos(getAllTodos)}>
				Add 500 Todos
			</Button> 
*/
