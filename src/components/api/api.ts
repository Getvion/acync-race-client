export class API {
  BASE_URL = 'http://127.0.0.1:3000';

  async getCars<Type>(url: string, page: number, limit = 7): Promise<Type> {
    const response = await fetch(`${url}?_page=${page}&_limit=${limit}`);
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
    const data = await fetch(`${this.BASE_URL}/engine?id=${id}&status=started`, {
      method: 'PATCH',
    });
    return data.json();
  }

  async stopEngine(id: string) {
    return await fetch(`${this.BASE_URL}/engine?id=${id}&status=stopped`, {
      method: 'PATCH',
    }).then((data) => data.json());
  }

  async startDrive(id: string) {
    return await fetch(`${this.BASE_URL}/engine?id=${id}&status=drive`, {
      method: 'PATCH',
    }).then((data) => data.json());
  }
}
