const ICrud = require("./interfaces/interfaceCrud")

//Classe para lidar com o contexto do Banco de Dados - Postgres, MonggoDb, Outros...
class MongoDB extends ICrud{
    constructor(){
        super()

    }

    create(item){
        console.log('O item foi salvo no MongoDB')
    }
}

module.exports = MongoDB