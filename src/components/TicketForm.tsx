"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Input } from "./ui/input";
import { Field, FieldLabel } from "./ui/field";
import { Textarea } from "./ui/textarea";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { ChangeEvent, FormEvent } from "react";


function TicketForm() {
  const router = useRouter();

  const startingTicketData = {
    title: "",
    description: "",
    category: "Hardware problem",
    priority: 1,
    progress: 0,
    status: "not started",
    active: true,
  };

  const [formData, setFormData] = useState<Ticket>(startingTicketData);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement >) => {

    const { name, value, type } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "radio" || name === "priority" ? Number(value) : value,
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    
    e.preventDefault();

    const res = await fetch("/api/tickets", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ formData }),
    });

    if (!res.ok) throw new Error("Failed to create ticket!");

    router.refresh();
    router.push("/");
  };

  return (
    <div className="flex flex-col justify-center items-center gap-5">
      <h3 className="text-lg">Create your Ticket</h3>
      <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
        <Field>
          <FieldLabel htmlFor="title">Title</FieldLabel>
          <Input
            id="title"
            name="title"
            type="text"
            onChange={handleChange}
            required
            value={formData.title}
          />
        </Field>

        <Field>
          <FieldLabel htmlFor="description">Description</FieldLabel>
          <Textarea
            id="description"
            name="description"
            onChange={handleChange}
            required
            value={formData.description}
          />
        </Field>

        <Field>
          <FieldLabel htmlFor="category">Category</FieldLabel>
          <Select
            value={formData.category}
            onValueChange={(value) => setFormData((prev) => ({ ...prev, category: value }))}
          >
            <SelectTrigger className="w-full max-w-48">
              <SelectValue placeholder="Select a category" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Services</SelectLabel>
                <SelectItem value="Hardware problem">Hardware problem</SelectItem>
                <SelectItem value="Software problem">Software problem</SelectItem>
                <SelectItem value="Project">Project</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </Field>

        <Field>
          <FieldLabel>Priority</FieldLabel>
          <div className="flex gap-3">
            {[1, 2, 3].map((num) => (
              <label key={num} className="flex items-center gap-1">
                <input
                  type="radio"
                  name="priority"
                  value={num}
                  checked={formData.priority === num}
                  onChange={handleChange}
                />
                {num}
              </label>
            ))}
          </div>
        </Field>

        <Field>
          <FieldLabel>Progress</FieldLabel>
          <input
            type="range"
            id="progress"
            name="progress"
            onChange={handleChange}
            value={formData.progress}
            min={0}
            max={100}
          />
        </Field>

        <Field>
          <FieldLabel>Status</FieldLabel>
          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
          >
            <option value="not started">Not started</option>
            <option value="started">Started</option>
            <option value="done">Done</option>
          </select>
        </Field>

        <Input type="submit" value="Create Ticket" />
      </form>
    </div>
  );
}

export default TicketForm;