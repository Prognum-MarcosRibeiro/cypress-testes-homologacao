describe('Rotina de Maio e Junho', () => {

    it('Executa o calcIR e a interface 76', () => {
        let dirbase = 'cd /home/itau-gestao/dados'
        let setamb = '. setAmb'

        cy.exec(`${dirbase} && ${setamb} && gerainterfaces -a $SCCIDIRATV/arqs/xmlinterfaces/interface76.xml -x 000000 999999 -o $SCCIDIRATV/TESTAVER/DIARIO/interface76-01-VER.xml -d 30/06/2025`)
        cy.exec(`${dirbase} && ${setamb} && test -s $SCCIDIRATV/TESTAVER/DIARIO/interface76-01-VER.xml`)
    });
});
