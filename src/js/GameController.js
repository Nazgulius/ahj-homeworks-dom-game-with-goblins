export default class GameController {
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
    //const goblin = document.querySelector('.goblin'); // находим гоблина 
    this.gamePlay.addCellClickListener(this.logicMoveGoblin.bind(this));

    this.goblin.addEventListener('click', () => {
      this.logicMoveGoblin();
      this.gamePlay.incrementHit();
      this.updateResult();
    })

    // обработчик случайных перемещений
    let timerId = setInterval(() => {
      this.logicMoveGoblin();
      this.gamePlay.incrementMiss();
      this.updateResult();

      // логика прекращения игры
      if (this.gamePlay.countMiss >= 5) {
        clearInterval(timerId);
        alert('Game Over');
      }
    }, 1000);


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