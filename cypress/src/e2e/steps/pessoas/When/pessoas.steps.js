import { When } from "@badeball/cypress-cucumber-preprocessor";
import pessoasPage from "../../../pages/pessoas/pessoas.page"

When('navega para a página de Consulta de pessoas', () => {
    pessoasPage.navegaParaPaginaConsultaPessoas()
})

When('seleciona pesquisar por {string} para consultar pessoa', (selecionaPor) => {
    pessoasPage.selecionaPesquisarPorConsultaPessoas(selecionaPor)
})

When('informa a descricao {string}', (descricao) => {
    pessoasPage.preencheCampoDescricao(descricao)
})

When('clica no botão Consulta para realizar a consulta', () => {
    pessoasPage.clicaBtnConsultar()
})