describe('Rotina de Maio e Junho', () => {

    it('Executa as Interface 88', () => {
        let dirbase = 'cd /home/itau-gestao/dados';
        let arquivoHoraInicio = '/home/itau-gestao/dados/TESTAVER/HORA-INTERFACES/INICIO/INTERFACE58';
        let arquivoHoraFim = '/home/itau-gestao/dados/TESTAVER/HORA-INTERFACES/FIM/INTERFACE58';
        let setamb = '. setAmb';

        cy.exec(`echo $(date +"%T") > ${arquivoHoraInicio}`)
        cy.exec(`${dirbase} && ${setamb} && gerainterfaces -a $SCCIDIRATV/arqs/xmlinterfaces/interface88.xml -x 000000 999999 -o $SCCIDIRATV/TESTAVER/DIARIO/interface88-VER -d 13/06/2025 -t`, { timeout: 5 * 60 * 1000 })
        cy.exec(`${dirbase} && ${setamb} && test -s $SCCIDIRATV/TESTAVER/DIARIO/interface88-VER`)
        cy.exec(`echo $(date +"%T") > ${arquivoHoraFim}`)
    });
});
