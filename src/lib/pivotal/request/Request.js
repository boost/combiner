const PIVOTAL_URL = `https://www.pivotaltracker.com/services/v5`;

class Request {
  constructor(client) {
    this.options = {
      method: 'GET',
      headers: new Headers({'X-TrackerToken': client.token }),
      mode: 'cors',
      cache: 'default'
    };
  }

  async request() {
    const response = await fetch(`${PIVOTAL_URL}${this.uri()}`, this.options)
    if (!response.ok) {
      throw Error(response.statusText);
    }
    return response.json();
  }
}

export default Request;