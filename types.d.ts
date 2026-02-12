type Todos = {
  _id: string;
  title: string;
  description: string;
  completed?: boolean; // optional if you plan to add a checkbox
  createdAt?: string;
};

type IProduct = {
  _id: string;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
}
