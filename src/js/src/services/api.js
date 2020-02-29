const prependApiUrl = path => {
  if(path[0] !== '/') {
    throw Error(`Path '${path}' does not start with '/'. Use /${path} instead.`);
  }

  return `${API_URL}${path}`;
};

const fetcher = async (
  url,
  {
    method = 'GET',
    body = {},
    headers
  }
) => {
  const options = {
    method,
    headers
  };

  // disallow body inclusion for methods that don't support it
  if(method !== 'GET' && method !== 'DELETE') {
    options.body = JSON.stringify(body);
  }

  const response = await fetch(prependApiUrl(url), options);

  if(response.status === 401) {
    throw new Error(response.status);
  }

  if(response.status >= 400) {
    const text = await response.text();
    throw new Error(text);
  }

  // including the deleted resource is useful for any further actions
  if(response.status === 204) return {result: body};

  return await response.json();
};

export default fetcher;
