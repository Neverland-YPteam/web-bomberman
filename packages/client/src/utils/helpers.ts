
export const checkResponseStatus = (response: Response) => {
  if (!response.ok) {
    return Promise.reject(new Error(response.statusText))
  }

  return Promise.resolve(response)
}
