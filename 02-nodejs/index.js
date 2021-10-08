/*
0 - Obter um usuario
1 - Obter o numero de telefone de um usuario a partir de seu ID
2 - Obter o endereco do usuario pelo ID
*/

// importamos um modulo interno do node.js
const { waitForDebugger } = require('inspector')
const util = require('util')
const obterEnderecoAsync = util.promisify(obterEndereco)

function obterUsuario() {
    // quando der algum problema -> reject(ERRO)
    // quando der sucesso -> resolve
    return new Promise(function resolvePromise(resolve, reject) {
        setTimeout(function () {
            // return reject(new Error('Erro na Obtencao de Usuario'))

            return resolve({
                id: 1,
                nome: 'Kayo',
                dataNascimento: new Date()
            })
        }, 1000)

    })

}

function obterTelefone(idUsuario) {

    return new Promise(function resolvePromise(res, rej) {
        setTimeout(() => {
            return res({
                telefone: '111122212',
                ddd: 81
            })
        }, 2000);

    })

}

function obterEndereco(idUsuario, callback) {
    setTimeout(() => {
        return callback(null, {
            rua: 'Rua Montana',
            numero: 29
        })
    }, 2000);
}

// 1º Passo - Adicionar a palavra asymc -> automaticamente ela retornará uma Promise
main()
async function main(){
    try {

        console.time('medida-promise')
        const usuario = await obterUsuario()
        // const endereco = await obterEnderecoAsync(usuario.id)
        // const telefone = await obterTelefone(usuario.id)
        const result = await Promise.all([
            obterTelefone(usuario.id),
            obterEnderecoAsync(usuario.id)
        ])
        
        const telefone = result[0]
        const endereco = result[1]
        

        console.log(
            `
            Nome: ${usuario.nome}
            Endereco:${endereco.rua}, ${endereco.numero}
            Telefone: (${telefone.ddd}) ${telefone.telefone} 
            `
        )
        console.timeEnd('medida-promise')
        
    } catch (error) {
        console.error('Deu Error', error)
    }
}


// obterUsuario(function resolverUsuario(error, usuario) {
//     //null || "" || 0 == false
//     if (error) {
//         console.error('Error na obtencao de USUARIO', error)
//         return;
//     }

//     obterTelefone(usuario.id, function resolverTelefone(error1, telefone) {
//         if (error1) {
//             console.error('Error na obtencao do TELEFONE', error1)
//             return;
//         }

//         obterEndereco(usuario.id, function resolverEndereco(error2, endereco) {
//             if(error2) {
//                 console.error('Error na obtencao do ENDERECO', error2)
//                 return;
//             }

//             console.log(`
//                 Nome: ${usuario.nome},
//                 Telefone: (${telefone.ddd}) ${telefone.telefone},
//                 Endereco: ${endereco.rua}, ${endereco.numero}
//             `)
//         })
//     })
// })



// const usuarioPromise = obterUsuario()
// para manipular o sucesso, usamos a funcao  .then
// para manipular erros, usamos a funcao .catch
// usuario -> telefone -> telefone

// usuarioPromise
//     .then(
//         function (usuario) {
//             return obterTelefone(usuario.id)
//                 .then(function resolveTelefone(res) {
//                     return {
//                         usuario: {
//                             id: usuario.id,
//                             nome: usuario.nome
//                         },
//                         telefone: res
//                     }
//                 })
//         })
//     .then(function (promiseRes) {
//         const endereco = obterEnderecoAsync(promiseRes.usuario.id)

//         return endereco.then(function resolverEndereco(res) {
//             return {
//                 ...promiseRes,
//                 endereco: res
//             }
//         });
//     })
//     .then(function (promiseRes) {
//         console.log(`
//         Nome: ${promiseRes.usuario.nome}
//         Endereco:${promiseRes.endereco.rua}, ${promiseRes.endereco.numero}
//         Telefone: (${promiseRes.telefone.ddd}) ${promiseRes.telefone.telefone} 
//         `)
//     })
//     .catch(function (error) {
//         console.error('Erro:', error)
//     })