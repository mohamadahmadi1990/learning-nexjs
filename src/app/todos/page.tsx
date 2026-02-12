"use client";

import { Suspense, useEffect, useState } from "react";
import AddTask from "@/components/AddTask";
import Container from "@/components/Container";
import { Button } from "@/components/ui/button";
import { Trash2, Edit2 } from "lucide-react";

// type Todos = {
//   _id: string;
//   title: string;
//   description?: string;
//   completed?: boolean;
// };

export default function ToDoList() {
  const [taskList, setTaskList] = useState<Todos[]>([]);
  const [loading, setLoading] = useState(false);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editTitle, setEditTitle] = useState("");
  const [editDescription, setEditDescription] = useState("");

  // --------- Fetch tasks ---------
  useEffect(() => {
    const fetchList = async () => {
      setLoading(true);
      try {
        const res = await fetch("/api/todos");
        const data: Todos[] = await res.json();
        setTaskList(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchList();
  }, []);

  // --------- Add task ---------
  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!title.trim()) return;

    setLoading(true);
    try {
      const res = await fetch("/api/todos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, description }),
      });
      if (!res.ok) throw new Error("Failed to create task");

      const createdTask: Todos = await res.json();
      setTaskList((prev) => [...prev, createdTask]);
      setTitle("");
      setDescription("");
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  // --------- Delete task ---------
async function handleDelete(id: string) {
  console.log("Deleting id:", id); // DEBUG
  try {
    const res = await fetch(`/api/todos/${id}`, { method: "DELETE" });
    if (!res.ok) throw new Error(`Failed to delete task: ${res.status}`);
    setTaskList((prev) => prev.filter((t) => t._id !== id));
  } catch (err) {
    console.error("Error deleting task:", err);
  }
}


  // --------- Start editing ---------
  function startEdit(task: Todos) {
    setEditingId(task._id);
    setEditTitle(task.title);
    setEditDescription(task.description || "");
  }

  // --------- Save edits ---------
  async function saveEdit(id: string) {
    try {
      const res = await fetch(`/api/todos/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title: editTitle, description: editDescription }),
      });
      if (!res.ok) throw new Error("Failed to update task");

      const updatedTask: Todos = await res.json();
      setTaskList((prev) => prev.map((t) => (t._id === id ? updatedTask : t)));
      cancelEdit();
    } catch (err) {
      console.error(err);
    }
  }

  function cancelEdit() {
    setEditingId(null);
    setEditTitle("");
    setEditDescription("");
  }

  return (
    <Suspense fallback={<h1>Loading ...</h1>}>
    <Container>
      <div className="flex gap-6 mt-5">
        {/* Task list */}
        <div className="grid grid-cols-6 gap-4 bg-amber-100 rounded-xl p-5 flex-1">
          {loading && <p className="col-span-6 text-center">Loading...</p>}

          {taskList.map((item) => (
            <div className="bg-amber-400 p-5 rounded col-span-6 md:col-span-2" key={item._id}>
              {editingId === item._id ? (
                <>
                  <input value={editTitle} onChange={(e) => setEditTitle(e.target.value)} className="w-full mb-2 p-1 rounded" />
                  <textarea value={editDescription} onChange={(e) => setEditDescription(e.target.value)} className="w-full mb-2 p-1 rounded" />
                  <div className="flex gap-2">
                    <Button onClick={() => saveEdit(item._id)}>Save</Button>
                    <Button onClick={cancelEdit} variant="secondary">Cancel</Button>
                  </div>
                </>
              ) : (
                <>
                  <p className="font-medium line-clamp-1">{item.title}</p>
                  <p className="font-light line-clamp-1">{item.description}</p>
                  <div className="flex gap-3 items-center mt-3">
                    <Button onClick={() => startEdit(item)} variant="secondary"><Edit2 size={16} /> Edit</Button>
                    <Button onClick={() => handleDelete(item._id)} variant="secondary"><Trash2 color="red" /> Delete</Button>
                  </div>
                </>
              )}
            </div>
          ))}
        </div>

        {/* Add new task */}
        <AddTask
          title={title}
          description={description}
          loading={loading}
          setTitle={setTitle}
          setDescription={setDescription}
          handleSubmit={handleSubmit}
        />
      </div>
    </Container>
    </Suspense>
  );
}
