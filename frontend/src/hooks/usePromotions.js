import { useEffect, useState } from 'react';
import { apiClient } from '../api/client.js';

export function usePromotions() {
  const [promotions, setPromotions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let active = true;

    apiClient.get('/promotions')
      .then((data) => {
        if (active) setPromotions(data.filter((p) => p.activa !== false));
      })
      .catch((err) => { if (active) setError(err.message); })
      .finally(() => { if (active) setLoading(false); });

    return () => { active = false; };
  }, []);

  return { promotions, loading, error };
}
