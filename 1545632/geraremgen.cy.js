describe('Geração e listagem de arquivos', () => {
    const dirBase = '/home/itau-gestao/dados';
    const setAmb = '. setAmb';


    function execCmd(cmds, opts = {}) {
        if (Array.isArray(cmds)) {
            cmds.forEach(c => cy.exec(`cd ${dirBase} && ${setAmb} && ${c}`, {
                timeout: 100 * 60 * 1000,
                ...opts,
        }));
    } else {
        cy.exec(`cd ${dirBase} && ${setAmb} && ${cmds}`, {
            timeout: 10 * 60 * 1000,
            ...opts,
        });
     }
    }

    it('Gerar remessas (geraremgen)', () => {
        execCmd([
            `geraremgen -d 01/06/2025 -x 000000 999999 -u r 0.01 -u i 1 5 -o $SCCIDIRATV/TESTAVER/DIARIO/interface127-01-VER.xml -s NM -z SELECCOBELETRONICA GERARHEADER`,
            `geraremgen -d 16/06/2025 -x 000000 999999 -u r 0.01 -u i 3 4 -o $SCCIDIRATV/TESTAVER/DIARIO/interface92-01-VER.xml -s NM -z SELECPORDTGERACAOTIT SELECCOBELETRONICA GERARHEADER`,
        ]);
    });

    it('Listar contaminacao', () => {
        execCmd([
            `lsdb -d $SCCIDIRATV -F"|" Registro_contaminacao_cura > $SCCIDIRATV/TESTAVER/REGCONTCURA_VER`
        ]);
    });

     it('Listar baixa prejuizo', () => {
        execCmd([
            `lsdb -d $SCCIDIRATV -F"|" Registro_baixa_prejuizo > $SCCIDIRATV/TESTAVER/REGBAIXAPREJUIZO_VER`
        ]);
    });
});
