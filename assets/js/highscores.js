const highScoreList = document.getElementById('high-score-list');
const highScores = JSON.parse(localStorage.getItem('highScores')) || [];

highScoreList.innerText = highScores.map(myScore=>{
    return `${myScore.name}- ${myScore.score}`;
}).join("\n");