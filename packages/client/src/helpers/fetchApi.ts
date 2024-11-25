interface ApiResponse<T> {
  data: T;
  message: string;
  hasError: boolean;
}

interface ApiRequest<T> {
  method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE',
  config: {
    path: string,
    payload?: T
    params?: URLSearchParams,
  }
}

const methodsVerbs = {
  GET: 'fetch',
  POST: 'create',
  PUT: 'update',
  PATCH: 'update',
  DELETE: 'delete',
};

const apiUrl = env.API_CONN;

const fetchApi = async <T, D>(request: ApiRequest<D>): Promise<ApiResponse<T>> => {
  const { method, config: { path, params = '', payload = {} } = {} } = request;

  const response = await fetch(`${apiUrl}/${path}/${params}`, {
    method,
    headers: { 'Content-Type': 'application/json' },
    body: method === 'GET' ? undefined : JSON.stringify(payload),
  });

  const { data } = await response.json();

  return {
    data,
    message: `${response.ok ? 'Success' : 'Error'} on ${methodsVerbs[method]} task(s)`,
    hasError: !response.ok,
  };
};

export default fetchApi;