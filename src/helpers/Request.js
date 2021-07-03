class Request {

    async get(url) {
      try {
      const res = await fetch(url);
      return await res.json();
      }
      catch(error) {
        return console.error(error);
      }
    }

    delete(url) {
      try {
      return fetch(url, {
        method: "DELETE",
        headers: {'Content-Type': 'application/json'}
      })
    }
    catch(error) {
      return console.error(error);
    }
    }

    post(url, payload){
      return fetch(url, {
        method: "POST",
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(payload)
      })
    }

    put(url, payload){
      return fetch(url, {
        method: "PUT",
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(payload)
      })
    }

}

export default Request;