
var rnc = rnc || {};

// Display in this case refers to the input type="text" above the buttons
rnc.Display = function () {
  var $displayControl,
    operator,
    operatorSet = false,
    equalsPressed = false,
    accumulator = null,

    add = function (x, y) {
      return x + y;
    },
    divide = function (x, y) {
      if (y == 0) {
        alert("Can't divide by 0");
        return 0;
      }
      return x / y;
    },
    multiply = function (x, y) {
      return x * y;
    },
    subtract = function (x, y) {
      return x - y;
    },
    calculate = function () {
      if (!operator || accumulator == null) return;
      var currNumber = parseFloat($displayControl.value),
        newVal = 0;

      switch (operator) {
        case "+":
          newVal = add(accumulator, currNumber);
          break;
        case "-":
          newVal = subtract(accumulator, currNumber);
          break;
        case "*":
          newVal = multiply(accumulator, currNumber);
          break;
        case "/":
          newVal = divide(accumulator, currNumber);
          break;
        case "%":
          newVal = currNumber / 100;
          break;
        case "+/-":
          newVal = -currNumber;
          break;
      }
      setValue(newVal);
      accumulator = newVal;
    },

    setValue = function (val) {
      $displayControl.value = val;
    },

    getValue = function () {
      return $displayControl.value + "";
    },

  // clears all of the digits
    clearDisplay = function () {
      accumulator = null;
      equalsPressed = operatorSet = false;
      setValue("0");
    },

  // removes the last digit entered in the display
    clearError = function () {
      var display = getValue();
      // if the string is valid, remove the right most character from it
      // remember: to be valid, must have a value and length
      if (display) {
        display = display.slice(0, display.length - 1);
        display = display ? display : "0";
        setValue(display);
      }
    },

  // handles a numeric or decimal point key being entered
    enterDigit = function (buttonValue) {
      var currentlyDisplayed = $displayControl.value;
      // keep the max digits to a reasonable number
      if (currentlyDisplayed.length < 20) {
        if (operatorSet == true || currentlyDisplayed === "0") {
          setValue("");
          operatorSet = false;
        }
        // already pressed a decimal point
        if (buttonValue === "." && currentlyDisplayed.indexOf(".") >= 0) {
          return;
        }
        setValue($displayControl.value + buttonValue);
      }
    },

    setPercent = function(){
      var currentlyDisplayed = $displayControl.value;
      if(currentlyDisplayed) {
        setValue(currentlyDisplayed / 100);
      }
    },

    reverseSign = function(){
      var currentlyDisplayed = $displayControl.value;
      if(currentlyDisplayed) {
        setValue(-currentlyDisplayed);
      }
    },

    setOperator = function (newOperator) {

      if (newOperator === "=") {
        equalsPressed = true;
        calculate();
        return;
      }
      if (!equalsPressed) calculate();
      equalsPressed = false;
      operator = newOperator;
      operatorSet = true;
      accumulator = parseFloat($displayControl.value);
    },

  // set the pointer to the HTML element which displays the text
    init = function (currNumber) {
      $displayControl = currNumber;
    };

  // all of the methods below are public
  return {
    clearDisplay: clearDisplay,
    clearError: clearError,
    enterDigit: enterDigit,
    setOperator: setOperator,
    setPercent: setPercent,
    reverseSign: reverseSign,
    init: init
  };
}();

rnc.calculator = function () {
  rnc.Display.init($("#displayPanel")[0]);

  $(".key").on('touchstart', function (event) {
    var key = $(this).attr("data-rnc-tag"),
      id = this.id;

    // this is a performance boost
    event.preventDefault();
    event.stopPropagation();
    switch (id) {
      case "key0":
      case "key1":
      case "key2":
      case "key3":
      case "key4":
      case "key5":
      case "key6":
      case "key7":
      case "key8":
      case "key9":
      case "keyDecimalPoint":
        rnc.Display.enterDigit(key);
        break;
      case "keyC":
        rnc.Display.clearDisplay();
        break;
      case "keyCe":
        rnc.Display.clearError();
        break;
      case "keyAdd":
        rnc.Display.setOperator("+");
        break;
      case "keySubtract":
        rnc.Display.setOperator("-");
        break;
      case "keyMultiply":
        rnc.Display.setOperator("*");
        break;
      case "keyDivide":
        rnc.Display.setOperator("/");
        break;
      case "keyEquals":
        rnc.Display.setOperator("=");
        break;
      case "keyPercent":
        rnc.Display.setPercent();
        break;
      case "keyPlusMinus":
        rnc.Display.reverseSign();
        break;
    }
    return false;
  });
}
