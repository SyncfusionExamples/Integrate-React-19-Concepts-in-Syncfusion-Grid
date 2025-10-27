"use client";
import React, { useOptimistic, useState, useActionState } from "react";
import { submitTask } from "../actions";
import { GridComponent, ColumnsDirective, ColumnDirective } from "@syncfusion/ej2-react-grids";
import { TextBoxComponent } from "@syncfusion/ej2-react-inputs";
import { ButtonComponent } from "@syncfusion/ej2-react-buttons";

export type Task = {
  id: number | string;
  task: string;
  status?: string;
};

interface TodoAppClientProps {
  tasks: Task[];
}

export default function TodoAppComponent({ tasks }: TodoAppClientProps) {
  const [taskID, setTaskID] = useState("");
  const [taskName, setTaskName] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [state, formAction] = useActionState(submitTask, tasks);

  const [optimisticState, addOptimistic] = useOptimistic<Task[], Task>(
    state,
    (prevState, newTask) => {
      const existingTaskIndex = prevState.findIndex(task => task.id === newTask.id);
      if (existingTaskIndex !== -1) {
        return prevState.map(task =>
          task.id === newTask.id ? { ...task, ...newTask } : task
        );
      } else {
        return [...prevState, newTask];
      }
    }
  );

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  function rowSelected(args: any) {
    const row = args.data as Task;
    if (row) {
      setTaskID(String(row.id));
      setTaskName(row.task);
    } else {
      setTaskID("");
      setTaskName("");
    }
  }

  async function handleSubmit(formData: FormData) {
    if (isSubmitting) return;
    setIsSubmitting(true);
    const idField = formData.get("id") as string;
    const id = idField ? Number(idField) : "";
    const optimisticTask: Task = {
      id,
      task: "Saving...",
      status: ""
    };
    addOptimistic(optimisticTask);
    await formAction(formData);
    setTaskID("");
    setTaskName("");
    setIsSubmitting(false);
  }

  return (
    <form action={handleSubmit} style={{ padding: 24, marginTop: 80 }}>
      <input type="hidden" name="id" value={taskID} />

      <table className="border w-full mb-6">
        <tbody>
          <tr>
            <td className="px-4 py-2">Enter Task</td>
            <td className="px-4 py-2">
              <TextBoxComponent value={taskName} name="task" placeholder="Enter Task"/>
            </td>
          </tr>
          <tr>
            <td className="px-4 py-2">Enter Status</td>
            <td className="px-4 py-2">
              <TextBoxComponent name="status" placeholder="Enter Status" />
            </td>
          </tr>
          <tr>
            <td />
            <td className="px-4 py-2">
              <ButtonComponent disabled={isSubmitting}>{taskID ? "Save" : "Add"}</ButtonComponent>
            </td>
          </tr>
        </tbody>
      </table>

      <GridComponent className="e-custom-control" dataSource={optimisticState} rowSelected={rowSelected}>
            <ColumnsDirective>
              <ColumnDirective field="id" headerText="Task ID" width="120" isPrimaryKey />
              <ColumnDirective field="task" headerText="Task Name" width="150" />
              <ColumnDirective field="status" headerText="Status" width="120" />
            </ColumnsDirective>
          </GridComponent>
    </form>
  );
}