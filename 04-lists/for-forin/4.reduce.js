const { obterPessoas } = require('./service')

async function main() {
    try {
        const { results: res } = await obterPessoas(`a`)

        console.time('map')
        const pesos = res.map(item => parseInt(item.height))
        console.timeEnd('map')
        console.log('Pesos:', pesos)
        
        console.time('reduce')
        const total = pesos.reduce((anterior, proximo) =>{
            return anterior+proximo
        })
        console.timeEnd('reduce')
        console.log('Total:', total)

    } catch (error) {
        console.error('Error - ', error)
    }
}

main()