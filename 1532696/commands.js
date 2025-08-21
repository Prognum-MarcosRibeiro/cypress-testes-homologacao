// Comandos Gerais:
Cypress.Commands.add('loginSupervisor', (ambienteOperacional) => {
    const usuario = 'claudia.sovenhi';
    const senha = '2';

    cy.visit('http://10.100.1.35/aejs/');
    cy.title().should('include', 'AEJS');

    cy.contains('Nome', { timeout: 10000 }).type(usuario);
    cy.contains('Senha').type(senha, { delay: 50 });
    cy.contains('Ambiente').type(ambienteOperacional);
    cy.contains('Login').click();
});

Cypress.Commands.add('acessarOperacao', (numeroOperacao, opcaoTreeView) => {
    cy.contains('Originação').click();
    cy.contains('Cadastro de operações').click();
    cy.contains('Operação:').type(numeroOperacao);
    cy.contains('Pesquisar').click()
    cy.contains('Cypress User', { timeout: 10000 }).dblclick();

    opcaoTreeView === 'Pretendente' ? null : cy.contains(opcaoTreeView, { timeout: 30000 }).should('be.visible').click();
});

// Gravação dos teste de navegação:
Cypress.Commands.add('gravaResultadoNavegacao', ({ cliente_id = 1, nome_teste, status, inicio_execucao, fim_execucao, erro = null }) => {
    const duracaoSegundos = Math.floor(
        (new Date(`1970-01-01T${fim_execucao}Z`) - new Date(`1970-01-01T${inicio_execucao}Z`)) / 1000
    );

    const data = new Date().toISOString().split('T')[0];

    return cy.request({
        method: 'POST',
        url: 'http://10.100.1.35:3001/resultados/navegacao',
        body: {
            cliente_id,
            nome_teste,
            status,
            data,
            inicio_execucao,
            fim_execucao,
            erro,
            duracao: duracaoSegundos,
        },
        failOnStatusCode: false,
    });
});






