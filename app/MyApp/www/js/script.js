const startButton = document.getElementById("startButton");
const gameContainer = document.getElementById("gameContainer");
const character = document.getElementById("character");
let characterX = 0;
let characterY = 0;
let score = 0; // Изначально счет равен 0
const scoreElement = document.getElementById("score");
let balls = [];
const miniMap = document.getElementById("miniMap");
const miniCharacter = document.createElement("div");
miniCharacter.className = "mini-character";
miniMap.appendChild(miniCharacter);

// При загрузке страницы, загружаем сохраненные данные и обновляем отображение
window.addEventListener("load", () => {
  loadData();
  updateScoreDisplay(); // Обновите отображение счетчика
  updateSpeedLevelDisplay();
  updateCameraPosition();
});

function updateMiniMap() {
  const miniMapWidth = miniMap.offsetWidth;
  const miniMapHeight = miniMap.offsetHeight;

  const characterXOnMiniMap = (characterX / containerWidth) * miniMapWidth;
  const characterYOnMiniMap = (characterY / containerHeight) * miniMapHeight;

  miniCharacter.style.left = characterXOnMiniMap + "px";
  miniCharacter.style.top = characterYOnMiniMap + "px";
}

const miniBallsContainer = document.getElementById("miniBalls");

function updateMiniBalls() {
  miniBallsContainer.innerHTML = ""; // Очищаем контейнер перед обновлением

  balls.forEach(ball => {
    const miniBall = document.createElement("div");
    miniBall.className = "mini-ball";
    miniBall.style.left = (ball.offsetLeft / containerWidth) * 100 + "%";
    miniBall.style.top = (ball.offsetTop / containerHeight) * 100 + "%";
    miniBallsContainer.appendChild(miniBall);
  });
}

// ...

const maxSpeedLevel = 2; // Максимальный уровень скорости
let speedLevel = 1; // Изначальный уровень скорости
const speedUpgradeCost = 10; // Стоимость улучшения скорости

const upgradeSpeedButton = document.getElementById("upgradeSpeedButton");
const speedLevelElement = document.getElementById("speedLevel");

upgradeSpeedButton.addEventListener("click", upgradeSpeed);

function upgradeSpeed() {
  if (speedLevel < maxSpeedLevel && score >= speedUpgradeCost) {
    score -= speedUpgradeCost; // Уменьшаем количество кружков
    speedLevel++; // Увеличиваем уровень скорости
    speedLevelElement.textContent = speedLevel; // Обновляем текст уровня
    collectedBallsCount.textContent = score; // Обновляем количество кружков
  }
}

const camera = {
  x: 0,
  y: 0,
  width: gameContainer.offsetWidth,
  height: gameContainer.offsetHeight
};

const containerWidth = 5000; // Ширина игровой карты
const containerHeight = 5000; // Высота игровой карты

const characterWidth = character.offsetWidth;
const characterHeight = character.offsetHeight;

startButton.addEventListener("click", startGame);

function startGame() {
  startButton.classList.add("hidden");
  gameContainer.classList.remove("hidden");
  window.addEventListener("keydown", moveCharacter);

  // Спавн игрока случайным образом
  spawnCharacter();

  // Спавн шариков
  spawnBalls();

  // Обновляем положение камеры
  updateCameraPosition();
  // Call the function to enable joystick control
  enableJoystickControl();
}
let isMovingUp = false;
let isMovingDown = false;
let isMovingLeft = false;
let isMovingRight = false;

window.addEventListener("keydown", (event) => {
  switch (event.key) {
    case "ArrowUp":
      isMovingUp = true;
      break;
    case "ArrowDown":
      isMovingDown = true;
      break;
    case "ArrowLeft":
      isMovingLeft = true;
      break;
    case "ArrowRight":
      isMovingRight = true;
      break;
  }
});

window.addEventListener("keyup", (event) => {
  switch (event.key) {
    case "ArrowUp":
      isMovingUp = false;
      break;
    case "ArrowDown":
      isMovingDown = false;
      break;
    case "ArrowLeft":
      isMovingLeft = false;
      break;
    case "ArrowRight":
      isMovingRight = false;
      break;
  }
});

