import { App, Generate, CarTrack, Controll, Race, API } from './components/';
import { ICar } from './types';

const app = new App();
const generate = new Generate();
const controll = new Controll();
const race = new Race();
const carTrack = new CarTrack();
const api = new API();

generate.generateApp();
generate.generateGarage(controll, race, carTrack);

carTrack.createTrack(api.getCars<ICar[]>('http://127.0.0.1:3000/garage'));
