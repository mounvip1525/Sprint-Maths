const splashPage=document.getElementById('splash-page');
const countdownPage=document.getElementById('countdown-page');
const gamePage=document.getElementById('game-page');
const scorePage=document.getElementById('score-page');

const selectionForm=document.getElementById('selection-form');
const selectionContainer=document.querySelectorAll('.selection-container');
const radioContainers=document.querySelectorAll('.radio-container');
const radioInputs=document.querySelectorAll('input');
const bestScores=document.querySelectorAll('.best-score-value');

const countdown=document.querySelector('.countdown')

const questionContainer=document.querySelector('.question-container');

const finalTimeEl=document.querySelector('.total-time');
const baseTimeEl=document.querySelector('.base-time');
const penaltyTimeEl=document.querySelector('.penalty-time');
const playAgainBtn=document.querySelector('.play-again');

let equationsArray=[];
let playerGuessArray=[];
let firstNum=0;
let secondNum=0;
let equationObj={};
let questionAmount=0;
const wrongFormat=[];
let bestScoresArray=[];

//Time
let timer;
let timePlayed=0;
let baseTime=0;
let penaltyTime=0;
let totalTime=0;
let finalTimeDisplay='0.0';

//scroll
let valueY=0;

function showBestScoresToDOM(){
    bestScores.forEach((bestScore,index)=>{
        const bestScoreEl=bestScore;
        bestScoreEl.textContent=`${bestScoresArray[index].bestScore}`;
    });
}
//Retrieve or set data in local storage
function getSavedBestScores(){
    if(localStorage.getItem('bestScores')){
        bestScoresArray=JSON.parse(localStorage.bestScores);
    } else {
        bestScoresArray=[
                {questions: 10, bestScore:finalTimeDisplay},
                {questions: 25, bestScore:finalTimeDisplay},
                {questions: 50, bestScore:finalTimeDisplay},
                {questions: 99, bestScore:finalTimeDisplay},
        ];
        localStorage.setItem('bestScores',JSON.stringify(bestScoresArray));
    }
    showBestScoresToDOM();
}

function updateBestScores(){
    bestScoresArray.forEach((score,index)=>{
        if(questionAmount == score.questions){
            const savedBestScore=bestScoresArray[index].bestScore;
            console.log(savedBestScore)
            if(savedBestScore === 0 || savedBestScore > totalTime){
                bestScoresArray[index].bestScore=finalTimeDisplay;
            }
        }
    });
    showBestScoresToDOM();
    localStorage.setItem('bestScores',JSON.stringify(bestScoresArray));
}

function playAgain(){
    gamePage.addEventListener('click',startTimer);
    scorePage.hidden=true;
    splashPage.hidden=false;
    equationsArray=[];
    playerGuessArray=[];
    valueY=0;
    playAgain.hidden=false;
}

function showScorePage(){
    setTimeout(()=>{
        playAgainBtn.hidden=false;
    },1500);
    gamePage.hidden=true;
    scorePage.hidden=false;
}

function showScoresToDOM(){
    finalTimeDisplay=totalTime.toFixed(1);
    baseTime=timePlayed.toFixed(1);
    penaltyTime=penaltyTime.toFixed(1);
    baseTimeEl.textContent=`Base Time: ${baseTime}s`;
    penaltyTimeEl.textContent=`Penalty: +${penaltyTime}s`;
    finalTimeEl.textContent=`${finalTimeDisplay}`;
    updateBestScores();
    //Scroll to the top of the page so that when next game is played, selected-question is properly placed
    questionContainer.scrollTo({top:0,behavior:'instant'});
    showScorePage();
}

//Stop the timer, Process results and rendering the score page
function checkTime(){
    // console.log(timePlayed);
    if(playerGuessArray.length == questionAmount){
        // console.log('PLayer Guess array',playerGuessArray);
        clearInterval(timer);
        equationsArray.forEach((equation,index)=>{
            if(equation.evaluated===playerGuessArray[index]){
            //No penalty
            } else {
                penaltyTime += 0.5;
            }
        });
        totalTime=timePlayed+penaltyTime;
        // console.log('Time played',timePlayed,'Penalty',penaltyTime,'Total time',totalTime);
        showScoresToDOM();
    }
}

//Increment the timePlayed value
function addTime(){
    timePlayed += 0.1; //Its a game so we need to be accurate so incrementing by 0.1 sec and running it every 100ms
    checkTime();
}

