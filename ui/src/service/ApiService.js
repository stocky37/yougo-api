class ApiService {
  constructor(baseUrl) {
    this.baseUrl = baseUrl;
  }

  getGos() {
    return fetch(`${this.baseUrl}/v1/aliases`)
      .catch(error => console.error('Error: ', error))
      .then(response => response.json());
  }

  addGo(shortcut, href, description) {
    return fetch(`${this.baseUrl}/v1/aliases`, {
      method: 'POST',
      headers: new Headers({
        'Content-Type': 'application/json'
      }),
      body: JSON.stringify({
        alias: shortcut,
        href: href,
        description: description
      })
    }).catch(error => console.error('Error: ', error))
    .then(response => response.json())
  }
}

export default new ApiService(process.env.REACT_APP_SERVICE_URL);