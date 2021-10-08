const ICrud = require("../interfaces/interfaceCrud")

class ContextStratagy extends ICrud{
    constructor(strategy) {
        super()
        this._database = strategy

    }

    isContected() {
        return this._database.isContected()
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

module.exports = ContextStratagy