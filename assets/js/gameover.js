const username = document.getElementById('username');
const saveScoreBtn = document.getElementById('save-score-btn');
const finalScore = document.getElementById('final-score');
const mostRecentScore = localStorage.getItem('mostRecentScore');
const highScores = JSON.parse(localStorage.getItem("highScores")) || [];


const MAX_HIGH_SCORE = 5;



finalScore.innerText = mostRecentScore;

username.addEventListener('keyup', () =>{
    // console.log(username.value);
    saveScoreBtn.disabled = !username.value;
});


saveHighScore = (e) => {
    
    e.preventDefault();

    const myScore = {
        score: mostRecentScore,
        // score: Math.floor(Math.random() * 100),
        name: username.value,
        // log_in: console.log(this.mostRecentScore)
    };

    // for (i=0; i < highScores.length; i++){
    //     if (highScores[i].name == myScore.name) {
    //         if (highScores[i].score < mostRecentScore) {
    //             highScores[i] = myScore;
    //         }
    //     }
    //     highScores.push(myScore);
    // }
    
    highScores.push(myScore);
    highScores.sort((a,b) => b.score - a.score);
    // .sort():
    // This is a method that organizes or arranges the items in your list.
    // (a, b) => b.score - a.score:
    // This part tells the .sort() method how to arrange the items:
    // a and b are just temporary names for two items in your list.
    // b.score - a.score compares the scores of these two items.
    // If the result is a positive number, it means b has a higher score than a, so b should come before a.
    // If the result is negative, it means a has a higher score, so a should come before b.
    
    highScores.splice(MAX_HIGH_SCORE);

    // console.log(highScores);

    localStorage.setItem("highScores", JSON.stringify(highScores));
    window.location.assign("../../index.html");
    // window.location.assign("/");
};

