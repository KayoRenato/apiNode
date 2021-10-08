// Esse arquivo foi refatorado para apresentar uma maior legibilidade

class NotImplementedException extends Error {
    constructor() {
        super("Not Implemented Exception")
    }
}

/*
    JS não apresenta interface, assim simulando uma interface para
    que todas strategy sigam um contrato e quem não seguir (chamar um
    metodo que não existe) uma execption seja sinalizada.

*/

//Interface
class ICrud {
    create(item) {
        throw new NotImplementedException()
    }

    read(query) {
        throw new NotImplementedException()

    }

    update(id, item) {
        throw new NotImplementedException()

    }

    delete(id) {
        throw new NotImplementedException()

    }
}

//Classe para lidar com o contexto do Banco de Dados - Postgres, MonggoDb, Outros...
class MongoDB extends ICrud{
    constructor(){
        super()

    }

    create(item){
        console.log('O item foi salvo no MongoDB')
    }
}

class Postgres extends ICrud{
    constructor(){
        super()

    }

    create(item){
        console.log('O item foi salvo no Postgres')
    }
}

class ContextStratagy {
    constructor(strategy) {
        this._database = strategy

    }

    create(item){
        return this._database.create(item)
    }

    read(query){
        return this._database.read(query)
    }

    update(id, item){
        return this._database.update(id, item)
    }

    delete(id){
        return this._database.delete(id)
    }

    

}

