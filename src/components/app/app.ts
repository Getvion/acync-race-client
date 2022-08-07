import './app.scss';

export class App {
  garagePageCounter: number;
  tracksOnPageAmount: number;
  winnersPageCounter: number;
  winnersOnPageAmount: number;

  constructor() {
    this.garagePageCounter = 1;
    this.tracksOnPageAmount = 7;
    this.winnersPageCounter = 1;
    this.winnersOnPageAmount = 10;
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
}
