import { useEffect, useState } from 'react';
import { getServices } from '../api/services.js';

export function useServices() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getServices()
      .then(res => {
        setServices(res.data);
      })
      .catch(err => {
        console.error('Error cargando servicios:', err);
    setServices([]);
      })
      .finally(() => setLoading(false));
  }, []);

  return { services, loading };
}
