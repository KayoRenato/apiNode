const { get } = require('axios')

const urlBase = `https://swapi.dev/api/people`


async function obterPerssoas(nome) {
    const url = `${urlBase}/?search=${nome}&format=json`
    const result = await get(url)
    return result.data.results.map(mapearPessoas)
}

function mapearPessoas(item) {
    return{
        nome: item.name,
        peso: item.mass,
        altura: item.height
    }
}


module.exports = {
    obterPerssoas
}