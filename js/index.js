
//Practicing the "Revealing Module Pattern"

//Time module that calculates the units of time in h/m/s from milliseconds
var Time = (function (){ 

//object that stores timer state set by "setTimer" below
var timer = {};
  
  //initializes timer to current time object
  function setTimer(session,breakTime){
    var curTime = new Date().getTime();
    timer['now'] = curTime;               
    timer['end'] = session;              // specifices end of session (time in the future)
    timer['break'] = breakTime;         //specifies a break time at some time in the future
    timer['active'] = false;
    timer['break_phase'] = false;
    timer['session_phase'] = false;
  }
  
  function getTimer(){
    return timer;
  }
  
  function getHours(){
    var hours = (timer.end/1000)/(60*60);
    return Math.floor(hours) % 24;
  }
  
  function getMinutes(){
    var minutes = (timer.end/1000)/(60);
    return Math.floor(minutes) % 60;
  }
  
  function getSeconds(){
    var seconds = (timer.end/1000);
    return Math.floor(seconds) % 60;
  }     
  return {
    getHours:getHours,
    getMinutes:getMinutes,
    getSeconds:getSeconds,
    getTimer:getTimer,
    setTimer:setTimer
  };
})();

//Settings module to control the Timer's duration for work and break
var Settings = (function(){
  //private
  var hourToMs = 3600*1000,
  minToMs = 60*1000,
  secToMs = 1000,    
  defHours = 0,
  defSeconds = 0,
  defSession = 25,//25 minutes
  defBreak = 5,   //5 minutes
  set = false;
  
  function isSet(){
    return set;
  }
  //calculate session duration in milliseconds
  function sessionDuration(){
    return (defSeconds*secToMs) + (defSession*minToMs) + (defHours*hourToMs);
  }
  //calculate break duration in milliseconds
  function breakDuration(){
    return defBreak*minToMs;
  }
  //default settings to initialize Timer module with 
  function defSettings(){
      Time.setTimer((defSeconds*secToMs) + (defSession*minToMs) + (defHours*hourToMs),defBreak*minToMs); 
      Time.getTimer().session_phase = true;
      set = true;     //timer is set boolean
      clickHandlers();      

  }
  
  //Handle click events for plus/minus of Break/Work Duration
  function clickHandlers(){
    var settingButtons = document.querySelectorAll('button');   //break/work duration +/- buttons
    settingButtons.forEach(function(current){
       current.onclick = function(){
         if(Time.getTimer().active === false){                  //if the timer isn't currently running
           
           if(current.id === 'break_plus' && defBreak < 25){    //on pressing + for break add 1 minute
              defBreak+=1;
              Time.getTimer().break = defBreak*minToMs;
              Display.updateView('break',defBreak);
           }else if(current.id === 'break_minus' && defBreak > 1){        //on pressing - for break subtract 1 minute
              defBreak-=1;
              Time.getTimer().break = defBreak*minToMs;            
              Display.updateView('break',defBreak);

           }else if(current.id === 'session_plus' && defSession < 100){   //on pressing + for work add 1 minute
              defSession+=1;
              Time.getTimer().end = (defSeconds*secToMs) + (defSession*minToMs) + (defHours*hourToMs);
              Display.updateView('session',defSession);

           }else if(current.id === 'session_minus' && defSession > 1){    //on pressing - for session subtract 1 minute
              defSession-=1;
              Time.getTimer().end = (defSeconds*secToMs) + (defSession*minToMs) + (defHours*hourToMs);
              Display.updateView('session',defSession);              
           }
           
         }
       }
    });
  }
  
  return {
    defSettings:defSettings,
    sessionDuration:sessionDuration,
    breakDuration:breakDuration
  };
})();

