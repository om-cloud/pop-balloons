'use strict'

/* 
CR Daniel:
Great work again! you took this simple game a step up with some extra features! nicely done!
i left some notes in your code.. small stuff 
*/

var gInterval;
var gBalloons = [];
var gCounter = 0;
var gisRunning = false;
var gCountSeconds=60;
var gTime;

function init() {
    gBalloons = [{
            tag: 'ballon1',
            bottom: -30,
            speed: 0.2
        },
        {
            tag: 'ballon2',
            bottom: -30,
            speed: 0.12
        },
        {
            tag: 'ballon3',
            bottom: -30,
            speed: 0.15
        },
        {
            tag: 'ballon4',
            bottom: -30,
            speed: 0.25
        },
    ];
    renderBallons();
}


function renderBallons() {
    var htmlStr = '';
    var elContainer = document.querySelector('.containerBallons');
    for (var i = 0; i < gBalloons.length; i++) {
        htmlStr += '<div class="balloon balloon' + (i + 1) + '" onclick="popBallon(this)"></div>'
        elContainer.innerHTML = htmlStr;
    }
    setBallonsAttributes();
}

function setBallonsAttributes(){
    var marginLeft = 18;
    var balloonsEl = document.querySelectorAll('.balloon'); /// elBalloon (just our convention) 
    for (var i = 0; i < gBalloons.length; i++) {
        if (i != 0) {
            balloonsEl[i].style.marginLeft = (marginLeft * (i + 1) - 4) + 'vw';
        }
        balloonsEl[i].style.backgroundColor = getRandomColor();
        gBalloons[i].speed = getRandomInteger(10, 25) / 100
    }
}


function toggleGame() {
    if (gisRunning) {
        EndGame()
    } else {
        gCounter=0;
        document.querySelector('.counter').innerText='Pops:00'
        reset();
        gisRunning = !gisRunning;
        gCountSeconds=60;
        timer();
        document.querySelector('.messagePopsNumber').innerText='';
    }
}

function EndGame(){
    stopGame();
    gisRunning = !gisRunning;
    stoptimer();
    var message = messagesToUser();
    document.querySelector('.messagePopsNumber').innerText=message;
}

function reset() {
    document.querySelector('.myButton2').innerText = 'Stop Game'
    renderBallons();
    var balloonsEl = document.querySelectorAll('.balloon');
    for (var i = 0; i < balloonsEl.length; i++) {
        clearInterval(gInterval); ///// this line doesn't need to be in a loop.. one time is enough
        balloonsEl[i].classList.remove('hide');
        var balloon = gBalloons[i];
        balloon.bottom = -30;
        balloonsEl[i].style.bottom = balloon.bottom + 'vh'
    }
    gInterval = setInterval(moveBalloons, 1);
}

function stopGame() {
    document.querySelector('.myButton2').innerText = 'Start Game'
    //gisRunning = !gisRunning;
    clearInterval(gInterval);
    renderBallons();
}


function moveBalloons() {

    var balloonsEl = document.querySelectorAll('.balloon');
    for (var i = 0; i < balloonsEl.length; i++) {
        var balloon = gBalloons[i];
        balloon.bottom += balloon.speed;
        balloonsEl[i].style.bottom = balloon.bottom + 'vh'
        if (balloon.bottom >= 135) {
            clearInterval(gInterval);
            reset()
        }
    }
}



function popBallon(balloonEl) {
    if(gisRunning){
    gCounter++;
    document.querySelector('.counter').innerText='Pops:'+ (gCounter>9 ? gCounter :('0'+gCounter))
    balloonEl.classList.add('hide');
    playAudio();
}
}



function playAudio() {
    var audioEl = document.getElementById("myAudio"); /// working with audio can be done straight from JS, without loading it in the HTML file
    audioEl.play();
}

function messagesToUser(){
    if(gCounter<50){
        return 'You Can Do Better, Try Again !'
    }else if(gCounter>=50 && gCounter<75){
        return 'You Did Well !!'
    }else if (gCounter>=75 && gCounter<100){
        return 'Amazing Result Wow !!!'
    }
}

/////////////////////////utils/////////////////////////////////
function getRandomInteger(min, max) {
    return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
}

function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

function timer(){
gTime =setTimeout(()=>{
    timer();
},1000);
gCountSeconds-=1;
if(gCountSeconds===0){
    EndGame();
}
document.querySelector(".Timer").innerText='Timer:'+ (gCountSeconds>9 ?'':'0')+gCountSeconds;
}

function stoptimer(){
clearTimeout(gTime);
}