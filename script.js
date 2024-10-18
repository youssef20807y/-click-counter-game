let score = 0;
let timer = 10;
let timerInterval;
let highScores = JSON.parse(localStorage.getItem('highScores')) || [];

document.getElementById('startButton').addEventListener('click', startGame);
document.getElementById('clickButton').addEventListener('click', incrementScore);
document.getElementById('submitNameButton').addEventListener('click', submitName);

function startGame() {
    score = 0;
    timer = 10;
    document.getElementById('score').innerText = `Click Count: ${score}`;
    document.getElementById('timer').innerText = `Time Left: ${timer}`;
    document.getElementById('startButton').classList.add('hidden');
    document.getElementById('clickButton').classList.remove('hidden');
    
    timerInterval = setInterval(updateTimer, 1000);
}

function incrementScore() {
    if (timer > 0) {
        score++;
        document.getElementById('score').innerText = `Click Count: ${score}`;
    }
}

function updateTimer() {
    if (timer > 0) {
        timer--;
        document.getElementById('timer').innerText = `Time Left: ${timer}`;
    } else {
        clearInterval(timerInterval);
        endGame();
    }
}

function endGame() {
    document.getElementById('clickButton').classList.add('hidden');
    document.getElementById('startButton').innerText = 'Play Again';
    document.getElementById('startButton').classList.remove('hidden');
    document.getElementById('startButton').style.backgroundColor = '#ff4757'; // تغيير لون الزر
    document.getElementById('startButton').style.color = 'white'; // تغيير لون النص
    showNameInput();
    showHighScores();
}

function showSection(section) {
    const sections = ['gameSection', 'instructionsSection', 'contactSection'];
    sections.forEach(s => {
        document.getElementById(s).classList.add('hidden');
    });
    document.getElementById(section + 'Section').classList.remove('hidden');
    
    if (section === 'game') {
        resetGame();
    }
}

function resetGame() {
    score = 0;
    timer = 10;
    document.getElementById('score').innerText = `Click Count: ${score}`;
    document.getElementById('timer').innerText = `Time Left: ${timer}`;
    document.getElementById('highScoresContainer').classList.add('hidden');
    document.getElementById('nameInputContainer').classList.add('hidden');
    document.getElementById('clickButton').classList.add('hidden');
    document.getElementById('startButton').innerText = 'Start Game';
    clearInterval(timerInterval);
}

function showNameInput() {
    document.getElementById('nameInputContainer').classList.remove('hidden');
}

function submitName() {
    const username = document.getElementById('username').value;
    if (username) {
        highScores.push({ name: username, score: score });
        highScores.sort((a, b) => b.score - a.score);
        localStorage.setItem('highScores', JSON.stringify(highScores));
        document.getElementById('username').value = '';
        document.getElementById('nameInputContainer').classList.add('hidden');
        showHighScores();
    }
}

function showHighScores() {
    const highScoresContainer = document.getElementById('highScoresContainer');
    highScoresContainer.classList.remove('hidden');
    const highScoresList = document.getElementById('highScoresList');
    highScoresList.innerHTML = '';
    for (let i = 0; i < Math.min(10, highScores.length); i++) {
        const li = document.createElement('li');
        li.innerText = `${highScores[i].name}: ${highScores[i].score}`;
        highScoresList.appendChild(li);
    }
}