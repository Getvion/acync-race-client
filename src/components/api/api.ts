export class API {
  async getCars<Type>(url: string, page: number, limit = 7): Promise<Type> {
    const response = await fetch(`${url}?_page=${page}&_limit=${limit}`);
    const cars = await response.json();
    return cars;
  }
  async getCar<Type>(url: string, id: string): Promise<Type> {
    const response = await fetch(`${url}/${id}`);
    const car = await response.json();
    return car;
  }
  getAmountCars(url: string) {
    const res = fetch(url)
      .then((response) => Promise.resolve(response.json()))
      .then((data) => {
        return data.length;
      });
    return res;
  }
  startStopEngine() {}
}