//Start the timer when gamePage is clicked
function startTimer(){
    //Reset Times
    timePlayed=0;
    penaltyTime=0;
    totalTime=0;
    timer=setInterval(addTime,100);
    //To run the timer only once after the first click on game page untill the game ends
    gamePage.removeEventListener('click',startTimer);
}
function select(guessedValue){
    // console.log(playerGuessArray);
   //Every time the button is clicked, scroll the questions by 55 px vertically 
    valueY += 55;
    questionContainer.scroll(0,valueY);
    return guessedValue ? playerGuessArray.push('true') : playerGuessArray.push('false');
}


function showCountdown(){
    splashPage.hidden=true;
    countdownPage.hidden=false;
    countdownStart();
    populateGamePage();
    setTimeout(showGamePage,400);
}

function showGamePage(){
    gamePage.hidden=false;
    countdownPage.hidden=true;
}

function getRandomInt(max){
    return Math.floor(Math.random()*Math.floor(max))
}

function populateGamePage(){
    questionContainer.textContent='';
    const topSpacer=document.createElement('div');
    topSpacer.classList.add('height-240');
    const selectedQuestion=document.createElement('div');
    selectedQuestion.classList.add('selected-question');
    questionContainer.append(topSpacer,selectedQuestion);
    createEquations();
    showEquationsToDOM();
    bottomSpacer=document.createElement('div');
    bottomSpacer.classList.add('height-500');
    questionContainer.appendChild(bottomSpacer);
}

function showEquationsToDOM(){
    equationsArray.forEach(equation=>{
        const question=document.createElement('div');
        question.classList.add('question');
        const questionText=document.createElement('h3');
        questionText.textContent=equation.value;
        question.appendChild(questionText);
        questionContainer.appendChild(question);
    });
}

function createEquations(){
    const correctQuestions=getRandomInt(questionAmount);
    const wrongQuestions=questionAmount-correctQuestions;
    // console.log('No. of correct questions',correctQuestions);
    // console.log('No. of wrong questions',wrongQuestions);

    //Generating correct equations
    for(i=0;i<correctQuestions;i++){
        firstNum=getRandomInt(15);
        secondNum=getRandomInt(15);
        const correctResult=firstNum*secondNum;
        const equation=`${firstNum} x ${secondNum} = ${correctResult}`;
        equationObj={
            value:equation,
            evaluated:'true'
        }
        equationsArray.push(equationObj);
    }

    //Genterating wrong equations
    for(i=0;i<wrongQuestions;i++){
        firstNum=getRandomInt(15);
        secondNum=getRandomInt(15);
        const correctResult=firstNum*secondNum;
        wrongFormat[0]=`${firstNum+2} x ${secondNum} = ${correctResult}`;
        wrongFormat[1]=`${firstNum} x ${secondNum-3} = ${correctResult}`;
        wrongFormat[2]=`${firstNum} x ${secondNum} = ${correctResult+1}`;
        const formatChoice=getRandomInt(3);
        const equation=wrongFormat[formatChoice];
        equationObj={
            value:equation,
            evaluated:'false'
        }
        equationsArray.push(equationObj);
    }
    shuffle(equationsArray);
    // console.log('Equations array:',equationsArray);
}

//Display 3,2,1,GO!
function countdownStart(){
    countdown.textContent='3';
    setTimeout(()=>{
        countdown.textContent='2';
    },1000);
    setTimeout(()=>{
        countdown.textContent='1';
    },2000);
    setTimeout(()=>{
        countdown.textContent='GO!';
    },3000);
}

//To retrieve the question amount if its checked
function getRadioValue(){
    let radioValue;
    radioInputs.forEach(radioInput=>{
        if(radioInput.checked){
            radioValue=radioInput.value;
        }
    });
    return radioValue;
}

function selectQuestionAmount(e){
    e.preventDefault();
    questionAmount=getRadioValue();
    // console.log('total question number:',questionAmount);
    //only if a selection is made then countdown has to be shown
    if(questionAmount){
        showCountdown();
    }
}

selectionContainer.forEach(select=>{
    select.addEventListener('click',()=>{
        radioContainers.forEach(item=>{
            item.classList.remove('selected-label');
            if(item.children[1].checked){
                item.classList.add('selected-label');
            }
        });
    });
});
selectionForm.addEventListener('submit',selectQuestionAmount);
gamePage.addEventListener('click',startTimer); 

getSavedBestScores();
