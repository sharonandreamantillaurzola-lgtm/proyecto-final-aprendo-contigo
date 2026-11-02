import { useCallback, useState } from 'react';
import { apiClient } from '../api/client.js';

export function useCrud(endpoint, token) {
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await apiClient.get(endpoint, token);
      setRecords(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [endpoint, token]);

  const create = useCallback(async (body) => {
    await apiClient.post(endpoint, body, token);
    await load();
  }, [endpoint, token, load]);

  const update = useCallback(async (id, body) => {
    await apiClient.put(`${endpoint}/${id}`, body, token);
    await load();
  }, [endpoint, token, load]);

  const remove = useCallback(async (id) => {
    await apiClient.delete(`${endpoint}/${id}`, token);
    await load();
  }, [endpoint, token, load]);

  return { records, loading, error, load, create, update, remove };
}
