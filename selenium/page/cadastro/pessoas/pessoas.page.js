const PageBase = require("../../pageBase");
const elements = require('./elements');
const {informacaoPessoaCadastrada, informacaoPessoaCadastradaAssinaturaEletronica} = require('./values')

    class ConsultaPessoas extends PageBase{

        async clicaBtnAvancar(){
            await this.driver.findElement({id: elements.btnAvancar}).click()
        }

        async clicaBtnNovo(){
            await this.driver.findElement({id: elements.btnNovo}).click()
        }

        async clicaBtnAssinaturaEletronica(){
            await this.driver.findElement({id: elements.btnAssinaturaEletronica}).click()
        }

        async preencheFormularioAbaPessoa(){
            await this.preencheMultiplosCampos(camposAbaPessoas, informacaoPessoaCadastrada)
        }

        async preencheFormularioAbaAssinaturaEletronica(){
            await this.preencheMultiplosCampos(camposAbaAssinaturaEletronica, informacaoPessoaCadastradaAssinaturaEletronica)
        }

        async verificarElementosVisiveisPaginaCadastroPessoa(){
            const elementos = Object.values(elements.paginaConsultaOrgaos)
            for (let element of elementos) {
            expect(await this.driver.findElement(By.id(element)).isDisplayed()).to.be.true 
            }     
        }

        async verificaMensagemAlerta(mensagem){
            await this.VerificaAlerta(mensagem)
        }

    }

const camposAbaPessoas = [
    elements.formularioAbaPessoas.inputCPF,
    elements.formularioAbaPessoas.inputNomeMae,
    elements.formularioAbaPessoas.inputNome,
    elements.formularioAbaPessoas.inputDataNascimento,
    elements.formularioAbaPessoas.sexo,
]

const camposAbaAssinaturaEletronica = [
    elements.formularioAbaAssinaturaEletronica.usuario,
    elements.formularioAbaAssinaturaEletronica.senha,
    elements.formularioAbaAssinaturaEletronica.confirmarSenha,
]

module.exports = new ConsultaPessoas()