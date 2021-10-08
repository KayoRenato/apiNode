/*
Para validar os Tests é preciso instalar o mocha no ambiente de Desenvolvimento
npm i --save-dev mocha
*/

//Utilizado para validar as variáveis e se os objetos estão de acordo com a necessidade
const assert = require('assert')

const Postgres = require('../db/stratagies/postgres')
const Context = require('../db/stratagies/base/contextStrategy')
const { DESCRIBE } = require('sequelize/lib/query-types')

const context = new Context(new Postgres())

//!Criando Heroi para servir de base
const MOCK_HEROI_CADASTRAR =    {
    nome:'Gaviao Negro',
    poder:'Flexas'
}

describe('Postgres Strategy', function () {
    /*
        Testar operações em DB pode demorar um pouco, 
        para isso usa-se o timeout(Infinit) para pertirmir 
        que a função demore o tempo que for necessário para conectar
    */
    this.timeout(Infinity)
    this.beforeAll( async function () {
        await context.connect()
    })

    it('PostgresSQL Connection', async function(){
        const result = await context.isConnected()
        
        //? Resultado(result) é igual ao Esperado(true)
        assert.equal(result, true)
    })

    it('PostgresSQL Cadastrar', async function(){
        const result = await context.create(MOCK_HEROI_CADASTRAR)
        delete result.id //! Removendo a chave id do result 

        //? Resultado(result) é igual ao Esperado(true)
        //! O deepEqual compara se dois objetos e seus filhos são iguais
        assert.deepEqual(result, MOCK_HEROI_CADASTRAR)
    })

})

