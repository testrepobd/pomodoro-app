//Practicing the "Revealing Module Pattern"
  
var buttons = document.querySelectorAll("#button_panel li");;
var inputs = [];      //holds the keypad presses

//For each button on the calculator add an event listener which passes the information to appropriate modules
buttons.forEach(function(current){

  current.addEventListener("click",function(){

    inputs.push(current.innerHTML);
    var validInput = Calculator.validate();         //sanitize inputs 
    Display.update(validInput);                     //if valid entry then show on display
    if(validInput[validInput.length-1] === "="){    //"=" represents end of expression, so calculate
      var equals = Calculator.calculate();
      inputs = [];                                  //convert keypad digits/entries to corresponding computation in history (inputs)
      inputs.push("=",equals);
      Display.result(equals);                       //display the computation's result
    }            
  });
});

//Module that manages calculation logic
var Calculator = (function(){
   var expression = [];                             //hold the formatted expression (not just their component digits)
    function getNumbers(){
      //use regex to get a floating point or integer (accounts for values which include "e" abbreviation for very small/large nums)
      var num = inputs.join("").match(/(\-)?\d{1,}\.\d{1,}(\e(\-)?\d{1,})?|\d{1,}(\e(\-)?\d{1,})?/g);
      return num;
    }

    function getOperators(){
      if(inputs.length>0){
      //filter out numbers and isolate the operators
      var result = inputs.join("").replace(/(\-)?\d{1,}\.\d{1,}(\e(\-)?\d{1,})?|\d{1,}(\e(\-)?\d{1,})?/g,"");
        var operators = result.match(/[\+\-\x\/]/g);
        console.log(operators);
        return operators;
      }
    }
    //Sanitize the entries
    function validate(){  
      var current = inputs[inputs.length-1];
      
      //expression should start with a number 
      if(/[\+\-\x\/\.]{1}/.test(inputs[0])){
        inputs = [];
        return false;
      }
      //ignore repeated operators
      var repeatingOperators = /[\+\-\x\/\.]{2,}|[=]{2,}/;
      if(repeatingOperators.test(inputs.join(""))){
        inputs.splice(inputs.length-1,1);
      }
      return inputs;
    }
  
    //Parse the private "expression" variable from this module and produce output
    function calculate(){
      var numbers = getNumbers();
      var ops = getOperators();
      var total = numbers.length + ops.length;                  //number of iterations to reduce across
      var opCount = 0;
      var calculated = numbers.reduce(function(prev,curr){      //iterate across nums and point to appropriate operator in separate array
        expression[0] = prev;
        expression[1] = ops[opCount];
        expression[2] = curr;
        var result = evaluate(prev,ops[opCount],curr);
        opCount+=1;
        return result;
      });
        return calculated;
    }
    
    //Apply the corresponding operators from each reduce call above
    function evaluate(num1,op,num2){
      var result = 0;
      num1 = Number(num1);
      num2 = Number(num2);
      switch(op){
            case "+":
              result = num1 + num2;
              break;
            case "-":
              result =  num1 - num2;
              break;            
            case "/":
              result =  num1 / num2;
              break;
            case "x":
              result =  num1 * num2;
              break;
                     }
      return result;
    }

  return {
    validate : validate,
    clearEntry:false,
    allClear:false,
    calculate:calculate,
    getNumbers:getNumbers,
    getOperators:getOperators,
    evaluate:evaluate,
    expression:expression
  };
  
}());

//Display module controls the calculator's screen and controls exactly how keypad values are shown to user and when expression result is outputted
var Display = (function(){
  
  //Show the user their current entries (for each keypress, except "=" symbol)
  function displayLive(stream){
      var display = document.getElementById('display');
      var current = stream.join("").match(/(\d{1,}\.\d{1,}|\d{1,}|[\x\/\-\+\=]|CE|AC)$/g)[0];       //double check that value is appropriate
      if(stream.length === 0 || display.innerHTML.length >=14){
                                                                                                    //if display is too full or empty revert display to just "0"
          resetDisplay();
          return;
      }
      
    
      if(current === "AC"){                                                                         //Clear history and display
       Calculator.allClear = Display.clearDisplay(inputs);                          
      }
    
      if(/\d{1,}\.\d{1,}|\d{1,}/.test(current)){                                                    //If it's a number
        display.innerHTML = display.innerHTML === '0' ? '': display.innerHTML;                      //clear the display if this is the first entry
        display.innerHTML = /\d{1,}\.\d{1,}|\d{1,}/.test(display.innerHTML) ? current : '';         //set display to number
        display.innerHTML = display.innerHTML === '' ? current : display.innerHTML;                 //if value entered wasn't number then set to value
        
      }else if(/[\+\-\x\/]/.test(current)){
        display.innerHTML = '';                                                                     //clear display then show operator
        display.innerHTML = current;
      }
    
    
  }
  //Show the result of computation on the display
  function displayResult(total){
    var display = document.getElementById('display');
    total = total.toString().length>=14 ? total.toPrecision(6) : total;
    display.innerHTML = total;
  }
  
  
  //Implement clear function by wiping history and calling reset to wipe display
  function clearDisplay(history){
    history.length = 0;
    if(inputs.length === 0){
        resetDisplay();
        return true; //cleared
    }
    //not successful
    return false;
  }
  
  
    return {
      update:displayLive,
      result:displayResult,
      clearDisplay:clearDisplay
    };

})();

//iife to (re-)initialize display
(resetDisplay = function(){
  //Align display values to be right-aligned
  var display = document.getElementById('display');
    display.style.textAlign = "right";
    display.style.fontSize = "32px";
  //Initial display 
    if(inputs.length === 0){
      display.innerHTML = '0';
    }
  //Reset display when too many values
    if(display.innerHTML.length>=14){
       display.innerHTML = '0';
       inputs = inputs.slice(0,inputs.length-15);
    }
  
})();
resetDisplay();