const PIVOTAL_URL = "https://www.pivotaltracker.com/services/v5";

class Request {
  constructor(client) {
    this.fetchOptions = {
      method: "GET",
      headers: new Headers(
        client.token ? { "X-TrackerToken": client.token } : {}
      ),
      mode: "cors",
      cache: "default",
    };
  }

  async request() {
    const url = `${PIVOTAL_URL}${this.uri()}${this.getParams()}`;
    const response = await fetch(url, this.fetchOptions);
    if (!response.ok) {
      throw Error(`${url}: ${response.statusText}`);
    }
    return response.json();
  }

  getParams() {
    if (!this.options) return "";
    return (
      "?" +
      Object.keys(this.options)
        .map((key) => key + "=" + this.options[key])
        .join("&")
    );
  }

  validateOptions(optional_parameters, options) {
    Object.keys(options).forEach((option) => {
      if (!optional_parameters.has(option)) {
        throw Error(`"${option}" is not a valid parameter`);
      }
    });
  }
}

export default Request;
