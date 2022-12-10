const MESSAGE_SUCCESS = 'ServiceWorker registration successful with scope:'
const MESSAGE_ERROR = 'ServiceWorker registration failed:'

export const startServiceWorker = () => {
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('./sw.js')
        .then(({ scope }) => {
          console.log(MESSAGE_SUCCESS, scope)
        })
        .catch((error) => {
          console.error(MESSAGE_ERROR, error)
        })
    })
  }
}
