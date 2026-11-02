const API_BASE = import.meta.env.VITE_API_URL || '/api';


class ApiClient {
  constructor(baseUrl = API_BASE) {
    this.baseUrl = baseUrl;
  }


  async request(path, options = {}) {
    const response = await fetch(`${this.baseUrl}${path}`, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...(options.headers || {}),
      },
    });
    const data = await response.json().catch(() => ({}));

    if (!response.ok) {
      throw new Error(data.message || data.mensaje || data.error || 'Error en la solicitud');
    }

    return data;
  }

  get(path, token) {
    return this.request(path, token ? { headers: { Authorization: `Bearer ${token}` } } : {});
  }

  post(path, body, token) {
    return this.request(path, {
      method: 'POST',
      body: JSON.stringify(body),
      ...(token ? { headers: { Authorization: `Bearer ${token}` } } : {}),
    });
  }

  put(path, body, token) {
    return this.request(path, {
      method: 'PUT',
      body: JSON.stringify(body),
      ...(token ? { headers: { Authorization: `Bearer ${token}` } } : {}),
    });
  }

  delete(path, token) {
    return this.request(path, {
      method: 'DELETE',
      ...(token ? { headers: { Authorization: `Bearer ${token}` } } : {}),
    });
  }
}

export const apiClient = new ApiClient();

export default ApiClient;
