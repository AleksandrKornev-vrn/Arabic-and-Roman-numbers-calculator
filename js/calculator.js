(function () {
  window.calculator = function (string) {
    //Определяем массив возможных арабских цифр
    var arabicNumbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

    //Определяем массив возможных римских цифр
    var romanNumbers = ["I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X"];

    var romanNumberMap = {};

    //Определяем массив со значениями возможных операторов
    var arithmeticOperators = ["+", "-", "*", "/"];

    //Вводим переменную оператор
    var operator;

    //Создаём пустой массив для хранения найденных операторов
    var foundOperators = [];

    //Создаём пустой массив для хранения найденных операндов
    var operands = [];

    //Вводим переменную операнд № 1
    var firstOperand;

    //Вводим переменную операнд № 2
    var secondOperand;

    //Вводим переменную результат
    var rezult = "";

    //Определяем функцию, вычисляющую числовой результат
    var rezultCalculate = function (valueOperator, operand1, operand2) {
      switch (valueOperator) {
        case "+":
          return operand1 + operand2;
          break;
        case "-":
          return operand1 - operand2;
          break;
        case "*":
          return operand1 * operand2;
          break;
        case "/":
          return Math.floor(operand1 / operand2);
          break;
      }
    };

    //Определяем функцию, вычисляющую римский результат
    var calculateRomanResult = function () {
      //Начинаем с проверки что введены числа от I до X
      if (
        romanNumbers.indexOf(operands[0].trim()) < 0 ||
        romanNumbers.indexOf(operands[1].trim()) < 0
      ) {
        throw new Error(
          "Ошибка! Формат математической операции не удовлетворяет заданию - числа от I до X!"
        );
      }
      //Если всё ОК, продолжаем
      else {
        //Переводим значение римских цифр в арабские
        for (var i = 0; i < romanNumbers.length; i++) {
          if (operands[0].trim() === romanNumbers[i]) {
            firstOperand = arabicNumbers[i];
          }
          if (operands[1].trim() === romanNumbers[i]) {
            secondOperand = arabicNumbers[i];
          }
        }
        //Вычисляем результат
        var rezultNumber = rezultCalculate(operator, firstOperand, secondOperand);
        //Далее приводим результат к римским цифрам
        if (rezultNumber < 1) {
          rezult = "";
        } else {
          var digits = String(rezultNumber).split("");
          var key = ["", "C", "CC", "CCC", "CD", "D", "DC", "DCC", "DCCC", "CM", 
                    "", "X", "XX", "XXX", "XL", "L", "LX", "LXX", "LXXX", "XC", 
                    "", "I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX"];
          for (var i = 2; digits.length >= 1; i--) {
            rezult = key[+digits.pop() + i * 10] + rezult;
          }
        }
      }
    };

    //Определяем функцию, вычисляющую арабский результат
    var calculateArabicResult = function () {
      firstOperand = +operands[0];
      secondOperand = +operands[1];
      //Проверка что числа лежат в диапазоне от 1 до 10
      if (
        arabicNumbers.indexOf(firstOperand) < 0 || arabicNumbers.indexOf(secondOperand) < 0
      ) {
        throw new Error (
          "Ошибка! Формат математической операции не удовлетворяет заданию - числа от 1 до 10!"
        );
      }
      //Если всё ОК, вычисляем результат
      else {
        var rezultNumber = rezultCalculate(operator, firstOperand, secondOperand);
        rezult = String(rezultNumber);
      }
    };

    //Определяем значение оператора
    for (var i = 0; i < string.length; i++) {
      if (arithmeticOperators.indexOf(string[i]) >= 0) {
        operator = arithmeticOperators[arithmeticOperators.indexOf(string[i])];
        foundOperators.push(operator);
      }
    };

    //Выполняем проверку соответствия оператора и длины получаемой строки условиям:
    if (operator === undefined) {
      throw new Error("Ошибка! Строка не является математической операцией!");
    } else if (foundOperators.length > 1 || string.length < 3) {
      throw new Error(
        "Ошибка! Формат математической операции не удовлетворяет заданию - два операнда и один оператор!"
      );
    }

    //Если с оператором всё в порядке и длина строки не меньше возможной продолжаем работу:
    else {
      //Создаём строковый массив операндов
      operands = string.split(operator);

      //Выполняем проверку, что все операнды находятся в одной системе счисления
      if (
        (arabicNumbers.indexOf(+operands[0]) >= 0 && romanNumbers.indexOf(operands[1].trim()) >= 0) ||
        (romanNumbers.indexOf(operands[0].trim()) >= 0 && arabicNumbers.indexOf(+operands[1]) >= 0)
      ) {throw new Error ("Ошибка! Используются одновременно разные системы счисления!");
      }
      //Если операнды находятся в одной системе вычисляем результат:
      else {
        //Римский результат
        if (isNaN(+operands[0])) {
          calculateRomanResult();
        }
        //Арабский результат
        else {
          calculateArabicResult();
        }
      }
      return rezult;
    }
  };
})();