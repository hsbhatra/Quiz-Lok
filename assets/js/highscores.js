const highScoreList = document.getElementById('high-score-list');
const highScores = JSON.parse(localStorage.getItem('highScores')) || [];

highScoreList.innerHTML = highScores.map(myScore=>{
    return `<li class="high-score>${myScore.name}- ${myScore.score}</li>`;
}).join("");