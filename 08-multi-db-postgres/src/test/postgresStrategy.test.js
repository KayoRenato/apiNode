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
//!Heroi para servir de base no Atualizar
const MOCK_HEROI_ATUALIZAR =   {
    nome:'Superman',
    poder:'Forca'
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
        await context.create(MOCK_HEROI_ATUALIZAR)
    })
    // this.afterAll( async function(){
    //     await context.delete()
    // })

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
    
    it('listar', async function(){
        const [result] = await context.read({nome: MOCK_HEROI_CADASTRAR.nome})
        delete result.id //! Removendo a chave id do result 
        //!pegar a primeira posição da listar

        assert.deepEqual(result, MOCK_HEROI_CADASTRAR)
    })
    
    it('atualizar', async function(){
        const [heroToUpdate] = await context.read({nome: MOCK_HEROI_ATUALIZAR.nome})
        const expHero = {
            //! Usando a tecnica rest/spread para mergear objetos
            ...MOCK_HEROI_ATUALIZAR,
            nome: 'Mulher Maravilha'
        }
        
        //! Return um array com o valor 1 se o updated foi realizado
        const [result] = await context.update(heroToUpdate.id, expHero)
        
        assert.deepEqual(result, 1) 
        
        const [actHero] = await context.read({id:heroToUpdate.id})
        delete actHero.id
        assert.deepEqual(actHero, expHero) 
    })
})

