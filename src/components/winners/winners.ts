import { IWinnerWithCars } from '../../types';
import { API } from '../api/api';
import { App } from '../app/app';

import './winners.scss';

export class Winners {
  createTable() {
    return `
    <table class="table">
      <thead>
        <tr class="table__header table__row">
          <th class="table__header">number</th>
          <th class="table__header">car</th>
          <th class="table__header">name</th>
          <th class="table__header">wins</th>
          <th class="table__header">best time</th>
        </tr>
      </thead>
      <tbody class="table__body">

      </tbody>
    </table>
    <div class="pagination">
      <button disabled class="pagination__prev">prev</button>
      <button class="pagination__next">next</button>
    </div>`;
  }

  createRow(obj: IWinnerWithCars, index: number, app: App) {
    const { color, name, wins, time } = obj;
    return `
      <td class="table__ceil">${10 * (app.winnersPage - 1) + index + 1}</td>
      <td class="table__ceil">
        <svg><use xlink:href="./sprite.svg#car" fill="${color}"></use></svg>
      </td>
      <td class="table__ceil">${name}</td>
      <td class="table__ceil">${wins}</td>
      <td class="table__ceil">${time}</td>
    `;
  }

  createTr(winnerObj: IWinnerWithCars, index: number, app: App) {
    const tr = document.createElement('tr');
    tr.classList.add('table__row');
    tr.innerHTML = this.createRow(winnerObj, index, app);
    return tr;
  }

  isClickablePagination(app: App, api: API) {
    const btnPrev = document.querySelector('.pagination__prev') as HTMLButtonElement;
    const btnNext = document.querySelector('.pagination__next') as HTMLButtonElement;
    app.winnersPage === 1 ? (btnPrev.disabled = true) : (btnPrev.disabled = false);
    (async () => {
      const amount = await api.getWinnersAmount();
      const pages = Math.ceil(amount / app.winnersOnPage);
      pages > app.winnersPage ? (btnNext.disabled = false) : (btnNext.disabled = true);
    })();
  }
}
