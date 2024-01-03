(function () {
  window.calculator = function (string) {
    //Определяем массив возможных арабских цифр
    var arabicNumbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

    //Определяем массив возможных римских цифр
    var romanNumbers = ["I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X"];

    //Определяем мапку римских чисел
    var romanNumbersMap = {
      "I": 1,
      "II": 2,
      "III": 3,
      "IV": 4,
      "V": 5,
      "VI": 6,
      "VII": 7,
      "VIII": 8,
      "IX": 9,
      "X": 10
    };

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
        default:
          throw new Error(
            "Ошибка! Формат математической операции не удовлетворяет заданию"
          );
      }
    };

    //Определяем функцию, вычисляющую римский результат
    var calculateRomanResult = function () {
      //Начинаем с проверки что введены числа от I до X
      if (
        !romanNumbers.includes(operands[0].trim()) ||
        !romanNumbers.includes(operands[1].trim())
      ) {
        throw new Error(
          "Ошибка! Формат математической операции не удовлетворяет заданию - числа от I до X!"
        );
      } else {//Если всё ОК, продолжаем
        //Переводим значение римских цифр в арабские
        firstOperand = romanNumbersMap[operands[0].trim()];
        secondOperand = romanNumbersMap[operands[1].trim()];

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
        !arabicNumbers.includes(firstOperand) || !arabicNumbers.includes(secondOperand)
      ) {
        throw new Error (
          "Ошибка! Формат математической операции не удовлетворяет заданию - числа от 1 до 10!"
        );
      } else {//Если всё ОК, вычисляем результат
        var rezultNumber = rezultCalculate(operator, firstOperand, secondOperand);
        rezult = String(rezultNumber);
      }
    };

    //Определяем значение оператора
    for (var i = 0; i < string.length; i++) {
      if (arithmeticOperators.includes(string[i])) {
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
    } else {//Если с оператором всё в порядке и длина строки не меньше возможной продолжаем работу:
      //Создаём строковый массив операндов
      operands = string.split(operator);

      //Выполняем проверку, что все операнды находятся в одной системе счисления
      if (
        (arabicNumbers.includes(+operands[0]) && romanNumbers.includes(operands[1].trim())) ||
        (romanNumbers.includes(operands[0].trim()) && arabicNumbers.includes(+operands[1]))
      ) {throw new Error ("Ошибка! Используются одновременно разные системы счисления!");
      } else {//Если операнды находятся в одной системе вычисляем результат:
        //Римский результат
        if (romanNumbers.includes(operands[0].trim())) {
          calculateRomanResult();
        } else {//Арабский результат
          calculateArabicResult();
        }
      }
      return rezult;
    }
  };
})();