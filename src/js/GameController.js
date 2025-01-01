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
    this.gamePlay.addCellClickListener(this.logicMoveGoblin.bind(this));

    this.startGoblinMovement();

    this.goblin.addEventListener('click', () => {
      this.logicMoveGoblin();
      this.gamePlay.incrementHit();
      this.updateResult();

      // Останавливаем предыдущий таймер, если он существует
      this.startGoblinMovement();
    })
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