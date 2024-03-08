const serviceWorker = () => {
  let serviceWorkerURL = `${process.env.PUBLIC_URL}/serviceWorker.js`
  navigator.serviceWorker.register(serviceWorkerURL)
    .then(response => {
      console.log("Response - after registering service worker:::", response);
    })
    .catch(error => {
      console.log("Error - while registering service worker:::", error);
    });
}

export default serviceWorker;