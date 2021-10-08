const Commander = require('commander')
const Database = require('./database')
const Heroi = require('./heroi')

async function main() {
    Commander
        .version('v1')
        .option('-n, --nome [value]', "Nome do Heroi")
        .option('-p, --poder [value]', "Poder do Heroi")

        .option('-c, --cadastrar', "Cadastrar um Heroi")
        .option('-l, --listar', "Listar um Heroi")
        .option('-r, --remover [value]', "Remover um heroi pelo id")
        .option('-a, --atualizar [value]', "Atualizar um heroi pelo id")
        .parse(process.argv)

    console.log('Commander.Op :', Commander._optionValues)
    const heroi = new Heroi(Commander._optionValues)
    try {

        if (Commander._optionValues.cadastrar) { 

            const resultado = await Database.cadastrar(heroi)
            if (!resultado) {
                console.error('Heroi nao foi cadastrado!')
                return;
            }
            console.log('Heroi Cadastrado com Sucesso!')
        }

        if (Commander._optionValues.listar) {
            const resultado = await Database.listar()
            console.log(resultado)
            return;
        }

        if (Commander._optionValues.remover) {
            const idParaRemover = Commander._optionValues.remover
            const resultado = await Database.remover(idParaRemover)
            if (!resultado) {
                console.error('Não foi possível remover o heroi.')
                return;
            }
            console.log('Heroi removido com sucesso.')
        }

        if(Commander._optionValues.atualizar){
            const idParaAtualizar = parseInt(Commander._optionValues.atualizar)
            
            //! Fazer um transformação do Json para String e depois de volta para Json remove todas as chaves que estiverem com undefined ou null
            const dado = JSON.stringify(heroi)
            const heroiAtualizar = JSON.parse(dado)
            
            const resultado = await Database.atualizar(idParaAtualizar, heroiAtualizar)

            if(!resultado){
                console.log('Não foi possível realizar a atualização.')
                return;
            }
            console.log('Heroi Atualizado com sucesso.')
        }

    } catch (error) {
        console.error('Deu ruim', error)
    }


}

main()