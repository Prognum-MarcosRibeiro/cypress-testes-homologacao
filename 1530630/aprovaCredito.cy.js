const numeroOperacao = '000087665';

const valoresEsperados = {
      LTV: '50,00 %',
      PARCELA_MENSAL: '5.300,00',
      PRAZO_MESES: '240',
      FINANCIAMENTO: '284.000,00',
      JUROS: '21,8400 %',
      RENDA_COMPROVADA: '18.800,00',
      CR: '18,00 %',
      CRG: '50,00 %',
      CRR: '50,00 %',
      RATING: 'Azul'
};


describe('Validar API - AprovaCredito', () => {
    it('Consumindo a API e validando os campos na tela', () => {

        cy.loginSupervisor('/c6bank');
        cy.acessarOperacao(numeroOperacao, 'Limite e aprovação de crédito');

    cy.request({
      method: 'POST',
      url: '/aejs/rest/w/wintegracaoc6/AprovaCredito',
       qs: {
        userName: 'loginintegracao',
        sessionKey: '123456',
        ambienteOperacional: '/c6bank/ambiente_integracao'
       },
    headers: { 'Content-Type': 'application/json' },
    body: { 
        proposal_number: numeroOperacao ,
        code: 'CA'
    }
    }).then((response) => {
    cy.log('Status:', response.status);
    cy.log('Response body:', JSON.stringify(response.body));

    cy.get('[name="PARECER$PE_LTV"]').invoke('val').should('eq', valoresEsperados.LTV);
    cy.get('[name="PARECER$PARCELA_MENSAL"]').invoke('val').should('eq', valoresEsperados.PARCELA_MENSAL);
    cy.get('[name="PARECER$NU_PRAZO_MESES_OPERACAO"]').invoke('val').should('eq', valoresEsperados.PRAZO_MESES);
    cy.get('[name="PARECER$VA_FINANCIAMENTO"]').invoke('val').should('eq', valoresEsperados.FINANCIAMENTO);
    cy.get('[name="PARECER$PE_TX_NOM_JUROS"]').invoke('val').should('eq', valoresEsperados.JUROS);
    cy.get('[name="PARECER$VA_SOMA_RENDA"]').invoke('val').should('eq', valoresEsperados.RENDA_COMPROVADA);
    cy.get('[name="PARECER$VA_CR"]').invoke('val').should('eq', valoresEsperados.CR);
    cy.get('[name="PARECER$VA_CRG"]').invoke('val').should('eq', valoresEsperados.CRG);
    cy.get('[name="PARECER$VA_CRR"]').invoke('val').should('eq', valoresEsperados.CRR);
    cy.get('[name="PARECER$VA_RATING"]').invoke('val').should('eq', valoresEsperados.RATING);
      });
    });         
});
