const p1 = {
    score : 0,
    button : document.querySelector('#p1Button'),
    display: document.querySelector('#p1Display')
}

const p2 = {
    score : 0,
    button : document.querySelector('#p2Button'),
    display: document.querySelector('#p2Display')
}




const resetButton = document.querySelector('#reset');
const winningScoreSelect = document.querySelector('#playto')

let winningScore = parseInt(winningScoreSelect.value);

let isGameOver = false;


function updateScores(player, opponent){

    if(!isGameOver)
    {
        player.score += 1;

        if(player.score === winningScore)
        {
            isGameOver = true;
            player.display.classList.add("has-text-success");
            opponent.display.classList.add("has-text-danger");
            player.button.disabled = true;
            opponent.button.disabled = true;
        }
        player.display.textContent = player.score;
    }

}

function reset(){
    isGameOver = false;
    for (let p of [p1,p2]){
        p.score = 0;
        p.display.textContent = 0;
        p.display.classList.remove('has-text-success', 'has-text-danger');
        p.button.disabled = false;
    }

    for (let i = 0; i <= 4; i++){
        winningScoreSelect[i].value = 3 + i;
        winningScoreSelect[i].innerText = 3 + i;
    }

    winningScore = parseInt(winningScoreSelect.value);

    selectContainer.classList.remove('is-danger');
    winningScoreSelect.classList.remove("has-background-danger-dark", 'has-text-white', 'has-text-bold')

}


const selectContainer = document.querySelector('.select')
function tie(player, opponent){
    if (player.score === opponent.score && opponent.score === winningScore - 1){
        console.log('Tie Break')
        winningScore ++ ;
        winningScoreSelect.selectedOptions[0].innerText = `Tie-break to ${winningScore}`;
        selectContainer.classList.add('is-danger');
        winningScoreSelect.classList.add("has-background-danger-dark", 'has-text-white','has-text-bold')
    }
}


p1.button.addEventListener('click', ()=>{
   updateScores(p1,p2);
   tie(p1,p2);
})


p2.button.addEventListener('click', ()=>{
    updateScores (p2,p1)
    tie(p2,p1);
})

winningScoreSelect.addEventListener('change', function() {
    winningScore = parseInt((this.value));
    reset();
})


resetButton.addEventListener('click', reset );

    // p1.score = 0;
    // p2.score = 0;
    // p1.display.textContent = '0';
    // p2.display.textContent = '0';                                        // Antigua funcion de reset
    // p1.display.classList.remove ('has-text-success', 'has-text-danger')
    // p2.display.classList.remove ('has-text-success', 'has-text-')
    // p1.button.disabled = false;
    // p2.button.disabled = false;
