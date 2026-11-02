import { useCallback, useState } from 'react';

export function useServicePlanner() {
  const [selected, setSelected] = useState([]);
  const [total, setTotal] = useState(0);

  const add = useCallback((service) => {
    const price = Number(service?.precio || 0);
    if (!service || price <= 0) return false;

    setSelected((prev) => [...prev, service]);
    setTotal((prev) => prev + price);
    return true;
  }, []);

  return { selected, total, add };
}
