describe('Implantação de contrato', () => {
  it('Deve capturar valores no Resumo Completo e validar após implantação', () => {
    const validaDados = {}

    cy.loginSupervisor('/c6bank');
    cy.acessarOperacao('000422063', 'Dados da Operação');
    cy.contains('Resumo Completo', { timeout: 20000 }).should('be.visible').click();

    cy.get('[name="OPERACAO_CREDITO$VA_OPERACAO"]').invoke('val').then(financiamento => {
      validaDados.financiamento = financiamento?.trim() || ''

      cy.get('[name="IMOVEL_OPERACAO$VA_AVALIACAO_PROVISORIA"]').invoke('val').then(avaliacao => {
        validaDados.avaliacao = avaliacao?.trim() || ''

        cy.get('[name="OPERACAO_CREDITO$NU_PRAZO_MESES_OPERACAO"]').invoke('val').then(prazo => {
          validaDados.prazo = prazo?.trim() || ''

          cy.log('Dados capturados:', JSON.stringify(validaDados))
          expect(validaDados.financiamento).to.not.be.empty
          expect(validaDados.avaliacao).to.not.be.empty
          expect(validaDados.prazo).to.not.be.empty
        })
      })
    })

    cy.registrarEImplantarContrato();

    cy.contains('label', 'Contrato:')
      .parent()
      .parent()
      .within(() => {
        cy.get('a[role="button"]')
          .filter(':has(span)')
          .first()
          .click({ force: true });
      });

    cy.contains('Financiamento').should('be.visible').click();

    const camposSegundaTela = {
      '[name="CADMUT_FINANC_VALFINANC"]': 'financiamento',
      '[name="CADMUT_FINANC_VALAVAL"]': 'avaliacao',
      '[name="CADMUT_FINANC_PRAZO"]': 'prazo'
    };

    Object.entries(camposSegundaTela).forEach(([selector, chave]) => {
      cy.get(selector).invoke('val').then(valor => {
        expect((valor || '').trim()).to.equal(validaDados[chave]);
      });
    });
  })
});
