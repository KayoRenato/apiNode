const {
    readFile,
    writeFile,
    readFileSync,
    writeFileSync,
} = require('fs')

const {
    promisify
} = require('util')

//* Ler arquivos genericos como eventos de Promise
// const readFileAsync = promisify(readFile)

//* Escrever arquivos genericos como eventos de Promise
// const writeFileAsync = promisify(writeFile)

/**
 * !Uma outra forma de obter dados Json seria:
 * const dadosJson = requite('./herois.json')
 */

class Database {
    constructor() {
        this.NOME_ARQUIVO = 'herois.json'
    }

    async obterDadosArquivos() {
        // const arquivo = await readFileAsync(this.NOME_ARQUIVO, 'utf8')
        const arquivo = await readFileSync(this.NOME_ARQUIVO, 'utf8')
        return JSON.parse(arquivo.toString())
    }

    async escreverArquivo(dados) {
        // await writeFileAsync(this.NOME_ARQUIVO, JSON.stringify(dados))
        await writeFileSync(this.NOME_ARQUIVO, JSON.stringify(dados))
        return true
    }

    async cadastrar(heroi) {
        const dados = await this.obterDadosArquivos()
        const id = heroi.id <= 2 ? heroi.id : Date.now()
        
        const heroiComID = {
            ...heroi,
            id
        }

        const dadosFinal = [
            ...dados,
            heroiComID
        ]

        const resultado = await this.escreverArquivo(dadosFinal)
        return resultado
    }

    async listar(id) {
        const dados = await this.obterDadosArquivos()
        const dadosFiltrados = dados.filter(item => (id ? (item.id === id) : true))
        return dadosFiltrados
    }

    async remover(id) {
        if (!id) {
            return await this.escreverArquivo([])
        }

        const dados = await this.obterDadosArquivos()
        const indice = dados.findIndex(item => item.id === parseInt(id))

        if (indice === -1) {
            throw Error('O usuario informado nao existe')
        }
        dados.splice(indice, 1)
        return await this.escreverArquivo(dados)

    }

    async atualizar(id, modificacoes) {
        const dados = await this.obterDadosArquivos()
        const indice = dados.findIndex(item => item.id === parseInt(id))

        if (indice === -1) {
            throw Error('O heroi informado nao existe')
        }
        const atual = dados[indice]
        const objetoAtualizar = {
            ...atual,
            ...modificacoes
        }

        dados.splice(indice, 1)

        return await this.escreverArquivo([
            ...dados,
            objetoAtualizar
        ])

    }

}

module.exports = new Database()