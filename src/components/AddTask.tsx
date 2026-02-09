// components/AddTask.tsx
"use client";
import { Button } from "@/components/ui/button";

interface Props {
  title: string;
  description: string;
  loading: boolean;
  setTitle: (val: string) => void;
  setDescription: (val: string) => void;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

export default function AddTask({ title, description, loading, setTitle, setDescription, handleSubmit }: Props) {
  return (
    <form onSubmit={handleSubmit} className="bg-white p-5 rounded-xl flex flex-col gap-3 w-80">
      <h2 className="font-bold text-lg">Add New Task</h2>
      <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Title" className="p-2 border rounded" />
      <textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Description" className="p-2 border rounded" />
      <Button variant="secondary" type="submit" disabled={loading}>{loading ? "Adding..." : "Add Task"}</Button>
    </form>
  );
}
