 document.addEventListener("DOMContentLoaded", (event) => {
// Seleção de elementos do DOM
const playerAvatar = document.querySelector(".player");
const obstacles = document.querySelectorAll(".obstacle");

// Variáveis de controle
let seconds = 0;
let lastTiming = 0;
let intervalCreated = false;
let gameruning = false;
let proximoObstaculo = null;
let counter = 0;
let score = 0;
let playerLost = false
// Eventos para iniciar o jogo
window.addEventListener("click", () => {
    if (!gameruning && !playerLost) {
        startGame()
    }
    if (!gameruning && playerLost) {
        location.reload()
    }
});

window.addEventListener("keydown", () => {
    if (!gameruning && !playerLost) {
        startGame()
    }
    if (!gameruning && playerLost) {
        location.reload()
    }
});

// Função principal para iniciar o jogo
function startGame() {
    gsap.to(".player", {
        top: "275px",
        duration: 0.4,
        ease: "none",
    });

    setTimeout(() => {
        seconds = 0;
        lastTiming = 0;
        intervalCreated = false;
        counter = 0;

        document.body.classList.add("play");
        window.addEventListener("click", subirPlayer);
        window.addEventListener("keydown", subirPlayer);
        gameruning = true;

        document.querySelector(".game-over").style.display = "none";
    }, 600);
}

// Atualização do estado do jogo
setInterval(() => {
    if (!gameruning) {
        document.body.classList.remove("play");
        window.removeEventListener("click", subirPlayer);
        window.removeEventListener("keydown", subirPlayer);
    }
}, 50);

// Contador de tempo do jogo
const timingInterval = setInterval(() => {
    if (gameruning) {
        seconds += 100;
    }
}, 100);

// Função para fazer o player "subir"
function subirPlayer() {
    lastTiming = seconds;

    const topValue = playerAvatar.computedStyleMap().get("top").value;

    if (topValue > -50) {
        gsap.to(".player", {
            rotation: -35,
            top: `${topValue - 50}px`,
            duration: 0.1,
            ease: "none",
        });
    }
}

// Aplicação da gravidade ao player
const gravityInterval = setInterval(() => {
    if (gameruning) {
        const topValue = playerAvatar.computedStyleMap().get("top").value;

        if (seconds - lastTiming > 100 && topValue < 530) {
            gsap.to(".player", {
                rotation: 50,
                top: `${topValue + 15}px`,
                duration: 0.1,
                ease: "none",
            });
        }

        if (topValue > 530) {
            gameruning = false;
            playerLost = true
            document.querySelector(".game-over").style.display = "block";
        }
    }
}, 50);

// Detecção de obstáculos
const obstacleInterval = setInterval(() => {
    if (gameruning) {
        let values = [];
        obstacles.forEach((element) => {
            element.classList.remove("vermelho");
            values.push(Math.floor(element.computedStyleMap().get("left").value));
        });

        for (let value of values) {
            if (value < -24 && value > -40) {
                proximoObstaculo = obstacles[values.indexOf(value)];
                break;
            } else {
                proximoObstaculo = null;
            }
        }
    }
}, 500);

// Verificação de colisões e progressão do jogo
const progressInterval = setInterval(() => {
    if (gameruning && proximoObstaculo != null) {
        let playerPosition = playerAvatar.computedStyleMap().get("top").value;
        let upperHeight = proximoObstaculo.children[0].computedStyleMap().get("height").value;
        let lowerHeight = proximoObstaculo.children[1].computedStyleMap().get("height").value;
        let obstaclePosition = proximoObstaculo.computedStyleMap().get("left").value;

        if (!(playerPosition + 10 > upperHeight && 530 - playerPosition > lowerHeight)) {
            document.querySelector(".game-over").style.display = "block";
            gameruning = false;
            playerLost = true
            gsap.to(".player", {
                rotation: 0,
                top: "500px",
                duration: 1,
                ease: "bounce",
            });
        }
    }
}, 50);

// Criação dos obstáculos aleatórios
function createObstacles() {
    obstacles.forEach((element) => {
        let translateValue = Math.floor(Math.random() * 300);

        element.children[0].style.height = `${translateValue}px`;
        element.children[1].style.height = `${440 - translateValue}px`;
    });
}

// Inicialização dos obstáculos
createObstacles();
 });
