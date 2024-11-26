Feature: Usuário realiza o cadastros de novas pessoas

    Background:
        Given o Usuário está logado no sistema
        When navega para a página de Consulta de pessoas

    Scenario: O usuário verifica se todos os campos do formulário estão sendo apresentados corretamente
        And clica no botao novo
        Then Deve ser apresentado todos os campos corretamente no formulário para o cadastro de pessoas

    Scenario: O usuário tenta cadastrar um segurado sem preencher os campos obrigatórios
        And clica no botao novo
        Then deve visualizar a mensagem "Por favor, preencha os campos em vermelho" no alert

    Scenario: O usuário preenche todos os campos obrigatórios da aba pessoas mas não preenche os da assinatura eletrônica
        And clica no botao novo
        And preenche os campos da aba Pessoa
        And clica na aba assinatura eletrônica
        And preenche os campso da aba de assinatura eletrônica
        And clica no botão Avançar
        Then deve visualizar a mensagem "Por favor, preencha os campos em vermelho" no alert
