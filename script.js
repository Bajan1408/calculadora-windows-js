const display = document.getElementById('display');
const displayText = document.getElementById('display').textContent;
const percent = document.getElementById('percent');
const limpaParcial = document.getElementById('limpaParcial');
const limpaTudo = document.getElementById('limpaTudo');
const backspace = document.getElementById('backspace');
const divisaoUm = document.getElementById('divisaoUm');
const potencia = document.getElementById('potencia');
const raiz = document.getElementById('raiz');
const dividir = document.getElementById('dividir');
const maisMenos = document.getElementById('maisMenos');
const igual = document.getElementById('igual');

const tecNum = document.querySelectorAll('[id*=num]');
const operadores = document.querySelectorAll('[id*=sinal')

let primeiro = true;
let operador;
let numeroAnterior;
let numeroAtual;
let apagarIgual;
let result;

const ajustaPontoVirgula = () => display.textContent = display.textContent.replace('.', ',');

const inserirDisplay = (text) => {
    if(primeiro) {
        display.textContent = text;
        primeiro = false;
    } else {
        display.textContent += text;
    }
    display.textContent = display.textContent.substring(0, 17);
    numeroAtual = display.textContent;
    apagarIgual = true;
}

const inserirNum = (e) => inserirDisplay(e.target.textContent);

tecNum.forEach(el => el.addEventListener('click', inserirNum));

const inserirOperador = (oper) => {
    primeiro = true;
    operador = oper.target.textContent;

    if(operador === 'x') {
        operador = '*';
    } else if(operador === '÷') {
        operador = '/';
    }

    numeroAnterior = display.textContent;
}

operadores.forEach((el) => el.addEventListener('click', inserirOperador));


const calcular = () => {
    if(numeroAnterior && operador) {
        result = numeroAnterior + operador;

        if(numeroAtual) {
            result += numeroAtual;
        } else {
            result += numeroAnterior;
        }
    }
    display.textContent = eval(result.replace(',', '.'));
    ajustaPontoVirgula();

    if(display.textContent === NaN) {
        display.textContent = 0;
    }

    numeroAnterior = display.textContent;
    primeiro = true;
    apagarIgual = false;
}

igual.addEventListener('click', calcular);


const apagarUltimo = () => {
    if(apagarIgual) {
        if(display.textContent.length > 1) {
            display.textContent = display.textContent.slice(0, -1);
        } else {
            display.textContent = 0;
        }
        primeiro = true;
    }
}

backspace.addEventListener('click', apagarUltimo);


const apagaParcial = () => {
    display.textContent = 0;
    primeiro = true;
}

limpaParcial.addEventListener('click', apagaParcial);


const inverterSinal = () => {
    display.textContent = parseFloat(display.textContent.replace(',', '.') * -1);
    ajustaPontoVirgula();
}

maisMenos.addEventListener('click', inverterSinal);

const limparTudo = () => {
    display.textContent = 0;
    numeroAnterior = 0;
    numeroAtual = 0;
    primeiro = true;
}

limpaTudo.addEventListener('click', limparTudo);

const calcularPorcentagem = () => {
    display.textContent = parseFloat(display.textContent.replace(',', '.') / 100);
    ajustaPontoVirgula();
    numeroAtual = display.textContent;
    primeiro = true;
}

percent.addEventListener('click', calcularPorcentagem);

const calcDivisaoUm = () => {
    display.textContent = parseFloat(1 / display.textContent.replace(',', '.'));
    ajustaPontoVirgula();
    numeroAtual = display.textContent;
    primeiro = true;
}

divisaoUm.addEventListener('click', calcDivisaoUm);

const calcPotencia = () => {
    display.textContent = Math.pow(parseFloat(display.textContent.replace(',', '.')), 2);
    ajustaPontoVirgula();
    numeroAtual = display.textContent;
    numeroAnterior = 0;
    primeiro = true;
}

potencia.addEventListener('click', calcPotencia);

const calcRaiz = () => {
    display.textContent = Math.sqrt(parseFloat(display.textContent.replace(',', '.')));
    ajustaPontoVirgula();
    numeroAtual = display.textContent;
    numeroAnterior = 0;
    primeiro = true;
}

raiz.addEventListener('click', calcRaiz);