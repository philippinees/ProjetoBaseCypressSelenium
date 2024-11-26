import { Then } from "@badeball/cypress-cucumber-preprocessor";
import pessoasPage from "../../../pages/pessoas/pessoas.page"


Then('deve ser apresentada a pessoa vinculada ao cpf {string} na coluna {string} da tabela', (descricao, colunaTabela) => {
    pessoasPage.verificaConsultaRealizada(descricao,colunaTabela)
})

Then('deve realizar a consulta e visualizar uma mensagem informando que não há registros', () => {
    pessoasPage.visualizaMensagemNaoEncontraRegistros()
})

Then('deve realizar a consulta e visualizar uma mensagem de alerta indicando que o campo não pode ser vazio', () => {
    pessoasPage.visualizaMensagemValidacaoCampoVazio()
})
