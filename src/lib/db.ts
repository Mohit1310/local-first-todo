import type { TodoType } from "@/types/todo";
import Dexie, { type EntityTable } from "dexie";

const db = new Dexie("Todo") as Dexie & {
	todos: EntityTable<TodoType, "id">;
};

db.version(1).stores({
	todos: "++id, text, completed, isPinned",
});

export { db };
