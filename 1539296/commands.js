//Comando para converter Mês(texto) para Mês(número)
Cypress.Commands.add('converterMes', (valor) => {
    const monthMap = {
        'jan': '01',
        'fev': '02',
        'mar': '03',
        'abr': '04',
        'mai': '05',
        'jun': '06',
        'jul': '07',
        'ago': '08',
        'set': '09',
        'out': '10',
        'nov': '11',
        'dez': '12'
    };

    const numberMap = Object.fromEntries(
        Object.entries(monthMap).map(([k, v]) => [v, k])
    );

    const normalizado = String(valor).toLowerCase();

    let resultado;
    if (monthMap[normalizado]) {
        resultado = monthMap[normalizado]; // abreviação -> número
    } else if (numberMap[normalizado.padStart(2, '0')]) {
        resultado = numberMap[normalizado.padStart(2, '0')]; // número -> abreviação
        resultado = resultado.charAt(0).toUpperCase() + resultado.slice(1); // primeira letra maiúscula
    } else {
        throw new Error(`O valor "${valor}" não é um mês válido.`);
    }

    return cy.wrap(resultado);
});

Cypress.Commands.add('loginSupervisor', (ambienteOperacional) => {
    const usuario = 'supervisor';
    const senha = 'Tempo+2023';

    cy.visit('http://10.100.1.35/aejs/');
    /*cy.visit('https://desenv.prognum.com.br/aejs/');*/
    cy.title().should('include', 'AEJS');

    cy.contains('Nome', { timeout: 10000 }).type(usuario);
    cy.contains('Senha').type(senha, { delay: 50 });
    cy.contains('Ambiente').type(ambienteOperacional);
    cy.contains('Login').click();
});



Cypress.Commands.add('acessarContrato', (numeroContrato, opcaoTreeView) => {
    cy.contains('SCCI').click();
    cy.contains('Contratos e Mutuários').click();
    cy.contains('Contrato').type(numeroContrato);
    cy.contains('Pesquisar').click();
    cy.contains(numeroContrato, { timeout: 10000 }).dblclick();

    opcaoTreeView === 'Mutuário' ? null : cy.contains(opcaoTreeView, { timeout: 30000 }).should('be.visible').click();
});

Cypress.Commands.add('acessarOperacao', (numeroOperacao, opcaoTreeView) => {
    cy.contains('Originação').click();
    cy.contains('Cadastro de operações').click();
    cy.contains('Operação:').type(numeroOperacao);
    cy.contains('Pesquisar').click()
    cy.contains(numeroOperacao, { timeout: 10000 }).dblclick();

    cy.contains('Telefone', { timeout: 30000 }).should('be.visible');
    opcaoTreeView === 'Pretendente' ? null : cy.get('[role="tabpanel"] a').contains('span', 'Documentos').click();

});
