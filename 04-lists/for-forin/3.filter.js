const { obterPessoas } = require('./service')

async function main() {
    try {
        const { results: resultado } = await obterPessoas(`a`)

        console.time('filter')
        const familiaLars = resultado.filter(function (item) {
            /*
            - Por padrão precisa retorna um Booleano 
            para informar se deve manter ou remover da lista;
            --false > remove da lista
            --true > mantem na lista
            --Não encontrou = -1
            --Encontrou = posição no Array
            */
           
           const res = item.name.toLowerCase().indexOf(`lars`) !== -1
           return res
        })
        console.timeEnd('filter')
        
        console.time('map')
        const names = familiaLars.map( (pessoa) => pessoa.name)
        console.timeEnd('map')
        console.log(names)

    } catch (error) {
        console.error('Error - ', error)
    }
}

main()