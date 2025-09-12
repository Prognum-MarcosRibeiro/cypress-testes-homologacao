describe('Teste Geração de títulos', () => {

        it('Validar emissão de títulos Débito em conta', () => {
            const baseDir = '/home/c6bank/dados';
            const comando_gemictit = `cd ${baseDir} && gemictit -d 07/09/2025 -c 002217 -n 0 G A J -m 0 999 -u r 1 -u i 3 -u b 2 -u l 1 -s D -f 1 07`;

            cy.exec(comando_gemictit, { failOnNonZeroExit: false }).then((result) => {
                cy.log(`STDOUT:\n${result.stdout}`);
                cy.log(`STDERR:\n${result.stderr}`);
            });
        });

    it('Validar Título no AEJS', () => {
        const numeroContrato = '002217';
        const opcaoTreeView = 'Títulos'

        cy.loginSupervisor('/c6bank')
        cy.contains('SCCI').click();
        cy.contains('Contratos e Mutuários').click();
        cy.contains('Contrato').type(numeroContrato);
        cy.contains('Pesquisar').click()
        cy.contains('002217-9', { timeout: 10000 }).dblclick();
        if (opcaoTreeView !== 'Mutuário') {
            cy.get('input[placeholder="Procura"]').type('Títulos');
           cy.contains(opcaoTreeView, { timeout: 10000 }).should('be.visible').scrollIntoView().click({ force: true });
        }
            cy.contains('td', '07/Set/2025').should('be.visible');

    });
});