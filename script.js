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
let firstNum=0;
let secondNum=0;
let equationObj={};
const wrongFormat=[];
let questionAmount=0;


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
function showCountdown(){
    splashPage.hidden=true;
    countdownPage.hidden=false;
    countdownStart();
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
    console.log('question number:',questionAmount);
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
