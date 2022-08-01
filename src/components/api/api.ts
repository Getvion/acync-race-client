export class API {
  async getCars<Type>(url: string, page = 1, limit = 7): Promise<Type> {
    const response = await fetch(`${url}?_page=${page}&_limit=${limit}`);
    const cars = await response.json();

    return cars;
  }

  async getCar<Type>(url: string, id: string): Promise<Type> {
    const response = await fetch(`${url}/${id}`);
    const car = await response.json();
    return car;
  }

  async getAmountCars(url: string) {
    const response = await fetch(url);
    const data = await response.json();
    return data.length;
  }
}
