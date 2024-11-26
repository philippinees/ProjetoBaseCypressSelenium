const { Then} = require('@cucumber/cucumber');
const ConsultaPessoas = require('../../../../page/cadastro/pessoas/pessoas.page')

Then('Deve ser apresentado todos os campos corretamente no formulário para o cadastro de pessoas', async () => {
    await ConsultaPessoas.verificarElementosVisiveisPaginaCadastroPessoa()
}) 

Then('deve visualizar a mensagem {string} no alert', async function (mensagem){
    await ConsultaPessoas.verificaMensagemAlerta(mensagem)
})