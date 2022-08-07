import { API, CarTrack, Control, Race, App, Winners } from '../index';

export class Generate {
  generateGarage(control: Control, race: Race, carTrack: CarTrack, api: API, app: App) {
    control.generateControl(race, carTrack);
    carTrack.generateTrackWrapper(api, app);
    carTrack.paginationHandler(api, app);
    carTrack.paginationClickableButtons(app, api);
    setTimeout(() => carTrack.carHandler(api), 100);
  }

  generateGarageListeners(carTrack: CarTrack, api: API, app: App) {
    const trackList = document.querySelector('.trackList');
    trackList?.addEventListener('click', (event) => {
      this.trackListListener(event, carTrack, api, app);
    });

    const createInput = document.querySelector('.field__create.create');
    createInput?.addEventListener('click', (event) => {
      this.createInputListener(event, carTrack, api, app, createInput);
    });

    const startRaceBtn = document.querySelector('.fields__button-start') as HTMLButtonElement;
    const stopRaceBtn = document.querySelector('.fields__button-reset') as HTMLButtonElement;

    startRaceBtn.addEventListener('click', () => {
      this.startRaceBtnListener(carTrack, api, startRaceBtn, stopRaceBtn);
    });
    stopRaceBtn.addEventListener('click', () => {
      this.stopRaceBtnListener(carTrack, api, app, startRaceBtn, stopRaceBtn);
    });
  }

  trackListListener(event: Event, carTrack: CarTrack, api: API, app: App) {
    const target = event.target as HTMLElement;

    if (target.closest('.car-track') && target.classList.contains('car__button')) {
      if (target.classList.contains('car__button-remove')) {
        const carId = target.parentElement?.nextElementSibling?.id;
        carTrack.deleteCar(carId as string);
      }

      if (target.classList.contains('car__button-select')) {
        this.selectButton(target, api, carTrack, app);
      }

      setTimeout(() => {
        carTrack.createTrack(api.getCars(app.garagePage));
        setTimeout(() => carTrack.carHandler(api), 100);
        carTrack.updateGarageAmount(api);
        carTrack.paginationClickableButtons(app, api);
      }, 100);
    }
  }

  selectButton(target: HTMLElement, api: API, carTrack: CarTrack, app: App) {
    const carId = target.parentElement?.nextElementSibling?.id;
    const updateInput = document.querySelector('.field__update.update');
    const updateButton = updateInput?.querySelector('button');
    const name = updateInput?.querySelector('.update__input[type=text]') as HTMLInputElement;
    const color = updateInput?.querySelector('.update__input[type=color]') as HTMLInputElement;
    const currentCar = api.getCar(carId as string);

    updateInput?.childNodes.forEach((elem) => ((elem as HTMLInputElement).disabled = false));

    currentCar.then((result) => {
      name.value = result.name;
      color.value = result.color;
    });

    updateButton?.addEventListener('click', () => {
      if (!(name.value && color.value)) return;

      carTrack.updateCar(name.value, color.value, carId as string);
      updateInput?.childNodes.forEach((elem) => ((elem as HTMLInputElement).disabled = true));
      name.value = '';
      color.value = '#000000';

      carTrack.createTrack(api.getCars(app.garagePage));
      setTimeout(() => carTrack.carHandler(api), 100);
    });
  }

  createInputListener(event: Event, carTrack: CarTrack, api: API, app: App, createInput: Element) {
    const target = event?.target as HTMLElement;
    if (target.tagName === 'BUTTON') {
      const name = (createInput.querySelector('.create__input[type=text]') as HTMLInputElement).value;
      const color = (createInput.querySelector('.create__input[type=color]') as HTMLInputElement).value;
      if (name && color) {
        carTrack.createCar(name, color);
        carTrack.createTrack(api.getCars(app.garagePage));
        setTimeout(() => carTrack.carHandler(api), 100);
        carTrack.updateGarageAmount(api);
        carTrack.paginationClickableButtons(app, api);
      }
      (createInput.querySelector('.create__input[type=text]') as HTMLInputElement).value = '';
      (createInput.querySelector('.create__input[type=color]') as HTMLInputElement).value = '#000000';
    }
  }

