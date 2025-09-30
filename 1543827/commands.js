// Comandos Gerais:
Cypress.Commands.add('loginSupervisor', (ambienteOperacional) => {
    const usuario = 'supervisor';
    const senha = 'Tempo+2023';

    // cy.visit('http://10.100.1.35/aejs/');
    cy.visit('http://10.3.98.108/aejs/');
    cy.title().should('include', 'AEJS');

    cy.contains('Nome', { timeout: 10000 }).type(usuario);
    cy.contains('Senha').type(senha, { delay: 50 });
    cy.contains('Ambiente').type(ambienteOperacional);
    cy.contains('Login').click();
});

Cypress.Commands.add('acessarOperacao', (numeroOperacao, nomePretendente, opcaoTreeView) => {
    cy.contains('Originação').click();
    cy.contains('Cadastro de operações').click();
    cy.contains('Operação:').type(numeroOperacao);
    cy.contains('Pesquisar').click();
    cy.contains(nomePretendente, { timeout: 10000 }).dblclick();
    // opcaoTreeView === 'Pretendente' ? null : cy.contains(opcaoTreeView, { timeout: 30000 }).should('be.visible').click();
});

Cypress.Commands.add('acessarContrato', (numeroContrato, opcaoTreeView) => {
    cy.contains('SCCI').click();
    cy.contains('Contratos e Mutuários').click();
    cy.contains('Contrato:').type(numeroContrato);
    cy.contains('Pesquisar').click();
    cy.contains(numeroContrato, { timeout: 10000 }).dblclick();

    opcaoTreeView === 'Mutuário' ? null : cy.contains(opcaoTreeView, { timeout: 30000 }).should('be.visible').click();
});

// Comando para converter Mês(Texto) para Mês(Número)
Cypress.Commands.add('converterMes', (mes) => {
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

    const padraoMes = mes.toLowerCase();
    const mesNumerico = monthMap[padraoMes];

    if (!mesNumerico) {
        throw new Error(`A abreviação de mês "${mes}" não é válida.`);
    }
    return cy.wrap(mesNumerico);
});

// Comando para realizar o Soft Assert:
let softErrors = [];

Cypress.Commands.add('softAssert', (condition, message) => {
    if (!condition) {
        cy.log(`❌ ${message}`);
        softErrors.push(message);
    }
});

Cypress.Commands.add('checkSoftAsserts', () => {
    if (softErrors.length > 0) {
        cy.wrap(null, { log: false }).then(() => {
            throw new Error(`Erro(s) encontrado(s):\n${softErrors.join('\n')}`);
        });
    }
});

beforeEach(() => {
    softErrors = [];
});

// Comandos de Gravação dos Resultados:
Cypress.Commands.add("gravarResultadosNavegacao", (dados) => {
    cy.request("POST", "http://10.100.1.35:3000/resultados/navegacao", dados);
});
Cypress.Commands.add("gravarResultadosApi", (dados) => {
    cy.request("POST", "http://10.100.1.35:3000/resultados/api", dados);
});
Cypress.Commands.add("gravarResultadosLinux", (dados) => {
    cy.request("POST", "http://10.100.1.35:3000/resultados/linux", dados);
});
Cypress.Commands.add("gravarResultadosPdf", (dados) => {
    cy.request("POST", "http://10.100.1.35:3000/resultados/pdf", dados);
});
Cypress.Commands.add("gravarResultadosPlanilhas", (dados) => {
    cy.request("POST", "http://10.100.1.35:3000/resultados/planilhas", dados);
});
Cypress.Commands.add("gravarResultadosEsteira", (dados) => {
    cy.request("POST", "http://10.100.1.35:3000/resultados/esteira", dados);
});


//Executa relAC145 e gera um arquivo por dia útil
Cypress.Commands.add('contarDiasUteis', (month, year) => {
  const businessDays = [];
  const date = new Date(year, month - 1, 1); 

  while (date.getMonth() === month - 1) {
    const dayOfWeek = date.getDay();
    if (dayOfWeek !== 0 && dayOfWeek !== 6) {
      businessDays.push(date.getDate()); 
    }
    date.setDate(date.getDate() + 1);
  }

  return cy.wrap(businessDays);
});