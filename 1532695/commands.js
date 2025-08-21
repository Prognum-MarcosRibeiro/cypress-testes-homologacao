// Comandos Gerais:
Cypress.Commands.add('loginSupervisor', (ambienteOperacional) => {
    const usuario = 'supervisor';
    const senha = 'Tempo+2023';

    cy.visit('http://10.100.1.35/aejs/');
    cy.title().should('include', 'AEJS');

    cy.contains('Nome', { timeout: 10000 }).type(usuario);
    cy.contains('Senha').parent().find('input').type(senha, { delay: 50 });
    cy.contains('Ambiente').parent().find('input').type(ambienteOperacional);
    cy.contains('Login').click();
});

Cypress.Commands.add('acessarOperacao', (numeroOperacao, opcaoTreeView) => {
    cy.contains('Originação').click();
    cy.contains('Cadastro de operações').click();
    cy.contains('Operação:').parent().find('input').type(numeroOperacao);
    cy.contains('Pesquisar').click();
    cy.contains('00', { timeout: 10000 }).dblclick();

     opcaoTreeView === 'Pretendente' ? null : cy.contains(opcaoTreeView, { timeout: 30000 }).should('be.visible').click();

});

Cypress.Commands.add('registrarEImplantarContrato', () => {
  cy.contains('Registrar Contratação')
    .should('be.visible', { timeout: 20000 })
    .click();

  cy.get('[name="DIAVENCTO"]')
    .type('20')
    .type('{downarrow}{enter}');

  cy.get('input[name="DIAVENCTO"]').should('have.value', '20');

  cy.get('a[role="button"]', { timeout: 10000 })
    .contains('span', 'Sugerir número')
    .should('exist')
    .then($btn => {
      $btn[0].click();
    });

  cy.get('#ext-element-9').then($mask => {
    $mask.css('display', 'none');
  });

  cy.get('a[role="button"]', { timeout: 10000 })
    .contains('span', 'Registrar')
    .should('exist')
    .then($btn => {
      $btn[0].click();
    });

  cy.get('#ext-element-9').then($mask => {
    $mask.css('display', 'none');
  });

  cy.contains('span', 'Implantar Contrato', { timeout: 20000 }).click();

  cy.wait(13000);

  cy.get('a.x-btn')
    .contains('span', 'Implantar')
    .should('be.visible')
    .then($span => {
      const btn = $span.closest('a');
      btn[0].click();
    });

  cy.wait(6000);

  cy.contains('Confirmar').click();
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
