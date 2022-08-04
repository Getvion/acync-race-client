export class API {
  BASE_URL = 'http://127.0.0.1:3000';

  async getCars<Type>(page: number, limit = 7): Promise<Type> {
    const response = await fetch(`${this.BASE_URL}/garage?_page=${page}&_limit=${limit}`);
    return await response.json();
  }

  async getCar<Type>(url: string, id: string): Promise<Type> {
    const response = await fetch(`${url}/${id}`);
    return await response.json();
  }

  async getAmountCars(url: string) {
    return fetch(url)
      .then((response) => Promise.resolve(response.json()))
      .then((data) => data.length);
  }

  async startEngine(id: string) {
    const data = await fetch(`${this.BASE_URL}/engine?id=${id}&status=started`, { method: 'PATCH' });
    return data.json();
  }

  async stopEngine(id: string) {
    const data = await fetch(`${this.BASE_URL}/engine?id=${id}&status=stopped`, { method: 'PATCH' });
    return data.json();
  }

  async startDrive(id: string) {
    return await fetch(`${this.BASE_URL}/engine?id=${id}&status=drive`, { method: 'PATCH' }).then((data) =>
      data.json()
    );
  }

  async getWinner(id: string) {
    return await fetch(`${this.BASE_URL}/winners/${id}`).then((data) => data.json());
  }

  async updateWinner(id: string, winnerObj: { wins: number; time: number }) {
    return await fetch(`${this.BASE_URL}/winners/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(winnerObj),
    }).then((data) => data.json());
  }

  async createWinner(winnerObj: { id: number; wins: number; time: number }) {
    return await fetch(`${this.BASE_URL}/winners`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(winnerObj),
    }).then((data) => data.json());
  }

  async getWinners(page: number = 1, limit: number = 10, sort: string = 'id', order: string = 'ASC') {
    return fetch(`${this.BASE_URL}/winners?_page=${page}&_limit=${limit}&_sort=${sort}&_order=${order}`).then((data) =>
      data.json()
    );
  }
}