function moveCharacter() {
  // Получение базового значения шага в зависимости от уровня скорости
  const baseStep = 10;
  const adjustedStep = baseStep * speedLevel; // Используйте актуальный уровень скорости

  if (isMovingUp) {
    characterY -= adjustedStep;
  }
  if (isMovingDown) {
    characterY += adjustedStep;
  }
  if (isMovingLeft) {
    characterX -= adjustedStep;
  }
  if (isMovingRight) {
    characterX += adjustedStep;
  }

  // Проверяем границы карты
  characterX = Math.max(0, Math.min(containerWidth - characterWidth, characterX));
  characterY = Math.max(0, Math.min(containerHeight - characterHeight, characterY));

  updateCharacterPosition();
  updateCameraPosition();
  checkCollision();
} 


// ...

// Подписываемся на события клавиатуры для управления игроком
window.addEventListener("keydown", (event) => {
  switch (event.key) {
    case "ArrowUp":
      isMovingUp = true;
      break;
    case "ArrowDown":
      isMovingDown = true;
      break;
    case "ArrowLeft":
      isMovingLeft = true;
      break;
    case "ArrowRight":
      isMovingRight = true;
      break;
  }
});

window.addEventListener("keyup", (event) => {
  switch (event.key) {
    case "ArrowUp":
      isMovingUp = false;
      break;
    case "ArrowDown":
      isMovingDown = false;
      break;
    case "ArrowLeft":
      isMovingLeft = false;
      break;
    case "ArrowRight":
      isMovingRight = false;
      break;
  }
});

// ...





function spawnCharacter() {
  characterX = Math.floor(Math.random() * (containerWidth - 50));
  characterY = Math.floor(Math.random() * (containerHeight - 50));

  updateCharacterPosition();
}

function updateCharacterPosition() {
  character.style.left = characterX + "px";
  character.style.top = characterY + "px";
}

function updateCameraPosition() {
  // Центрируем камеру на игроке
  camera.x = characterX - camera.width / 2 + character.offsetWidth / 2;
  camera.y = characterY - camera.height / 2 + character.offsetHeight / 2;

  if (camera.x < 0) {
    camera.x = 0;
  }
  if (camera.y < 0) {
    camera.y = 0;
  }

  gameContainer.style.transform = `translate(-${camera.x}px, -${camera.y}px)`;

  updateMiniMap();
}

function spawnBalls() {
  const numberOfBalls = 500;

  for (let i = 0; i < numberOfBalls; i++) {
    const ball = document.createElement("div");
    ball.className = "ball";
    gameContainer.appendChild(ball);

    const ballX = Math.floor(Math.random() * (containerWidth - 30));
    const ballY = Math.floor(Math.random() * (containerHeight - 30));

    // Генерируем случайный цвет для шарика
    const randomColor = getRandomColor();
    ball.style.backgroundColor = randomColor;

    ball.style.left = ballX + "px";
    ball.style.top = ballY + "px";

    balls.push(ball);
  }
}

