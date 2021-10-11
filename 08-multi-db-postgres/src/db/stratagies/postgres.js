/*
Instando ORM para realizar operações no banco de dados
    npm install sequelize

Instalando o Drive do Postgres no Sequelize
    npm install pg-hstore pg
 */

const Sequelize = require("sequelize")
const ICrud = require("./interfaces/interfaceCrud")

class Postgres extends ICrud {
    constructor() {
        super()
        this._driver = null
        this._heroes = null

    }

    // O underline no início indica que o metodo é privado.
    async connect() {
        this._driver = new Sequelize(
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
        await this.defineModel()
    }

    async defineModel() {
        //Definir como a tabela irá se comportar
        this._heroes = this._driver.define('heroes', {
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

        await this._heroes.sync()
    }

    async isConnected() {
        try {
            await this._driver.authenticate()
            console.log('Connected!')
            return true;

        } catch (error) {
            console.log('Fail!', error)
            return false;
        }
    }

    async create(item) {
        const { dataValues } = await this._heroes.create(item)
        return dataValues
    }
}

module.exports = Postgres