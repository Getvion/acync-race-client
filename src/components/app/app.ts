import './app.scss';

export class App {
  garagePageCounter: number;
  tracksOnPageAmount: number;
  winnersPageCounter: number;
  winnersOnPageAmount: number;
  selectedCarData: { name: string; color: string; id: string };
  createCarData: { name: string; color: string };

  constructor() {
    this.garagePageCounter = 1;
    this.tracksOnPageAmount = 7;
    this.winnersPageCounter = 1;
    this.winnersOnPageAmount = 10;
    this.selectedCarData = { name: '', color: '#000000', id: '' };
    this.createCarData = { name: '', color: '#000000' };
  }

  get garagePage() {
    return this.garagePageCounter;
  }

  set garagePage(pageNumber: number) {
    if (pageNumber < 1) {
      alert('page cant be less 1');
      return;
    }
    this.garagePageCounter = pageNumber;
  }

  get winnersPage() {
    return this.winnersPageCounter;
  }

  set winnersPage(pageNumber: number) {
    if (pageNumber < 1) {
      alert('page cant be less 1');
      return;
    }
    this.winnersPageCounter = pageNumber;
  }

  get tracksOnPage() {
    return this.tracksOnPageAmount;
  }

  get winnersOnPage() {
    return this.winnersOnPageAmount;
  }

  get selectedCar() {
    return this.selectedCarData;
  }

  set selectedCar(dataObj: { name: string; color: string; id: string }) {
    this.selectedCarData = dataObj;
  }

  get createdCar() {
    return this.createCarData;
  }

  set createdCar(dataObj: { name: string; color: string }) {
    this.createCarData = dataObj;
  }
}
