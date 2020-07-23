document.addEventListener("DOMContentLoaded", () => {
  const bird = document.querySelector(".bird");
  const gameDisplay = document.querySelector(".game-container");
  const ground = document.querySelector(".ground");
  const moca = document.querySelector("#moca");
  const moki = document.querySelector("#moki");
  const startScreen = document.querySelector(".start-screen");

  let birdLeft = 220;
  let birdBottom = 100;
  let gravity = 2;
  let gap = 430;
  isGameOver = false;

  var gameTimerId = "";

  moki.addEventListener("click", function () {
    startScreen.style.display = "none";
    gameTimerId = setInterval(startGame, 20);
    generateObstacle();
  });

  moca.addEventListener("click", function () {
    startScreen.style.display = "none";
    bird.style.backgroundImage = "url('moca.png')";
    gameTimerId = setInterval(startGame, 20);
    generateObstacle();
  });

  function startGame() {
    birdBottom -= gravity;
    bird.style.bottom = birdBottom + "px";
    bird.style.left = birdLeft + "px";
  }

  function control() {
    jump();
  }

  function jump() {
    if (birdBottom < 480) birdBottom += 50;
    bird.style.bottom = birdBottom + "px";
    console.log(birdBottom);
  }

  document.addEventListener("click", control);

  function generateObstacle() {
    let obstacleLeft = 500;
    let randomHeight = Math.random() * 60;
    let obstacleBottom = randomHeight;
    const obstacle = document.createElement("div");
    const topObstacle = document.createElement("div");
    if (!isGameOver) obstacle.classList.add("obstacle");
    if (!isGameOver) topObstacle.classList.add("top-obstacle");
    gameDisplay.appendChild(obstacle);
    gameDisplay.appendChild(topObstacle);
    topObstacle.style.left = obstacleLeft + "px";
    obstacle.style.left = obstacleLeft + "px";
    obstacle.style.bottom = obstacleBottom + "px";
    topObstacle.style.bottom = obstacleBottom + gap + "px";

    function moveObstacle() {
      obstacleLeft -= 2;
      obstacle.style.left = obstacleLeft + "px";
      topObstacle.style.left = obstacleLeft + "px";

      if (obstacleLeft === -60) {
        clearInterval(timerId);
        gameDisplay.removeChild(obstacle);
        gameDisplay.removeChild(topObstacle);
      }
      if (
        (obstacleLeft > 200 &&
          obstacleLeft < 266 &&
          birdLeft === 220 &&
          (birdBottom < obstacleBottom + 153 ||
            birdBottom > obstacleBottom + gap - 200)) ||
        birdBottom === 0
      ) {
        gameOver();
        clearInterval(timerId);
      }
    }

    let timerId = setInterval(moveObstacle, 20);
    if (!isGameOver) setTimeout(generateObstacle, 3000);

    console.log(randomHeight);
  }

  function gameOver() {
    clearInterval(gameTimerId);
    console.log("game over");
    isGameOver = true;
    document.removeEventListener("click", control);
  }
});
