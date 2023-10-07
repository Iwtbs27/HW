const display = document.querySelector('#display');
const buttons = document.querySelectorAll('button');

buttons.forEach((item) => {
    item.onclick = () => {
        if (item.id == 'clear') {
            display.innerText = '';
        } else if (item.id == 'backspace') {
            let string = display.innerText.toString();
            display.innerText = string.substr(0, string.length - 1);
        } else if (item.id == 'equal') {
            const expression = display.innerText;
            if (expression.includes('sin') || expression.includes('cos') || expression.includes('tan') || expression.includes('^')) {
                // 处理包含特殊函数的表达式
                try {
                    const result = calculate(expression);
                    display.innerText = result;
                } catch (error) {
                    display.innerText = `Error: ${error.message}`;
                }
            } else {
                // 直接计算普通表达式
                try {
                    const result = eval(expression);
                    display.innerText = result;
                } catch (error) {
                    display.innerText = `Error: ${error.message}`;
                }
            }
        } else if (item.id == 'exp') {
            // 处理指数运算
            display.innerText += '^';
        } else if (item.id == 'sin') {
            // 处理sin运算
            display.innerText += 'sin(';
        } else if (item.id == 'cos') {
            // 处理cos运算
            display.innerText += 'cos(';
        } else if (item.id == 'tan') {
            // 处理tan运算
            display.innerText += 'tan(';
        } else {
            display.innerText += item.id;
        }
    }
});

function calculate(expression) {
    // 计算表达式中的数学运算，包括sin、cos、tan和指数函数的处理
    expression = expression.replace(/sin\(([^)]+)\)/g, (match, angle) => {
        const radians = (parseFloat(angle) * Math.PI) / 180;
        return Math.sin(radians).toFixed(3);
    });

    expression = expression.replace(/cos\(([^)]+)\)/g, (match, angle) => {
        const radians = (parseFloat(angle) * Math.PI) / 180;
        return Math.cos(radians).toFixed(3);
    });

    expression = expression.replace(/tan\(([^)]+)\)/g, (match, angle) => {
        const radians = (parseFloat(angle) * Math.PI) / 180;
        return Math.tan(radians).toFixed(3);;
    });

    expression = expression.replace(/\^/g, '**');

    return eval(expression);
}

const themeToggleBtn = document.querySelector('.theme-toggler');
const calculator = document.querySelector('.calculator');
const toggleIcon = document.querySelector('.toggler-icon');
let isDark = true;

themeToggleBtn.onclick = () => {
    calculator.classList.toggle('dark');
    themeToggleBtn.classList.toggle('active');
    isDark = !isDark;
}
