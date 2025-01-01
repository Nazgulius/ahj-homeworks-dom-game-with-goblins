import img from '../img/goblin.png';
import GameController from './GameController';

export default class GamePlay {
  constructor() {
    this.container = null;
    this.img = img;
    this.cellClickListeners = [];
    this.countHit = 0;
    this.countMiss = 0;
  }

  bindToDOM(container) {
    if (!(container instanceof HTMLElement)) {
      throw new Error('container is not HTMLElement');
    }
    this.container = container;
  }

  drawUi() {
    document.addEventListener('DOMContentLoaded', () => {
      const table = document.createElement('table'); // создаётся таблицу 
      table.className = "table";
      document.body.append(table);

      // создаём строки и столбцы таблицы 
      for (let i = 0; i < 4; i++) {
        const tr = document.createElement('tr');
        tr.className = "row";
        table.append(tr);

        for (let i = 0; i < 4; i++) {
          const td = document.createElement('td');
          td.className = "col";
          tr.append(td);
        }
      }

      const result = document.createElement('p'); // создаётся результат
      result.className = "result";
      document.body.append(result);

      const colAll = document.querySelectorAll('.col'); // находит все col 

      const imgGoblin = document.createElement('img'); // поменять на картинку img 
      imgGoblin.className = "goblin";
      imgGoblin.src = this.img;
      imgGoblin.alt = "goblin";
      colAll[0].appendChild(imgGoblin); // устанавливаем гоблина в первую ячейку

      // Теперь создайте экземпляр GameController и вызывайте init  
      const gameCtrl = new GameController(this);
      gameCtrl.init(); // Вызывайте init после создания UI  
    });
  }

  addCellClickListener(callback) {
    this.cellClickListeners.push(callback);
  }

  onCellClick(event) {
    const index = this.cells.indexOf(event.currentTarget);
    this.cellClickListeners.forEach(o => o.call(null, index));
  }

  // Метод для увеличения количества попаданий  
  incrementHit() {  
    this.countHit += 1;  
  }  

  // Метод для увеличения количества промахов  
  incrementMiss() {  
    this.countMiss += 1;  
  }  
}