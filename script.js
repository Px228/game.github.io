// const character = document.getElementById("character");

// // Начальное положение персонажа
// let posX = 0;
// let posY = 0;

// // Направление движения по умолчанию
// let direction = "right";

// // Функция для изменения направления
// function changeDirection(newDirection) {
//   character.classList.remove(direction);
//   direction = newDirection;
//   character.classList.add(direction);
// }

// // Функция для перемещения персонажа
// function moveCharacter() {
//   switch (direction) {
//     case "left":
//       posX -= 10;
//       break;
//     case "right":
//       posX += 10;
//       break;
//     case "up":
//       posY -= 10;
//       break;
//     case "down":
//       posY += 10;
//       break;
//   }

//   // Применение изменений положения персонажа
//   character.style.left = posX + "px";
//   character.style.top = posY + "px";
// }

// // Запуск перемещения через интервал
// setInterval(moveCharacter, 100); // Перемещение каждые 100 миллисекунд

// document.addEventListener("keydown", (event) => {
//   switch (event.key) {
//     case "ArrowLeft":
//       changeDirection("left");
//       break;
//     case "ArrowRight":
//       changeDirection("right");
//       break;
//     case "ArrowUp":
//       changeDirection("up");
//       break;
//     case "ArrowDown":
//       changeDirection("down");
//       break;
//   }
// });




// const character = document.getElementById("character");
// const camera = document.getElementById("camera");

// // Начальное положение персонажа
// let posX = 0;
// let posY = 0;

// // Начальное положение камеры
// let cameraX = 0;
// let cameraY = 0;

// // Размер окна камеры
// const cameraWidth = camera.clientWidth;
// const cameraHeight = camera.clientHeight;

// // Направление движения по умолчанию
// let direction = "right";

// // Функция для изменения направления
// function changeDirection(newDirection) {
//   character.classList.remove(direction);
//   direction = newDirection;
//   character.classList.add(direction);
// }

// // Функция для перемещения персонажа
// function moveCharacter() {
//   switch (direction) {
//     case "left":
//       posX -= 10;
//       break;
//     case "right":
//       posX += 10;
//       break;
//     case "up":
//       posY -= 10;
//       break;
//     case "down":
//       posY += 10;
//       break;
//   }

//   // Позиция камеры следует за персонажем с отступом
//   cameraX = posX - cameraWidth / 2 + character.clientWidth / 2;
//   cameraY = posY - cameraHeight / 2 + character.clientHeight / 2;

//   // Применение изменений положения персонажа и камеры
//   character.style.left = posX + "px";
//   character.style.top = posY + "px";
//   camera.style.left = cameraX + "px";
//   camera.style.top = cameraY + "px";
// }

// // Запуск перемещения через интервал
// setInterval(moveCharacter, 100); // Перемещение каждые 100 миллисекунд

// document.addEventListener("keydown", (event) => {
//   switch (event.key) {
//     case "ArrowLeft":
//       changeDirection("left");
//       break;
//     case "ArrowRight":
//       changeDirection("right");
//       break;
//     case "ArrowUp":
//       changeDirection("up");
//       break;
//     case "ArrowDown":
//       changeDirection("down");
//       break;
//   }
// });


const character = document.getElementById("character");
const camera = document.getElementById("camera");

// Размеры карты
const mapWidth = 1000;
const mapHeight = 1000;

// Получение случайного числа в заданном диапазоне
function getRandomInRange(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

// Начальное положение персонажа (рандомные координаты)
let posX = getRandomInRange(0, mapWidth - character.clientWidth);
let posY = getRandomInRange(0, mapHeight - character.clientHeight);

// Направление движения по умолчанию
let direction = "up";

// Функция для изменения направления
function changeDirection(newDirection) {
  character.classList.remove(direction);
  direction = newDirection;
  character.classList.add(direction);
}

// Функция для перемещения персонажа
function moveCharacter() {
  let newPosX = posX;
  let newPosY = posY;

  switch (direction) {
    case "left":
      newPosX = Math.max(0, posX - 10);
      break;
    case "right":
      newPosX = Math.min(mapWidth - character.clientWidth, posX + 10);
      break;
    case "up":
      newPosY = Math.max(0, posY - 10);
      break;
    case "down":
      newPosY = Math.min(mapHeight - character.clientHeight, posY + 10);
      break;
  }

  // Проверка на столкновение с "стеной"
  if (checkCollision(newPosX, newPosY)) {
    gameOver();
    return;
  }

  // Применение изменений положения персонажа
  posX = newPosX;
  posY = newPosY;

  // Позиционирование камеры
  const cameraPosX = posX - camera.clientWidth / 2 + character.clientWidth / 2;
  const cameraPosY = posY - camera.clientHeight / 2 + character.clientHeight / 2;
  camera.style.transform = `translate(${-cameraPosX}px, ${-cameraPosY}px)`;

  // Запуск анимации движения персонажа
  character.style.transform = `translate(${posX}px, ${posY}px)`;
}

// Функция для проверки столкновения
function checkCollision(x, y) {
  // Здесь вы можете добавить более сложную логику столкновения с "стенами"
  // Например, если координаты (x, y) находятся в области стены
  return x <= 0 || y <= 0 || x >= mapWidth - character.clientWidth || y >= mapHeight - character.clientHeight;
}
let gameInterval; // Переменная для хранения интервала игры

// Функция для запуска игры
function startGame() {
  gameInterval = setInterval(moveCharacter, 100);
}

// Функция для окончания игры и показа окна
function gameOver() {
  clearInterval(gameInterval); // Остановить интервал игры
  
  // Получение ссылок на элементы окон и кнопки
const gameOverModal = document.getElementById("gameOverModal");
const backButton = document.getElementById("backButton");
const mainMenuModal = document.getElementById("mainMenuModal");
const playButton = document.getElementById("playButton");


  
  // Показать окно
  gameOverModal.style.display = "flex";
  
  // Обработчик кнопки "Назад"
  backButton.addEventListener("click", () => {
    // Скрыть окно, перезапустить игру и запустить интервал заново
    gameOverModal.style.display = "none";
    posX = getRandomInRange(0, mapWidth - character.clientWidth);
    posY = getRandomInRange(0, mapHeight - character.clientHeight);
    startGame();
  });
  
  // Генерация новых случайных координат персонажа
  posX = getRandomInRange(0, mapWidth - character.clientWidth);
  posY = getRandomInRange(0, mapHeight - character.clientHeight);
  
  // ...
  
  // Сброс позиционирования камеры
  const cameraPosX = posX - camera.clientWidth / 2 + character.clientWidth / 2;
  const cameraPosY = posY - camera.clientHeight / 2 + character.clientHeight / 2;
  camera.style.transform = `translate(${-cameraPosX}px, ${-cameraPosY}px)`;
  
  // Сброс анимации движения персонажа
  character.style.transform = `translate(${posX}px, ${posY}px)`;
}

// Запуск игры
startGame();

document.addEventListener("keydown", (event) => {
  switch (event.key) {
    case "ArrowLeft":
      changeDirection("left");
      break;
    case "ArrowRight":
      changeDirection("right");
      break;
    case "ArrowUp":
      changeDirection("up");
      break;
    case "ArrowDown":
      changeDirection("down");
      break;
  }
});