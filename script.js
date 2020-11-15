const splashPage=document.getElementById('splash-page');
const countdownPage=document.getElementById('countdown-page');
const gamePage=document.getElementById('game-page');
const scorePage=document.getElementById('score-page');

const selectionForm=document.getElementById('.selection-form');
const radioContainers=document.querySelectorAll('.radio-containers');
const radioInputs=document.querySelectorAll('input');
const bestScores=document.querySelectorAll('.best-score-value');

const countdown=document.querySelector('.countdown')

const questionContainer=document.querySelector('.question-container');

const finalTimeEl=document.querySelector('.final-time');
const baseTimeEl=document.querySelector('.base-time');
const penaltyTimeEl=document.querySelector('.penalty-time');
const playAgainBtn=document.querySelector('.play-again');

let equationsArray=[];
let firstNum=0;
let secondNum=0;
let equationObj={};
const wrongFormat=[];

