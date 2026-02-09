"use client"

import { useEffect, useState } from "react";


type TProduct = {
  title : string
}

export default function useFetch( url : string ) {

      const [result, setResult] = useState<TProduct[]>([]);
      const [loading, setLoading] = useState(true)
      const [error, setError] = useState(null)
    
      useEffect(() => {
        fetch(url)
          .then((response) => response.json())
          .then((result) => setResult(result))
          .catch((error)=>setError(error))
          .finally(()=>setLoading(false))
      }, [url]);
    
      return {result, loading, error}

}
