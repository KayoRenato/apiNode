const service = require('./service')

async function main() {
    try {
        const res = await service.obterPessoas(`a`)
        const names1 = []

        console.time('forEach')
        res.results.forEach(function (item) {
            names1.push(item.name)
        });
        console.timeEnd('forEach')

        console.time('Map')
        const names2 = res.results.map((pessoa) => pessoa.name)
        console.timeEnd('Map')

        // console.log('Names: ', names)
    } catch (error) {
        console.error('Error - ', error)
    }
}

main()