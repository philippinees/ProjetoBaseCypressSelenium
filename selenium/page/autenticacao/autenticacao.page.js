const { By } = require('selenium-webdriver')
const elements = require('./elements')
const dados = require('../../../cypress.env.json')
const PageBase = require('../pageBase')
const routerAutenticacao = require('../../../routes/autenticacao/router.autenticacao')
const sl = require('../sl/sl')
class AutenticacaoPage extends PageBase {

    async autenticar() {
        await this.driver.manage().window().maximize()
        await this.driver.get(routerAutenticacao.login())
        await sl.get(elements.btnLogin).isDisplayed()
        await sl.get(elements.btnLogin).type(dados.usuario.login)
        await sl.get(elements.btnSenha).type(dados.usuario.senha)
        await sl.get('.botoes').click()
        let btnX = await sl.get(elements.labelLogadoComSucesso).isDisplayed()
        await btnX.click()
    }
}

module.exports = new AutenticacaoPage()