/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	// The require scope
/******/ 	var __webpack_require__ = {};
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/publicPath */
/******/ 	(() => {
/******/ 		__webpack_require__.p = "";
/******/ 	})();
/******/ 	
/************************************************************************/

;// ./src/img/goblin.png
const goblin_namespaceObject = __webpack_require__.p + "2dbd01ce16c0fa83cb67.png";
;// ./src/js/GameController.js
class GameController {
  constructor(gamePlay) {
    this.gamePlay = gamePlay;
    this.goblin = document.querySelector('.goblin'); // находим гоблина 
    this.result = document.createElement('p'); // создаётся результат  
    this.result.className = "result";
    document.body.append(this.result);
    this.updateResult(); // Инициализируем результат при создании 
  }
  init() {
    if (!this.goblin) {
      console.error("Goblin not found!"); // Это поможет вам отладить  
      return; // Если гоблин не найден, выходим из метода  
    }
    this.gamePlay.addCellClickListener(this.logicMoveGoblin.bind(this));
    this.startGoblinMovement();
    this.goblin.addEventListener('click', () => {
      this.logicMoveGoblin();
      this.gamePlay.incrementHit();
      this.updateResult();

      // Останавливаем предыдущий таймер, если он существует
      this.startGoblinMovement();
    });
  }
  startGoblinMovement() {
    // Останавливаем предыдущий таймер, если он существует  
    if (this.timerId) {
      clearInterval(this.timerId);
    }

    // Запускаем новый таймер  
    this.timerId = setInterval(() => {
      this.logicMoveGoblin();
      this.gamePlay.incrementMiss();
      this.updateResult();

      // Проверка на окончание игры  
      if (this.gamePlay.countMiss >= 5) {
        clearInterval(this.timerId);
        alert('Game Over');
      }
    }, 1000); // время для перемещения
  }
  onHit() {
    this.gamePlay.incrementHit(); // Увеличиваем количество попаданий  
    this.updateResult(); // Обновляем результат на HTML  

    // Сбрасываем таймер при клике  
    this.startGoblinMovement();
  }
  logicMoveGoblin() {
    const colAll = document.querySelectorAll('.col'); // находит все col 

    let currentIndex = Array.from(colAll).indexOf(this.goblin.parentElement);
    let randomIndex;

    // добавляем гоблина в случайное место     
    do {
      randomIndex = Math.floor(Math.random() * colAll.length);
    } while (randomIndex === currentIndex);

    // перемещаем гоблина в новое место  
    colAll[randomIndex].appendChild(this.goblin);
  }
  updateResult() {
    this.result.innerHTML = `Результат:  
      Попал: ${this.gamePlay.countHit}   
      Промах: ${this.gamePlay.countMiss}`;
  }
}
;// ./src/js/GamePlay.js


class GamePlay {
  constructor() {
    this.container = null;
    this.img = goblin_namespaceObject;
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
;// ./src/js/app.js

const gamePlay = new GamePlay();
gamePlay.bindToDOM(document.querySelector('#game-container'));
gamePlay.drawUi();
;// ./src/index.js



// TODO: write your code in app.js
/******/ })()
;