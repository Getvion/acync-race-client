import { Race } from '../race/race';
import { CarTrack } from '../carTrack/carTrack';

export class Controll {
  generateControll(race: Race, carTrack: CarTrack): string[] {
    return [carTrack.createInputs(), carTrack.updateInputs(), race.generateButtons()];
  }
}
