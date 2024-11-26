import env from "../../cypress.env.json"
import sqlServer from 'cypress-sql-server';
import "cypress-file-upload";
const elements = require('../src/e2e/pages/login/elements').ELEMENTS

sqlServer.loadDBCommands();


/** Comando que grava as sessões do usuário para ser utilizado nos demais testes
 @param {number} user - login do usuário no sistema
 @param {string} senha - senha do usuário no sistema
 @param {string} cacheSession - comando que grava os dados da sessão
 * 
*/

Cypress.Commands.add('commandrealizaLogin', (user, senha, { cacheSession = true } = {}) => {
    const login = () => {
        cy.visit(`${env.config.UrlBase}${env.config.BaseDados}${env.config.sisprevweb}${env.config.login}`)
        cy.get(elements.inputLogin).type(user, { log: false })
        cy.get(elements.inputSenha).type(senha, { log: false })
        cy.get(elements.btnAcessar).click({ force: true })
    }

    const options = {
        cacheAcrossSpecs: true,
    }

    if (cacheSession) {
        cy.session(user, login, options)
    } else {
        login()
    }
})

/** Comando que verifica os alerts apresentado no sistema
 @param {stringHTML} botao - elemento html do botao
 @param {string} mensagemEsperada - mensagem que espera ser apresentada no alert
*/

Cypress.Commands.add('commandverificaAlert', (botao, mensagemEsperada) => {
    cy.get(botao).click()
    cy.on('window:alert', (mensagem) => {
        expect(mensagem).to.contain(mensagemEsperada);
    })
})