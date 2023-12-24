(function () {
  window.data = (function () {
    var tableArabicCalculator = document.querySelector(".table-arabic-calculator");
    var resultArabicCalculator = document.querySelector("#result-arabic-calculator");
    var tableRomanCalculator = document.querySelector(".table-roman-calculator");
    var resultRomanCalculator = document.querySelector("#result-roman-calculator");
    var exceptions = ["/", "*", "-", "+"];
    var rezult;

    var buttonClickHandler = function (evt) {
      if (
        evt.target.offsetParent.className === "table-arabic-calculator" ||
        evt.target.offsetParent.className === "reset-button-cell-arabic"
      ) {
        rezult = resultArabicCalculator;
      } else if (
        evt.target.offsetParent.className === "table-roman-calculator" ||
        evt.target.offsetParent.className === "reset-button-cell-roman"
      ) {
        rezult = resultRomanCalculator;
      }
      if (
        exceptions.indexOf(evt.target.className) < 0 &&
        evt.target.className !== "=" &&
        evt.target.className !== "reset-button"
      ) {
        rezult.textContent += evt.target.className;
      } else if (exceptions.indexOf(evt.target.className) >= 0) {
        rezult.textContent += " " + evt.target.className + " ";
      } else if (evt.target.className === "=") {
        rezult.textContent = window.calculator(rezult.textContent);
      } else if (evt.target.className === "reset-button") {
        rezult.textContent = "";
      }
    };

    tableArabicCalculator.addEventListener("click", buttonClickHandler);

    tableRomanCalculator.addEventListener("click", buttonClickHandler);
  })();
})();
