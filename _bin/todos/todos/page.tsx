"use client";
import AddTask from "@/components/AddTask";
import Container from "@/components/Container";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { useEffect, useState } from "react";

function ToDoList() {
  const [taskList, setTaskList] = useState<Todos[]>([]);
  const [loading, setLoading] = useState(true);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");


  //////////// useEffect ////////////
  useEffect(() => {
    async function fetchList() {
      try {
        const res = await fetch("/api/todos");
        const data: Todos[] = await res.json();
        setTaskList(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    fetchList();
  }, []);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!title.trim()) return;
    setLoading(true); // start loading

    try {
      const res = await fetch("/api/todos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title,
          description,
        }),
      });

      const createdTask = await res.json();

      setTaskList((prev) => [...prev, createdTask]);

      setTitle("");
      setDescription("");
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false); // stop loading
    }
  }

  async function handleDelete(id: string) {
    try {
      const res = await fetch(`/api/todos/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        throw new Error("Failed to delete");
      }

      // Remove from state instantly
      setTaskList((prev) => prev.filter((task) => task.id !== id));
    } catch (err) {
      console.error(err);
    }
  }
  
  function handleUpdate(){
    alert("You clicked on Edit!")
  }

  return (
    <Container>
      <div className="flex gap-4">
        <div className="grid grid-cols-6 gap-4 bg-amber-100 rounded-xl p-5 mt-5">
          {taskList.map((item) => (
            <div className="bg-amber-400 p-5 rounded" key={item.id}>
              <p className="font-medium line-clamp-1">{item.title}</p>
              <p className="font-light line-clamp-1 ">{item.description}</p>

              <div className="flex gap-5 items-center mt-5">
                <Button onClick={() => handleUpdate()} variant="secondary">Edit</Button>
                <Button
                  onClick={() => handleDelete(item.id)}
                  variant="secondary"
                >
                  <Trash2 color="red" />
                </Button>
              </div>
            </div>
          ))}
        </div>

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
  );
}

export default ToDoList;
