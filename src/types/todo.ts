export type TodoType = {
	id: number;
	text: string;
	completed?: boolean;
	isPinned?: boolean;
};

export type TodosPage = {
	data: TodoType[];
	nextCursor: number | undefined; // The ID of the last item, or undefined if no more pages
};