//Display module which animates the circular progression bar and the countdown
var Display = (function(){
  
  var displayBreak = document.getElementById('break'),
      displaySession = document.getElementById('session'),
      displayTime = document.getElementById('counter'),
      displayDescription = document.getElementById('description'),
      play = document.getElementById('play'),
      pause = document.getElementById('pause'),
      timer = Time.getTimer(),
      start = timer.end;

  //Initialize default display
  function defDisplay(){
    
    var layer2 = document.getElementById("layer");      //Draw circular progression bar
    var ctx=layer2.getContext("2d");
    ctx.beginPath();
    ctx.arc(200, 200, 170.5,0,2*Math.PI);
    ctx.strokeStyle = "#B71C1C";
    ctx.lineWidth = 10;
    ctx.stroke();
   
   
    play.style.opacity = 1;                            //show play/pause botton
    pause.style.opacity = 1;
    
    
    displayBreak.innerHTML = (timer.break/1000)/60;   //Show default session/break duration 
    displaySession.innerHTML = Time.getMinutes();
    displayTime.innerHTML = formatTime(               //Formatted session timer (center of pomodoro clock)
      Time.getHours(),Time.getMinutes(),Time.getSeconds()
    );
    displayDescription.innerHTML = "Work";
    
    play.onclick = function(){
      if(timer.active === false){                     //if timer isn't running begin counter and show pause button
              showCount();
              play.style.opacity = 0;
              pause.style.opacity = 1;
      }else{                                         //if timer running then stop counter and show play button
        timer.active = false;
        play.style.opacity = 1;
        pause.style.opacity = 0;
      }
    }
  }
  
  //Show user amount of time left for break/session phase
  function showCount(){
   timer.active = true;
    
   var session = setInterval(function(){    //every second update the clock
     
      if(timer.end >= 0 && timer.active === true && timer.session_phase === true){              //As long as timer hasn't expired and it's session phase keep counting timer down
         displayTime.innerHTML = formatTime(Time.getHours(),Time.getMinutes(),Time.getSeconds());
         displayDescription.innerHTML = "Work";
         timerAnimation(timer.end);
         timer.end -= 1000;
         timer.break_phase = false;
         timer.session_phase = true;
        
      }else if(timer.end > 0 && timer.active === false && timer.session_phase === true){      //As long as timer hasn't expired and it's session phase pause the timer
        displayTime.innerHTML = formatTime(Time.getHours(),Time.getMinutes(),Time.getSeconds());
        timer.break_phase = false;
        timer.session_phase = true;
        clearInterval(session);
        return;
        
      }else if(timer.break >= 0 && timer.active === true){                                    //As long as break timer hasn't expired and it's break phase keep counting down

          var seconds = Math.floor((timer.break/1000))%60;
          var minutes =  Math.floor(((timer.break/1000)/60))%60;
          displayTime.innerHTML = formatTime(0,minutes,seconds);
          displayDescription.innerHTML = "Break";
          timerAnimation(timer.break);
          timer.break-=1000;
          timer.break_phase = true;
          timer.session_phase = false;
        
      }else if(timer.break > 0 && timer.active === false){                                    //As long as break timer hasn't expired and it's break phase pause break timer
        var seconds = Math.floor((timer.break/1000))%60;
        var minutes =  Math.floor(((timer.break/1000)/60))%60;
        displayTime.innerHTML = formatTime(0,minutes,seconds);
        timer.break_phase = true;
        timer.session_phase = false;
        clearInterval(session);
        return;
          
      }else{                                                                                //Restart the timer with default settings                                                                                  
          Settings.defSettings();
          defDisplay();
          displayTime.innerHTML = formatTime(Time.getHours(),Time.getMinutes(),Time.getSeconds());
          displayDescription.innerHTML = "Work";
          timer.active = false;
          timer.break_phase = false;
          clearInterval(session);
          return;
      }
    },1000);

  }
  
  //Draws the circular progress bar on a canvas
  function timerAnimation(current){                                                             
    var total,
    timeLeft = current,
    ctx = document.getElementById('my_canvas').getContext('2d'),
    start = 4.72,                                                                                   
    cw = ctx.canvas.width,
    ch = ctx.canvas.height,
    diff,
    formattedTime;    
    if(timer.break_phase === false && timer.session_phase === true){                      //if it's a session phase set variables to appropriate session durations
        total = Settings.sessionDuration();
        formattedTime = formatTime(Time.getHours(),Time.getMinutes(),Time.getSeconds());
        ctx.strokeStyle = "#FFFFFF";
    }else if(timer.break_phase === true && timer.session_phase === false){                //if it's a break phase set variables to appropriate break durations
        total = Settings.breakDuration();
        var breakMin = Math.floor((timer.break/1000)/60) % 60;
        var breakSec = (timer.break/1000) % 60;
        formattedTime = formatTime(0,breakMin,breakSec);
        ctx.strokeStyle = "#FFFFFF";
    }

    diff = (((total-timeLeft) /total) * Math.PI*2*10).toFixed(2);                         //Current angle for progress bar
    ctx.clearRect(0, 0, cw, ch);                                                          //Clear stroke to prevent overlapping lines as progress bar is redrawn
    ctx.lineWidth = 10;
    ctx.beginPath();
    ctx.arc(200, 200, 170.5, start, diff/10+start, false);
    ctx.stroke();
    
  }
  
  //Format to H:M:S from milliseconds
  function formatTime(hours,minutes,seconds){
    
    var formattedString = "";
    var padSec = seconds < 10 ? "0" + seconds : seconds.toString();
    var padMin = minutes < 10 ? "0" + minutes : minutes.toString();
    var padHr = hours < 10 ? "0" + hours : hours.toString();
    
    if(hours === 0){
      formattedString = padMin + ":" + padSec;
    }else{
      formattedString = padHr + ":" + padMin + ":" + padSec;
    }
    
    return formattedString;
  }
  
  //Update clock when work duration or break duration is changed depending on the phase
  function updateView(element,newVal){
    var elemObj = document.getElementById(element);
    if(element === "break" && timer.break_phase === true && timer.session_phase === false){         //if it's a break phase show the new break duration
      var breakT = Math.floor(((Time.getTimer().break/1000)/60))%60;
      displayTime.innerHTML = formatTime(0,breakT,0);
    }else if(element === "session" && timer.session_phase === true & timer.break_phase === false){  //if it's a session phase show the new session duration
      console.log(Time.getSeconds())
      displayTime.innerHTML = formatTime(Time.getHours(),Time.getMinutes(),Time.getSeconds());      
    }
    
    elemObj.innerHTML = newVal;
  }
 
  return {
    showCount:showCount,
    defDisplay:defDisplay,
    displayBreak:displayBreak,
    displaySession:displaySession,
    displayTime:displayTime,
    updateView:updateView
  };
})();

//Initialize the Clock with default settings and view
(init = function(){
   
   Settings.defSettings();
   Display.defDisplay();
})();