describe('Teste Verifica Remessa', () => {
    before(() => {
        const titulo = {};

        cy.loginSupervisor('/c6bank')
        cy.acessarContrato('2217', 'Títulos')
        cy.get('div[role="grid"] tbody tr').first().dblclick();
        cy.get('[name="NossoNumero"]').invoke('val').then(nossoNumeroValue => {
            titulo.nossoNumero = nossoNumeroValue;
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
            const arquivo = `${baseDir}/DB.HOMEEQUITY.C6BANK_1151.TESTE_DEB.REM`;
            const comando_geraremgen = `cd ${baseDir} && . setAmb && geraremgen -d 07/08/2025 -c 002217 -u i 1 3 -s NL $(echo -e "\\0043") -o DB.HOMEEQUITY.C6BANK_1151.TESTE_DEB.REM -z SELECIONAPORDTVENCREC GERARHEADER TODOS`;

            cy.exec(comando_geraremgen, { failOnNonZeroExit: false });
            cy.exec(`ls ${arquivo}`, { failOnNonZeroExit: false });

            cy.readFile(arquivo).then((conteudo) => {
                const primeiraLinha = conteudo.split('\n')[0]
                const segundaLinha = conteudo.split('\n')[1]
                const terceiraLinha = conteudo.split('\n')[2]

                const conteudoHead = 'A11151';
                const headArquivo = primeiraLinha.substring(0, conteudoHead.length);
                expect(headArquivo).to.eq(conteudoHead);

                const nossoNumero = titulo.nossoNumero;
                const nossoNumeroArquivo = segundaLinha.substring(69, 69 + nossoNumero.length);
                expect(nossoNumeroArquivo).to.eq(nossoNumero);

                const [dia, mes, ano] = String(titulo.dataGeracao).split('/');
                cy.converterMes(mes).then((mesNumerico) => {
                    const dtGeracao = `${ano}${mesNumerico}${dia}`;
                    const dtGeracaoArquivo = primeiraLinha.substring(65, 65 + dtGeracao.length);
                    expect(dtGeracaoArquivo).to.eq(dtGeracao);
                });

                const valorTitulo = titulo.valorTitulo;
                const valorTituloArquivo = terceiraLinha.substring(18, 18 + valorTitulo.length);
                expect(valorTituloArquivo).to.eq(valorTitulo);
            });
        })
    });
});
