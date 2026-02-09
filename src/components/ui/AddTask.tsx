"use client";
import { Input } from "./input";
import { Button } from "./button";
import { useState } from "react";

function AddTask() {
  const [input, setInput] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!input.trim()) return;

    try {
      const res = await fetch("/api/to-do", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: input,   // match your backend structure
        }),
      });

      if (!res.ok) {
        throw new Error("Failed to create task");
      }

      const data = await res.json();
      console.log(data);

      setInput("");
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <div className="flex flex-col gap-2 items-center justify-center">
      <h1>Add new Task</h1>
      <form onSubmit={handleSubmit} className="flex gap-2">
        <Input
          onChange={(e) => setInput(e.target.value)}
          className="w-50"
          type="text"
          placeholder="Enter the title"
          value={input}
        />
        <Button type="submit" variant="secondary">
          Add Task
        </Button>
      </form>
    </div>
  );
}

export default AddTask;
