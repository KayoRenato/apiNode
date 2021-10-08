const EventEmitter = require('events')
class MeuEmissor extends EventEmitter {

}

const meuEmissor = new MeuEmissor()
const nomeEvent = 'usuario:click'

meuEmissor.on(nomeEvent, function (click) {
    console.log('um usuario clicou', click)
})

// meuEmissor.emit(nomeEvent, 'na barra de rolagem')
// meuEmissor.emit(nomeEvent, 'no CTA')

// let count = 0
// setInterval(function () {
//     meuEmissor.emit(nomeEvent, 'no OK ' + (count++))
// }, 1000)

const stdin = process.openStdin()
stdin.addListener('data', function (value){
    console.log(`Você digitou: ${value.toString().trim()}`)
})