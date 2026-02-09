"use client";
import useFetch from "@/customHooks/useFetch";
import { useEffect, useState } from "react";

interface IUser {
  id: number;
  username: string;
  email: string;
  password: string;
}

function FetchAPI() {
  const [data, setData] = useState<IUser[]>([]);

  useEffect(() => {
    fetch("https://fakestoreapi.com/users")
      .then((response) => response.json())
      .then((data) => setData(data));
  }, []);

  const { result } = useFetch("https://fakestoreapi.com/products");

  console.log(typeof result)

  return (
    <div>
      <div>
        <ul>
          {data.map((item, index) => (
            <li key={index}>{item.username}</li>
          ))}
        </ul>
      </div>
      <div>
        {
            result.map((item, index)=> <p key={index}>{item.title}</p>)
        }
      </div>
    </div>
  );
}

export default FetchAPI;
