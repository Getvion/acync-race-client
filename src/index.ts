import { App, Generate, CarTrack, Control, Race, API, Winners } from './components/';

const app = new App();
const generate = new Generate();
const control = new Control();
const race = new Race();
const carTrack = new CarTrack();
const api = new API();
const winners = new Winners();

const navLayout = `<nav class="nav">
<button class="nav__button nav__button-garage">garage</button>
<button class="nav__button nav__button-winners">winners</button>
</nav>
<div class='app'></div>`;

const body = document.querySelector('body') as HTMLElement;
body.innerHTML = navLayout;

const garageBtn = document.querySelector('.nav__button-garage') as HTMLButtonElement;
const winnerBtn = document.querySelector('.nav__button-winners') as HTMLButtonElement;

garageBtn?.addEventListener('click', () => {
  const appElement = document.querySelector('.app') as HTMLElement;
  appElement.innerHTML = '';
  generate.generateGarage(control, race, carTrack, api, app);
  generate.generateGarageListeners(carTrack, api, app);
  race.generateRaceListeners(carTrack, api, app);
  carTrack.createTrack(api.getCars(app.garagePage));
  garageBtn.disabled = true;
  winnerBtn.disabled = false;
});
garageBtn.click();

winnerBtn.addEventListener('click', () => {
  garageBtn.disabled = false;
  winnerBtn.disabled = true;
  const appElement = document.querySelector('.app') as HTMLElement;
  appElement.innerHTML = '';
  generate.generatePageWinners(api, app);
  generate.generateWinners(winners, api, app);
  const appContainer = document.querySelector('.app') as HTMLElement;
  appContainer.innerHTML = winners.createTable();
  winners.isClickablePagination(app, api);
  generate.generateWinnersListeners(winners, api, app, carTrack);
});
