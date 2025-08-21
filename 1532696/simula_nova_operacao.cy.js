function selecionarCampo(name, valor) {
  cy.get(`[name="${name}"]`).type('{downarrow}');
  cy.contains('li', valor).click();
}

function RealizaSimulacao() {
  cy.contains('Originação').click();
  cy.contains('Realizar nova simulação').click();

  selecionarCampo("CO_GRUPO_TIPO_OPERACAO_A01", "WEB");
  selecionarCampo("CO_GRUPO_TIPO_OPERACAO_B01", "Pessoa Física");
  selecionarCampo("CO_GRUPO_TIPO_OPERACAO_B02", "Imóvel Residencial");
  selecionarCampo("CO_GRUPO_TIPO_OPERACAO_B04", "Empréstimo com Garantia Imobiliária");
  selecionarCampo("CO_GRUPO_TIPO_OPERACAO_B06", "Pós-fixado");
  selecionarCampo("CO_SISTEMA_AMORTIZACAO", "PRICE");

  cy.get('[name="VA_IMOVEL"]').type('500000');
  cy.get('[name="VA_FINANCIAMENTO"]').type('150000');

  cy.get('[name="CO_SEGURADORA"]').type('ZURICH'); 
  cy.get('li[data-recordid="107"]').should('be.visible').click();

  cy.get('[name="DT_NASCIMENTO"]').type('04/Jan/2004');

  cy.get('[name="NU_MES_PULA_PARCELA"]').clear().type('Janeiro');
  cy.contains('li', 'Janeiro').click();

  cy.contains('Prosseguir').click();
}

function EscolhePrazo() {
  cy.get('[name="NU_MESES_PRAZO"]').type('240');
  cy.contains('Prosseguir').click();
}

function GravaProposta() {
  cy.contains('Gravar Proposta', { timeout: 10000 }).should('be.visible').click();

  cy.get('[name="NU_CPF_AUX"]', { timeout: 10000 }).type('20861321740');
  cy.get('[name="NO_PESSOA"]').type('Izaque Fiuza');
  cy.get('[name="NU_AGENCIA"]').type('123');
  cy.get('[name="NU_CONTA_CORRENTE"]').type('123');

  cy.contains('Enviar Proposta')
    .parents('div')
    .find('span')
    .contains('Gravar Proposta')
    .click();
}




//-----PARTE A SER APAGADA-----//
function AcessarOperacao() {
  cy.contains('Fechar tela').click();
  cy.contains('Originação').click();
  cy.contains('Cadastro de operações').click();
  cy.contains('CPF/CNPJ').should('be.visible').type('20861321740'); 
  cy.contains('Pesquisar').click();
  cy.contains('Izaque Fiuza').should('be.visible').dblclick({ force: true });
}
//------------------------------//




function ValidaOperacao() {
  cy.get('[name="NO_PESSOA"]').should('have.value', 'Izaque Fiuza');
  cy.get('[name="PESSOA_PRETENDENTE$NU_CPFCNPJ"]').should('have.value', '208.613.217-40');
  cy.get('[name="IMOVEL_OPERACAO$VA_AVALIACAO_PROVISORIA"]').should('have.value', '500.000,00');
  cy.get('[name="aejs-numberfield-1431-inputEl"]').should('have.value', '150.000,00');
  
  cy.contains('td', 'Izaque Fiuza', { timeout: 10000 }).dblclick({ force: true });

  cy.get('[name="PESSOA$NU_CPFCNPJ"]').should('have.value', '208.613.217-40');
  cy.get('[name="PESSOA$NO_PESSOA"]').should('have.value', 'Izaque Fiuza');
  cy.get('[name="PESSOA$DT_NASCIMENTO"]').should('have.value', '04/Jan/2004');
}


describe('Cria Nova Simulação', () => {
  it('Deve realizar uma simulação com sucesso', () => {
    cy.loginSupervisor('/c6bank/');
    RealizaSimulacao();
    cy.contains('Prosseguir').click();
    EscolhePrazo();
    GravaProposta();

    //-----PARTE A SER APAGADA-----//
    AcessarOperacao();
    //------------------------------//

    ValidaOperacao();
  });
});
