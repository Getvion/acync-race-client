import { App, Generate, CarTrack, Control, Race, API } from './components/';
import { ICar } from './types';

const app = new App();
const generate = new Generate();
const control = new Control();
const race = new Race();
const carTrack = new CarTrack();
const api = new API();

generate.generateApp();
generate.generateGarage(control, race, carTrack, api);
generate.generateGarageListeners(carTrack, api);
carTrack.createTrack(api.getCars<ICar[]>('http://127.0.0.1:3000/garage'));
