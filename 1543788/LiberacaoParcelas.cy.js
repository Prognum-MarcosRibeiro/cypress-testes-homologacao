describe('API LiberacaoParcelas', () => {
  const requestEndPoint = 'http://10.100.1.35/aejs/rest/w/wintegracao/liberacaoParcelas';
  const queryParams = {
    userName: 'loginintegracao',
    sessionKey: '123456',
    ambienteOperacional: '/itau-gestao/ambiente_integracao',
  };

  const requestBody = {
    dados: {
      CONTRATO: '1016158720',
      VA_LIBERACAO: 0.01,
      DT_LIBERACAO: '30/09/2025'
    }
  };

  it('Consumir API LiberacaoParcelas e validar valores', () => {
    cy.request({
      method: 'POST',
      url: requestEndPoint,
      qs: queryParams,
      body: requestBody
    }).then((response) => {
      cy.expect(response.status).to.eq(200);
      const valorApi = String(requestBody.dados.VA_LIBERACAO).replace('.', ',')

      const numeroContrato = "010161587200"
      const opcaoTreeView = "Mutuário"

      cy.loginSupervisor("/itau-gestao");
      cy.acessarContrato(numeroContrato, opcaoTreeView);
      cy.contains('Históricos').should('be.visible').click();
      cy.get('div[role="grid"] tbody tr').last().find('td').eq(1).dblclick();
      cy.contains("Valor de Liberação").parent().find("input").should("have.value", valorApi);
    });
  });
});