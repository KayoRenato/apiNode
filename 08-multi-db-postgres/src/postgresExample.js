/*
Instando ORM para realizar operações no banco de dados
    npm install sequelize

Instalando o Drive do Postgres no Sequelize
    npm install pg-hstore pg
 */

const Sequelize = require('sequelize')


const driver = new Sequelize(
    'heroes',
    'kayorenato',
    '12345',
    {
        host: 'localhost',
        dialect: 'postgres',
        quoteIdentifiers: false,
        operatorsAliases: false

    }
)

async function main() {

    //Definir como a tabela irá se comportar
    const Heroes = driver.define('heroes', {
        id: {
            type: Sequelize.INTEGER,
            required: true,
            primaryKey: true,
            autoIncrement: true
        },
        nome: {
            type: Sequelize.STRING,
            required: true
        },
        poder: {
            type: Sequelize.STRING,
            required: true
        }
    }, // Se quiser usar um banco existe é preciso para as informações a seguir 
    {
        tableName: 'TB_HEROES', // Nome da tabela existente
        freezeTabName: false, // Para não alterar as opções do banco
        timestamps: false // Para o banco não criar as propriedades default de created_at e updated_at
    })

    // await Heroes.sync() //Para Sincronizar com o DB

    await Heroes.create({
        nome: 'Lanterna Verde',
        poder: 'Anel'
    })

    const result = await Heroes.findAll({
        raw: true, //Para retornar apenas os dados 
        attributes: ['nome', 'poder', 'id'] //Para retornar apenas alguns atributos especificos
    })
    console.log('Result', result)
}


main()


