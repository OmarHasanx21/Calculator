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
        if (currentnumber.length == 0) {
          Cal.push("0", ".");
          currentnumber.push("0", ".");
          break;
        } else {
          Cal.push(bvalue);
          currentnumber.push(bvalue);
        }
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
  let expression = Cal.join("");
  if (expression) {
    try {
      // clean the expression to only allow numbers, operators, and dots.
      if (/^[\d\.\+\-\*\/\%]+$/.test(expression)) {
        let output = eval(expression);

        // Handle division by zero or other invalid results
        if (!isFinite(output)) {
          ResultScreen.innerHTML = "Error";
          Cal = [];
          currentnumber = [];
          return;
        }

        const resultString = output.toFixed(4).replace(/\.?0+$/, ""); // Keep it a string and remove  zeros
        ResultScreen.innerHTML = resultString;
        Cal = resultString.split("");
        currentnumber = resultString.split("");
      } else {
        ResultScreen.innerHTML = "Error";
        Cal = [];
        currentnumber = [];
      }
    } catch (e) {
      ResultScreen.innerHTML = "Error";
      Cal = [];
      currentnumber = [];
    }
  }
}
//setInterval(DrawResult(), 200);
//test