  startRaceBtnListener(carTrack: CarTrack, api: API, startBtn: HTMLButtonElement, stopBtn: HTMLButtonElement) {
    const arrOfWinners: { id: string; success: boolean; time: string }[] = [];
    let finished = false;
    const allCarsOnPage = document.querySelectorAll('.car') as NodeList;
    startBtn.disabled = true;
    stopBtn.disabled = false;

    allCarsOnPage.forEach((car) => {
      const carElem = car as HTMLElement;
      const id = carElem.id;
      const btnStart = carElem.closest('.car-track')?.querySelector('.button-start') as HTMLButtonElement;
      const btnStop = carElem.closest('.car-track')?.querySelector('.button-stop') as HTMLButtonElement;

      (async () => {
        const carData = await carTrack.engineOperation(id, carElem, api, btnStart, btnStop);
        if (!carData) return;
        arrOfWinners.push(carData);

        if (arrOfWinners.length && !finished) {
          const winner = arrOfWinners[0];
          finished = true;

          const winnerObj = await api.getWinner(winner.id);

          if (winnerObj.id) {
            const bestTime = Number(winner.time < winnerObj.time ? winner.time : winnerObj.time);

            const newWinnerData = {
              wins: ++winnerObj.wins,
              time: bestTime,
            };

            api.updateWinner(id, newWinnerData);
          } else {
            api.createWinner({ id: Number(winner.id), time: Number(winner.time), wins: 1 });
          }
        }
      })();
    });
  }

  stopRaceBtnListener(carTrack: CarTrack, api: API, app: App, startBtn: HTMLButtonElement, stopBtn: HTMLButtonElement) {
    startBtn.disabled = false;
    stopBtn.disabled = true;

    const allCarsOnPage = document.querySelectorAll('.car') as NodeList;
    allCarsOnPage.forEach((car) => {
      const carElem = car as HTMLElement;

      const btnStart = carElem.closest('.car-track')?.querySelector('.button-start') as HTMLButtonElement;
      const btnStop = carElem.closest('.car-track')?.querySelector('.button-stop') as HTMLButtonElement;

      btnStop.disabled = true;
      carElem?.classList.remove('drive');
      btnStart.disabled = false;
    });
    carTrack.createTrack(api.getCars(app.garagePage));
  }

  generatePageWinners(api: API, app: App) {
    const appContainer = document.querySelector('.app') as HTMLElement;
    const h1 = document.createElement('h1');
    (async () => {
      const winnersAmount = await api.getWinnersAmount();
      h1.innerHTML = `Winners (${winnersAmount})`;
      const h2 = document.createElement('h2');
      h2.innerHTML = `Page <span class="page__number">${app.winnersPage}</span>`;
      appContainer.prepend(h2, h1);
    })();
  }

  async generateWinners(winners: Winners, api: API, app: App) {
    const arrOfWinnersWithCars = await api.getWinnersWithCars(app.winnersPage);
    const tableBody = document.querySelector('.table__body') as HTMLElement;
    tableBody.innerHTML = '';
    setTimeout(() => arrOfWinnersWithCars.forEach((elem, i) => tableBody?.append(winners.createTr(elem, i, app))), 100);
  }

  generateWinnersListeners(winners: Winners, api: API, app: App, carTrack: CarTrack) {
    const pagination = document.querySelector('.pagination');
    pagination?.addEventListener('click', (event) => {
      const btnPrev = document.querySelector('.pagination__prev') as HTMLButtonElement;
      const btnNext = document.querySelector('.pagination__next') as HTMLButtonElement;
      const target = event.target as HTMLElement;

      if (target.className === 'pagination__prev' && !btnPrev.disabled) app.winnersPage -= 1;
      if (target.className === 'pagination__next' && !btnNext.disabled) app.winnersPage += 1;

      this.generateWinners(winners, api, app);
      winners.isClickablePagination(app, api);
      carTrack.updatePageNumber(app, app.winnersPage);
    });
  }
}
