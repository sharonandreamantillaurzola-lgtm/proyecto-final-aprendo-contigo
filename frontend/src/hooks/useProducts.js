import { useEffect, useState } from 'react';
import { apiClient } from '../api/client.js';

export function useProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let active = true;

    apiClient.get('/products')
      .then((data) => { if (active) setProducts(data); })
      .catch((err) => { if (active) setError(err.message); })
      .finally(() => { if (active) setLoading(false); });

    return () => { active = false; };
  }, []);

  return { products, loading, error };
}
