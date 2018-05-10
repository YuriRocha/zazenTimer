let countdown;
const timerDisplay = document.querySelector('.display__time-left');
const buttons = document.querySelectorAll('[data-time]');
let isPaused = false;
const bell = document.getElementById("bell");




function start(seconds){
    bell.play();
    document.getElementById("stop").disabled = false;
    document.getElementById("stop").style.opacity = "1";
    document.getElementById("pause").disabled = false;
    document.getElementById("pause").style.opacity = "1";
    timer(this.dataset.time);
}


function restart(seconds){
    document.getElementById("stop").disabled = false;
    document.getElementById("stop").style.opacity = "1";
    document.getElementById("pause").disabled = false;
    document.getElementById("pause").style.opacity = "1";
    timer(seconds);
}

function startSubmit(seconds){
    document.getElementById("stop").disabled = false;
    document.getElementById("stop").style.opacity = "1";
    document.getElementById("pause").disabled = false;
    document.getElementById("pause").style.opacity = "1";
    timer(seconds);
}

function timer(seconds){
    clearInterval(countdown);
    const now = Date.now();
    const then = now + seconds * 1000;
    displayTime(seconds);
    
    countdown = setInterval(() =>{
        const secondsLeft = Math.round((then - Date.now()) / 1000);

        if(secondsLeft < 0){
            bell.play();
            clearInterval(countdown);
            document.getElementById("stop").disabled = true;
            document.getElementById("stop").style.opacity = "0";
            document.getElementById("pause").disabled = true;
            document.getElementById("pause").style.opacity = "0";
            return;
        }
        displayTime(secondsLeft);
    }, 1000);
}


function displayTime(seconds){
    const minutes = Math.floor(seconds / 60);
    const remainderSeconds = seconds % 60;
    const display = `${minutes}: ${remainderSeconds < 10 ? '0': ''}${remainderSeconds}`
    document.title = display;
    timerDisplay.textContent = display;
}

function pauseTime(){
    let restart_moment = $('.display__time-left').text();
    let secondsFromMoment = getSecondsFromString(restart_moment);
    if(isPaused){
        $("#pause").text("Pause");
        isPaused = false;
        restart(secondsFromMoment);
        return;
    }
 
    displayTime(secondsFromMoment);
    clearInterval(countdown);
    isPaused = true;
    $("#pause").text("Play");
}

function stopTime(){
    clearInterval(countdown);
    $('.display__time-left').text("0: 00");
    isPaused = false;
    $("#pause").text("Pause");
    document.getElementById("stop").disabled = true;
    document.getElementById("stop").style.opacity = "0";
    document.getElementById("pause").disabled = true;
    document.getElementById("pause").style.opacity = "0";
}

function getSecondsFromString(str){
    let leftArr = [];
    let rightArr = [];
    let isMinute = false;
  
    for(let i = 0; i < str.length; i++){
      if(str[i] === ':'){
        isMinute = true;
      }
      if(!isMinute){
        leftArr.push(str[i]);
      }else{
        rightArr.push(str[i]);
      }
    }
    
    rightArr.shift();
    rightArr.shift();
    
    const leftSeconds = parseInt(leftArr.join('')) * 60;
    const rightSeconds = parseInt(rightArr.join(''));
    const sumSeconds = leftSeconds + rightSeconds;
    
    return sumSeconds;
  }



buttons.forEach(button => button.addEventListener('click', start));
document.customForm.addEventListener('submit', function(e){
    e.preventDefault();
    const mins = this.minutes.value;
    startSubmit(mins * 60)
});

const pause = document.getElementById("pause");
pause.addEventListener('click', pauseTime);

const stop = document.getElementById("stop");
stop.addEventListener('click', stopTime)