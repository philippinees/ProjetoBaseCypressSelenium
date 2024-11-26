const { BeforeAll, AfterAll } = require('@cucumber/cucumber');
const AutenticacaoPage = require('../page/autenticacao/autenticacao.page') 

BeforeAll(async function () {
 await AutenticacaoPage.autenticar()
});

AfterAll(async function () {
  await AutenticacaoPage.close()
});
