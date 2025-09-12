describe('Teste Verifica Remessa', () => {
    before(() => {
        const titulo = {};
        cy.loginSupervisor('/c6bank')
        cy.acessarContrato('3020', 'Títulos')
        cy.get('div[role="grid"] tbody tr').first().dblclick();
        cy.get('[name="NossoNumero"]').invoke('val').then(nossoNumeroValue => {
            titulo.nossoNumero = nossoNumeroValue.substring(3);
        });
        cy.get('[name="dtgeracaotit"]').invoke('val').then(dataGeracaoValue => {
            titulo.dataGeracao = dataGeracaoValue;
        });
        cy.contains('Valores e Baixa').click();
        cy.get('[name="ValTit"]').invoke('val').then(valorTituloValue => {
            titulo.valorTitulo = valorTituloValue.replace(',', '').replace('.', '');
        });

        cy.log('Dados da Primeira Linha:', JSON.stringify(titulo));
        cy.wrap(titulo).as('primeiroTitulo');

        cy.get('@primeiroTitulo').then((titulo) => {
            cy.log('--- Dados Capturados ---');
            cy.log('Nosso Número Original:', titulo.nossoNumero);
            cy.log('Data de Geração:', titulo.dtGeracao);
            cy.log('Valor do Título:', titulo.valorTitulo);
        });
    });

    it('Validar emissão de títulos Débito em conta', () => {
        cy.get('@primeiroTitulo').then((titulo) => {
            const baseDir = '/home/c6bank/dados';
            const arquivo = `${baseDir}/REM-HE-0001-00553875-TESTE-1032.REM`;
            const comando_geraremgen = `cd ${baseDir} && geraremgen -d 01/08/2025 -c 003020 -u i 3 4 -o REM-HE-0001-00553875-TESTE-1032.REM`;

            cy.exec('. setAmb', { failOnNonZeroExit: false });
            cy.exec(comando_geraremgen, { failOnNonZeroExit: false });
            cy.exec(`ls ${arquivo}`, { failOnNonZeroExit: false });

            cy.readFile(arquivo).then((conteudo) => {
                const primeiraLinha = conteudo.split('\n')[0]
                const segundaLinha = conteudo.split('\n')[1]

                const conteudoHead = '01REMESSA01COBRANCA';
                const headArquivo = primeiraLinha.substring(0, conteudoHead.length);
                expect(headArquivo).to.eq(conteudoHead);

                const nossoNumero = titulo.nossoNumero;
                const nossoNumeroArquivo = segundaLinha.substring(62, 62 + nossoNumero.length);
                expect(nossoNumeroArquivo).to.eq(nossoNumero);

                const [dia, mes, ano] = String(titulo.dataGeracao).split('/');
                cy.converterMes(mes).then((mesNumerico) => {
                    const dtGeracao = `${dia}${mesNumerico}${ano.slice(-2)}`;
                    const dtGeracaoArquivo = primeiraLinha.substring(94, 94 + dtGeracao.length);
                    expect(dtGeracaoArquivo).to.eq(dtGeracao);
                });

                const valorTitulo = titulo.valorTitulo;
                const valorTituloArquivo = segundaLinha.substring(133, 133 + valorTitulo.length);
                expect(valorTituloArquivo).to.eq(valorTitulo);
            });
        })
    });
});
