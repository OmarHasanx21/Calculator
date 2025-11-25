//function to get element by id
function getElement(v) {
  return document.getElementById(v);
}

let ResultScreen;
document.addEventListener("DOMContentLoaded", () => {
  ResultScreen = getElement("ResultScreen");

  const Buttons = getElement("buttonsDiv");
  Buttons.addEventListener("click", (e) => {
    const button = e.target.closest("input");
    // If a button was clicked, proceed. Otherwise, do nothing.
    if (button) {
      const bvalue = button.dataset.value;
      const btype = button.dataset.type;
      Calculator(bvalue, btype);
    }
  });
});

//array to store calculations
let Cal = [],
  currentnumber = [];
//calculator function
function Calculator(bvalue, btype) {
  switch (btype) {
    case "number":
      Cal.push(bvalue);
      currentnumber.push(bvalue);
      break;

    case "operator":
      switch (bvalue) {
        case "Clear":
          Cal = [];
          currentnumber = [];
          break;
        case "BackSpace":
          // Also remove from currentnumber if it's not empty
          if (Cal.length > 0) {
            Cal.pop();
            if (currentnumber.length > 0) {
              currentnumber.pop();
            }
          }

          if (Cal.length > 0) {
            const lastoperator = Math.max(
              Cal.lastIndexOf("+"),
              Cal.lastIndexOf("-"),
              Cal.lastIndexOf("*"),
              Cal.lastIndexOf("/"),
              Cal.lastIndexOf("%")
            );

            currentnumber =
              lastoperator === -1 ? Cal.slice() : Cal.slice(lastoperator + 1);
          }

          break;
        case "=":
          GetResult();

          break;
        case "%":
        case "/":
        case "*":
        case "-":
        case "+":
          if (
            Cal[Cal.length - 1] == "+" ||
            Cal[Cal.length - 1] == "-" ||
            Cal[Cal.length - 1] == "*" ||
            Cal[Cal.length - 1] == "/" ||
            Cal[Cal.length - 1] == "%"
          ) {
            return;
          } else {
            Cal.push(bvalue);
            currentnumber = [];
          }
          break;
      }
      break;

    case "decimal":
      if (currentnumber.includes(".")) {
        return;
      } else {
        Cal.push(bvalue);
        currentnumber.push(bvalue);
      }

      break;
  }

  DrawResult();
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
    let output = new Function("return " + ResultScreen.innerHTML)();

    ResultScreen.innerHTML = "" + output.toFixed(4);
    Cal = [parseFloat(output.toFixed(4))];
    // After a result, the new number starts here
    currentnumber = parseFloat(output.toFixed(4));
  }
}

function isOperator(value) {
  if (
    value == "+" ||
    value == "-" ||
    value == "*" ||
    value == "/" ||
    value == "%"
  ) {
    return value;
  } else {
    return false;
  }
}
//setInterval(DrawResult(), 200);
