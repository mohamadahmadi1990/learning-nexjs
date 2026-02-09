type Todos = {
  _id: string;
  title: string;
  description: string;
  completed?: boolean; // optional if you plan to add a checkbox
  createdAt?: string;
};
