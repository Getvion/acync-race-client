import { Race } from '../race/race';
import { CarTrack } from '../carTrack/carTrack';

export class Control {
  generateControl(race: Race, carTrack: CarTrack) {
    const app = document.querySelector('.app') as HTMLElement;
    const field = document.createElement('div');
    field.classList.add('fields');
    app.append(field);
    const arr: string[] = [carTrack.createInputs(), carTrack.updateInputs(), race.generateButtons()];
    field.innerHTML = `${arr.map((elem) => elem).join('')}`;
  }
}
