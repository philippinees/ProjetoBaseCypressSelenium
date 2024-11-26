
const elements = require('./elements').ELEMENTS;


class pessoasPage {

    clicaBtnConsultar(){
        cy.get(elements.btnConsultar).click()
    }

    clicaBtnLogoff(){
        cy.contains(elements.menuBtnLogoff).click()
    }

    clicaItemUsuario(){
        cy.get(elements.menuUserLogin).click()
    }

    clicaBtnSairSistema(){
        cy.contains(elements.btnSairSistema).click()
    }

    clicaMenuModuloBeneficios(){
        cy.get(elements.menuModuloBeneficio).click()
    }

    clicaMenuConsultaProcessos(){
        cy.get(elements.menuItemConsultaProcessos).click()
    }

    navegaParaPaginaConsultaPessoas(){
        cy.visit(urlConsultaPessoas)
    }

    preencheCampoDescricao(descricao){
        cy.get(elements.inputDescricao).type(descricao)
    }

    verificaConsultaRealizada(){
        cy.get(elements.tabelaResultadosConsulta).contains(coluna).invoke('index').then((index) => {
            cy.get(`${elements.tabelaResultadosConsulta} ${elements.colunaTabelaResultadosConsulta}(${index + 1})`).each((colunaEncontrada, index) => {
                cy.get(elements.tabelaResultadosConsulta).find('tr').its('length').should('be.gt', 1);
                if(index > 0){
                    cy.get(colunaEncontrada).contains(new RegExp(descricao, 'i')).should('be.visible');
                }
            })
        })
    }

    selecionaPesquisarPorConsultaPessoas(selecionaPor){
        cy.get(elements.dropDowmListpesquisarPor).select(selecionaPor)       
    }

    visualizaMensagemNaoEncontraRegistros(){
        cy.commandverificaAlert(elements.btnConsultar,elements.txtNaoEncontraRegistros)
    }

    visualizaMensagemValidacaoCampoVazio(){
        cy.commandverificaAlert(elements.btnConsultar,elements.txtInformarCampos)
    }

}

export default new pessoasPage()
