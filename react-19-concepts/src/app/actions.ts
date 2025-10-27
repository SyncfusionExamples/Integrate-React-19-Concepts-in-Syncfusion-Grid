'use server';
import { Task } from "./components/TodoAppComponent";

const tasks: Task[] = [
  { id: 1, task: "Scrum Meeting", status: "Pending" },
  { id: 2, task: "Sprint Planning", status: "Pending" },
  { id: 3, task: "ES Portal Review", status: "Pending" }
];

export async function getTasks(): Promise<Task[]> {
  await new Promise(resolve => setTimeout(resolve, 500));
  return tasks;
}

export async function submitTask(prev: Task[], formData: FormData): Promise<Task[]> {
  await new Promise((r) => setTimeout(r, 2000));

  const rawTaskId = formData.get("id");
  const task = formData.get("task") as string;
  const status = formData.get("status") as string;
  const taskId = rawTaskId ? Number(rawTaskId) : null;

  if (rawTaskId !== '') {
    return prev.map(taskItem =>
      taskItem.id === taskId ? { ...taskItem, task, status } : taskItem
    );
  } else {
    const newTask: Task = {
      id: (Number(prev[prev.length - 1].id) + 1) as number,
      task,
      status,
    };
    const updatedData = prev.filter(task => task.id !== newTask.id);
    return [...updatedData, newTask];
  }
}
