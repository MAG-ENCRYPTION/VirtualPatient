export const customFetch = {
  get: async (url: string) => {
    return fetch(url).then((res) => res.json())
  },

  put: async (url: string, data: unknown) => {
    return fetch(url, {
      method: 'put',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    }).then((res) => res.json())
  },

  post: async (url: string, data: unknown) => {
    return fetch(url, {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    }).then((res) => res.json())
  },
}
