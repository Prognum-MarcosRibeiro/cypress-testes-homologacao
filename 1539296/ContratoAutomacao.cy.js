describe('API ContratoAutomacao', () => {
  const requestEndPoint = 'http://10.100.1.35/aejs/rest/w/wintegracao/contratoAutomacao';
  const queryParams = {
    sessionKey: '123456',
    userName: 'loginintegracao',
    ambienteOperacional: '/itau-gestao/ambiente_integracao',
    contrato: '1016085010',
    dataref: '04/09/2025'
  };

  it('Consumir API ContratoAutomacao e validar valores', () => {
    cy.request({
      method: 'GET',
      url: requestEndPoint,
      qs: queryParams
    }).then((response) => {
      cy.expect(response.status).to.eq(200);

      const dadosOperacao = response.body.DADOS_OPERACAO;
      const parcelas = response.body.PARCELA;

      const primeiraParcela = parcelas[0];
      const ultimaParcela = parcelas[parcelas.length - 1];

      const primeiraOperacao = dadosOperacao[0];
      const ultimaOperacao = dadosOperacao[dadosOperacao.length - 1];

      cy.log('Primeira parcela:', JSON.stringify(primeiraParcela));
      cy.log('Última parcela:', JSON.stringify(ultimaParcela));
      cy.log('Primeira operação:', JSON.stringify(primeiraOperacao));
      cy.log('Última operação:', JSON.stringify(ultimaOperacao));

      const numeroContrato = '0010160850104';
      const opcaoTreeView = 'Evolução Teórica';

      cy.loginSupervisor('/itau-gestao');
      cy.acessarContrato(numeroContrato, opcaoTreeView);
      // validar primeira parcela na grid
      const [diaPrimParc, mesPrimParc, anoPrimParc] = String(primeiraParcela.DATA_VENCIMENTO_PRESTACAO).split('/');
      cy.converterMes(mesPrimParc).then((mesNumerico) => {
        const dtPrimeiraParcela = `${diaPrimParc}/${mesNumerico}/${anoPrimParc}`;
        cy.get('div[role="grid"] tbody tr').first().find('td').eq(1).should('have.text', dtPrimeiraParcela);
        cy.get('div[role="grid"] tbody tr').first().find('td').eq(3).should('contain.text', primeiraParcela.VALOR_AMORTIZACAO_PRESTACAO);
      });
      const [diaUltParc, mesUltParc, anoUltParc] = String(ultimaParcela.DATA_VENCIMENTO_PRESTACAO).split('/');
      cy.converterMes(mesUltParc).then((mesNumerico) => {
        const dtUltimaParcela = `${diaUltParc}/${mesNumerico}/${anoUltParc}`;
        cy.get('div[role="grid"] tbody tr').last().find('td').eq(1).should('have.text', dtUltimaParcela);
        const valorFormatado = Number(ultimaParcela.VALOR_AMORTIZACAO_PRESTACAO).toLocaleString('pt-BR', {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2
        });
        cy.get('div[role="grid"] tbody tr').last().find('td').eq(3).should('contain.text', valorFormatado);
      })
      cy.contains('Mutuário').dblclick();
      cy.contains('Históricos', { timeout: 30 * 1000 }).click();

      const [diaPrimOp, mesPrimOp, anoPrimOp] = String(primeiraOperacao.DATA_OPERACAO).split('/');
      cy.converterMes(mesPrimOp).then((mesNumerico) => {
        const dtPrimeiraOperacao = `${diaPrimOp}/${mesNumerico}/${anoPrimOp}`;
        cy.get('div[role="grid"] tbody tr').should('contain.text', dtPrimeiraOperacao);
      });

      const [diaUltOp, mesUltOp, anoUltOp] = String(ultimaOperacao.DATA_OPERACAO).split('/');
      cy.converterMes(mesUltOp).then((mesNumerico) => {
        const dtUltimaOperacao = `${diaUltOp}/${mesNumerico}/${anoUltOp}`;
        cy.get('[role="rowgroup"][style*="overflow: hidden auto"]').eq(1).scrollTo('bottom');
        cy.contains('div[role="grid"] tbody tr td', dtUltimaOperacao, { timeout: 10000 }).should('be.visible')
      });
    });
  });
});