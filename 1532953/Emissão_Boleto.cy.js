describe('Teste Geração de títulos', () => {

    it('Validar emissão de títulos Débito em conta', () => {
        const baseDir = '/home/c6bank/dados';
        const comando_gemictit = `cd ${baseDir} && . setaamb && gemictit -d 11/09/2025 -c 003020 -n 0 G A J -m 0 999 -u r 1 -u i 3 -u l 3 -f 11 21`;

        cy.exec(comando_gemictit, { failOnNonZeroExit: false });
    });

    it('Acessar AEJS', () => {
        const numeroContrato = '003020';
        const opcaoTreeView = 'Títulos'

        cy.loginSupervisor('/c6bank')
        cy.contains('SCCI').click();
        cy.contains('Contratos e Mutuários').click();
        cy.contains('Contrato').type(numeroContrato);
        cy.contains('Pesquisar').click()
        cy.contains('003020-1', { timeout: 10000 }).dblclick();
        if (opcaoTreeView !== 'Mutuário') {
            cy.get('input[placeholder="Procura"]').type('Títulos');
            cy.contains(opcaoTreeView, { timeout: 10000 }).should('be.visible').scrollIntoView().click({ force: true });
        }
        cy.contains('td', '11/Set/2025').should('be.visible');

    });
});