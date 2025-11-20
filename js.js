//function to get element by id
function getElement(v) {
  return document.getElementById(v);
}
const ResultScreen = getElement("ResultScreen");

//array to store calculations
let Cal = [];
//calculator function
function Calculator(c) {
  switch (c) {
    case "BackSpace":
      Cal.pop();
      DrawResult();
      break;
    case "Clear":
      Cal = [];
      DrawResult();
      break;
      case "_1" :
        Cal.push(1);
        DrawResult();
        break;
        case "_2" :
          Cal.push(2);
          DrawResult();
          break;
          case "Plus" :
            Cal.push(+);
            DrawResult();
            break;
            case "Equal" :
              GetResult();
              DrawResult();
              break;
  }
}

//function to draw result on screen
function DrawResult() {
  let tempResult;
  for (let i = 0; i < Cal.length; i++) {
    tempResult += Cal[i];
  }
  ResultScreen.innerHTMl = tempResult;
  tempResult = "";
}

//calculat the result function
function GetResult() {
  ResultScreen.innerHTMl =eval(ResultScreen.innerHTMl);
}