// Генерация случайного цвета в формате #RRGGBB
function getRandomColor() {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

function checkCollision() {
  const playerRect = character.getBoundingClientRect();

  balls.forEach((ball, index) => {
    const ballRect = ball.getBoundingClientRect();

    if (
      playerRect.left < ballRect.right &&
      playerRect.right > ballRect.left &&
      playerRect.top < ballRect.bottom &&
      playerRect.bottom > ballRect.top
    ) {
      gameContainer.removeChild(ball);
      balls.splice(index, 1);
      spawnBall(ball);
      increaseScore(); // Увеличиваем счетчик при сборе кружка
    }
  });
}
function increaseScore() {
  score++; // Увеличиваем счет
  scoreElement.textContent = score; // Обновляем текст счетчика на экране
  collectedBallsCount.textContent = score; // Обновляем текст счетчика в окне магазина
}

const shopButton = document.getElementById("shopButton");
const shopModal = document.getElementById("shopModal");
const closeModal = document.getElementById("closeModal");

shopButton.addEventListener("click", openShopModal);
closeModal.addEventListener("click", closeShopModal);

// При открытии окна магазина, обновите счетчик внутри окна
function openShopModal() {
  shopModal.style.display = "block";
  collectedBallsCount.textContent = score;

  updateSpeedLevelDisplay(); // Проверяем и обновляем состояние и стили кнопки
}

const pauseButton = document.getElementById("pauseButton");
const pauseModal = document.getElementById("pauseModal");
const continueButton = document.getElementById("continueButton");
const settingsButton = document.getElementById("settingsButton");

pauseButton.addEventListener("click", openPauseModal);
continueButton.addEventListener("click", closePauseModal);
settingsButton.addEventListener("click", openSettings);

function openPauseModal() {
  pauseModal.style.display = "flex";
}

function closePauseModal() {
  pauseModal.style.display = "none";
}

function openSettings() {
  // Display the settings modal
  settingsModal.style.display = "block";

  // Load and set the current control setting
  const controlType = localStorage.getItem("controlType");
  if (controlType === "joystick") {
    document.querySelector("input[value='joystick']").checked = true;
  } else if (controlType === "keyboard") {
    document.querySelector("input[value='keyboard']").checked = true;
  }

  // Add event listener to control setting radios
  const controlRadios = document.querySelectorAll("input[name='controlType']");
  controlRadios.forEach(radio => {
    radio.addEventListener("change", handleControlChange);
  });
}

// ...

// const settingsButton = document.getElementById("settingsButton");
const settingsModal = document.getElementById("settingsModal");
const closeSettingsButton = document.getElementById("closeSettings");

settingsButton.addEventListener("click", openSettings);
closeSettingsButton.addEventListener("click", closeSettingsModal);

function openSettings() {
  // Close the pause modal if it's open
  pauseModal.style.display = "none";
  
  settingsModal.style.display = "block";
  // ... (rest of the code)
}

function closeSettingsModal() {
  settingsModal.style.display = "none";
}

// ...


function handleControlChange(event) {
  const selectedControlType = event.target.value;

  // Save the selected control type to localStorage
  localStorage.setItem("controlType", selectedControlType);

  // Update the control method based on selection
  if (selectedControlType === "joystick") {
    enableJoystickControl();
  } else if (selectedControlType === "keyboard") {
    enableKeyboardControl();
  }

  // Close the settings modal
  settingsModal.style.display = "none";
}
function enableJoystickControl() {
  const joystick = document.querySelector(".joystick");
  const stick = document.querySelector(".stick");

  let isMoving = false; // Flag to track joystick movement
  let stickX = 0;
  let stickY = 0;

  stick.addEventListener("mousedown", handleTouchStart);
  document.addEventListener("mousemove", handleTouchMove);
  document.addEventListener("mouseup", handleTouchEnd);

  // Event handler for touch start
  function handleTouchStart(event) {
    event.preventDefault();
    isMoving = true;
  }

  // Event handler for touch move
  function handleTouchMove(event) {
    if (!isMoving) return;
    event.preventDefault();

    const joystickRect = joystick.getBoundingClientRect();
    stickX = event.clientX - joystickRect.left - stick.offsetWidth / 2;
    stickY = event.clientY - joystickRect.top - stick.offsetHeight / 2;
    updateStickPosition();
  }

  // Event handler for touch end
  function handleTouchEnd(event) {
    isMoving = false;
    stickX = 0;
    stickY = 0;
    updateStickPosition();
  }

  // Function to update stick position and move the character
  function updateStickPosition() {
    const maxDistance = joystick.offsetWidth / 2 - stick.offsetWidth / 2;
    const distance = Math.min(Math.sqrt(stickX ** 2 + stickY ** 2), maxDistance);
    const angle = Math.atan2(stickY, stickX);

    const offsetX = distance * Math.cos(angle);
    const offsetY = distance * Math.sin(angle);

    stick.style.transform = `translate(${offsetX}px, ${offsetY}px)`;

    moveCharacter(offsetX, offsetY); // Call the character movement function
  }

  // ...

  // Function for moving the character based on joystick input
  function moveCharacter(offsetX, offsetY) {
    const step = 10;

    if (offsetX > 0) {
      characterX += step;
    } else if (offsetX < 0) {
      characterX -= step;
    }

    if (offsetY > 0) {
      characterY += step;
    } else if (offsetY < 0) {
      characterY -= step;
    }

    // Check map boundaries
    characterX = Math.max(0, Math.min(containerWidth - characterWidth, characterX));
    characterY = Math.max(0, Math.min(containerHeight - characterHeight, characterY));

    updateCharacterPosition();
    updateCameraPosition();
    checkCollision();
  }
}

function enableKeyboardControl() {
  // Adjust your game's logic for enabling keyboard control
  // For example, listen to keyboard events and handle character movements.
  let isMovingUp = false;
  let isMovingDown = false;
  let isMovingLeft = false;
  let isMovingRight = false;

  window.addEventListener("keydown", (event) => {
    switch (event.key) {
      case "ArrowUp":
        isMovingUp = true;
        break;
      case "ArrowDown":
        isMovingDown = true;
        break;
      case "ArrowLeft":
        isMovingLeft = true;
        break;
      case "ArrowRight":
        isMovingRight = true;
        break;
    }
  });

  window.addEventListener("keyup", (event) => {
    switch (event.key) {
      case "ArrowUp":
        isMovingUp = false;
        break;
      case "ArrowDown":
        isMovingDown = false;
        break;
      case "ArrowLeft":
        isMovingLeft = false;
        break;
      case "ArrowRight":
        isMovingRight = false;
        break;
    }
  });

  function moveCharacter() {
    // Получение базового значения шага в зависимости от уровня скорости
    const baseStep = 10;
    const adjustedStep = baseStep * speedLevel; // Используйте актуальный уровень скорости

    if (isMovingUp) {
      characterY -= adjustedStep;
    }
    if (isMovingDown) {
      characterY += adjustedStep;
    }
    if (isMovingLeft) {
      characterX -= adjustedStep;
    }
    if (isMovingRight) {
      characterX += adjustedStep;
    }

    // Проверяем границы карты
    characterX = Math.max(0, Math.min(containerWidth - characterWidth, characterX));
    characterY = Math.max(0, Math.min(containerHeight - characterHeight, characterY));

    updateCharacterPosition();
    updateCameraPosition();
    checkCollision();
  } 
}



function closeShopModal() {
  shopModal.style.display = "none";
}


function spawnBall(ball) {
  const ballX = Math.floor(Math.random() * (containerWidth - 30));
  const ballY = Math.floor(Math.random() * (containerHeight - 30));

  ball.style.left = ballX + "px";
  ball.style.top = ballY + "px";

  gameContainer.appendChild(ball);
  balls.push(ball);
}

function updateSpeedLevelDisplay() {
  speedLevelElement.textContent = speedLevel;

  // Проверяем, достиг ли игрок максимального уровня скорости
  if (speedLevel === maxSpeedLevel) {
    upgradeSpeedButton.disabled = true; // Делаем кнопку неактивной
    upgradeSpeedButton.style.display = "none"; // Скрываем кнопку
  } else {
    upgradeSpeedButton.disabled = false; // Включаем кнопку
    upgradeSpeedButton.style.display = "block"; // Отображаем кнопку
  }
}






// При загрузке страницы, загружаем сохраненные данные и обновляем отображение
window.addEventListener("load", () => {
  loadData();
  updateScoreDisplay(); // Обновите отображение счетчика
  updateSpeedLevelDisplay();
  updateCameraPosition();
});

// ...

// Функция для сохранения данных в localStorage
function saveData() {
  localStorage.setItem("score", score);
  localStorage.setItem("speedLevel", speedLevel);
}

// Функция для загрузки данных из localStorage
function loadData() {
  score = parseInt(localStorage.getItem("score")) || 0;
  speedLevel = parseInt(localStorage.getItem("speedLevel")) || 1;
  
  updateScoreDisplay(); // Обновите отображение счетчика
  updateSpeedLevelDisplay();
}

// При изменении данных, вызываем функцию сохранения
window.addEventListener("beforeunload", saveData);

// localStorage.clear();

startButton.addEventListener("click", startGame);