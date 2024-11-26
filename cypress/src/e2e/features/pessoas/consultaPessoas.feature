Feature: Usuário realiza consultas na página de consulta de pessoas

    Background:
        Given o Usuário está logado no SisprevWeb
        When navega para a página de Consulta de pessoas
    
    Scenario: o usuário realiza uma consulta com um cpf válido
        And seleciona pesquisar por "CPF" para consultar pessoa 
        And informa a descricao "###.###.###-##" 
        And clica no botão Consulta para realizar a consulta
        Then deve ser apresentada a pessoa vinculada ao cpf "###.###.###-##" na coluna "Descrição" da tabela

    Scenario: o usuário realiza uma consulta com um cpf inválido
        And seleciona pesquisar por "CPF" para consultar pessoa 
        And informa um cpf inválido "1111111111111"
        Then deve realizar a consulta e visualizar uma mensagem informando que não há registros    

    Scenario: o usuário realiza uma consulta sem informar nenhum dado no campo Descrição
        Then deve realizar a consulta e visualizar uma mensagem de alerta indicando que o campo não pode ser vazio
