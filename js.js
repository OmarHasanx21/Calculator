//function to get element by id
function getElement(v) {
  return document.getElementById(v);
}

let ResultScreen;
document.addEventListener("DOMContentLoaded", () => {
  ResultScreen = getElement("ResultScreen");
});

//array to store calculations
let Cal = [];
//calculator function
function Calculator(c) {
  switch (c) {
    case "BackSpace":
      if (Cal.length > 0) {
        Cal.pop();
        DrawResult();
      }
      break;
    case "Clear":
      Cal = [];
      DrawResult();
      break;
    case "_1":
      Cal.push("1");
      DrawResult();
      break;
    case "_2":
      Cal.push("2");
      DrawResult();
      break;
    case "Plus":
      if (Cal[Cal.length - 1] != "+") {
        Cal.push("+");
        DrawResult();
      }
      break;
    case "Equal":
      DrawResult();
      GetResult();
      break;
  }
}

//function to draw result on screen
function DrawResult() {
  let tempResult = "";
  for (let i = 0; i < Cal.length; i++) {
    tempResult += Cal[i];
  }
  ResultScreen.innerHTML = tempResult;
  tempResult = "";
}

//calculat the result function
function GetResult() {
  if (ResultScreen.innerHTML) {
    let output = eval(ResultScreen.innerHTML);
    ResultScreen.innerHTML = "" + eval(ResultScreen.innerHTML);
    Cal = [output];
  }
}
