/*
    Interfaces

    JS não apresenta interface, assim simulando uma interface para
    que todas strategy sigam um contrato e quem não seguir (chamar um
    metodo que não existe) uma execption seja sinalizada.

*/

class NotImplementedException extends Error {
    constructor() {
        super("Not Implemented Exception")
    }
}

class ICrud {

    isContected(){
        throw new NotImplementedException()
    }

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

module.exports = ICrud