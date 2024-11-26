const env = require('../../../../../cypress.env.json')
const faker = require('faker')

const users = Cypress.env('login');


class LoginPage{
    acessarSisprev(){
        cy.visit(`${env.config.UrlBase}${env.config.BaseDados}${env.config.sisprevweb}${env.config.login}`)
    }

    realizaAutenticacao(){

        const userKey = Cypress.env('usuario');
        const usuario = users[userKey];
        if(!usuario){
            const userFinal = env.usuario.login
            const senhaFinal = env.usuario.senha
            const options = {cacheSession: true}
            cy.commandrealizaLogin(userFinal, senhaFinal, options)

        }else{
            const userFinal = usuario.login
            const senhaFinal = usuario.senha
            const options = {cacheSession: true}
            cy.commandrealizaLogin(userFinal, senhaFinal, options)
        }
    }

}
export default new LoginPage();