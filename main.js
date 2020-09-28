let teclas = document.querySelectorAll('.botao')
let input = document.getElementById('input')
let display = document.querySelector('.numero-digitado')
let displayHistorico = document.querySelector('.expressao')
let numerosPermitidos = ['1','2','3','4','5','6','5','6','7','8','9','0']
let sinaisPermitidos = ['+','-','*','/']
let pontoAdcionado = false
let sinalApertado = false

window.onload = function() {
    input.focus()
    sensorTeclas()
};



window.onkeyup = apertaTeclado

function apertaTeclado(event){
    switch(event.key){
        case 'c':
            clearDisplay()
            break
        case 'Backspace':
            backspace()
            break
        case ',':
            adicionarPonto()
            break
        case '=':
            resolverExpressao()
            break
        case 'Enter':
            resolverExpressao()
            break
        default: 
            processaTecla(event.key)
    }
    
}

function processaTecla(teclaAcionada){
    if(numerosPermitidos.indexOf(teclaAcionada) >= 0){        
        display.innerHTML += teclaAcionada
    }else if(sinaisPermitidos.indexOf(teclaAcionada) >= 0) {
        sinalApertado = true
        pontoAdcionado = false
        let atualDisplay = display.innerHTML
        let lastChar = atualDisplay.charAt(atualDisplay.length - 1)
        verificarZero(lastChar)
        if(sinaisPermitidos.indexOf(lastChar) >= 0){
            let displayCortado = atualDisplay.substr(0, atualDisplay.length - 1)
            display.innerHTML = displayCortado + teclaAcionada
        }
        else{
            display.innerHTML += teclaAcionada
        }
    }
}

function clearDisplay(){
    displayHistorico.innerHTML = ''
    display.innerHTML = ''
    input.value = ''
    pontoAdcionado = false
    sinalApertado = false
}

function backspace(){
    let conteudoDisplay = display.innerHTML
    display.innerHTML = conteudoDisplay.substr(0, conteudoDisplay.length -1)
}


function sensorTeclas(){
    for (const tecla of teclas) {
        tecla.addEventListener('click', ()=>{
            let valorTecla = tecla.innerHTML
            switch(valorTecla){
                case 'C':
                    clearDisplay()
                    break
                case 'BACK':
                    backspace()
                    break
                case ',':
                    adicionarPonto()
                    break
                case '=':
                    resolverExpressao()
                    break
                default:
                    processaTecla(valorTecla)
            }           
        },true)
    }
}

function adicionarPonto(){
    if(pontoAdcionado == false){
        let displayAtual = display.innerHTML
        verificarZero(displayAtual.charAt(display.innerHTML.length - 1))
        display.innerHTML += '.'
        pontoAdcionado = true
    }
}
function verificarZero(ultimoChar){
    console.log(ultimoChar)
    if(ultimoChar == '.' || sinaisPermitidos.indexOf(ultimoChar) >= 0 || display.innerHTML == ''){
        display.innerHTML += '0'
    }
}

function resolverExpressao(){
    let displayAtual = document.querySelector('.numero-digitado')
    adicionarAoHistorico(displayAtual)
    displayAtual.innerHTML = eval(displayAtual.innerHTML)
}

function adicionarAoHistorico(displayAtual){
    let expressaoDisplay = document.querySelector('.expressao')
    if(expressaoDisplay.innerHTML == ''){
        expressaoDisplay.innerHTML += displayAtual.innerHTML
    }
    else{
        for(let sinal of sinaisPermitidos){
            let idxSinal = displayAtual.innerHTML.indexOf(sinal)
            if(idxSinal > 0){
                expressaoDisplay.innerHTML += displayAtual.innerHTML.slice(idxSinal)
            }
        }
    }
}