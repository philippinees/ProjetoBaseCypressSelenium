const { When} = require('@cucumber/cucumber');
const ConsultaPessoas = require('../../../../page/cadastro/pessoas/pessoas.page')

When('clica no botao novo', async function () {
    await ConsultaPessoas.clicaBtnNovo()
}) 

When('clica na aba assinatura eletrônica', async function () {
    await ConsultaPessoas.clicaBtnAssinaturaEletronica()
})

When('preenche os campos da aba Pessoa',  async function () {
    await ConsultaPessoas.preencheFormularioAbaPessoa()
}) 

When('preenche os campso da aba de assinatura eletrônica', async function () {
    await ConsultaPessoas.preencheFormularioAbaAssinaturaEletronica()
})

When('clica no botão Avançar', async function () {
    await ConsultaPessoas.clicaBtnAvancar()
})

