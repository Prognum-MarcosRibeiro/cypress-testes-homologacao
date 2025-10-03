describe('Rotina de Maio e Junho', () => {

    it('Executa o Anexo16', () => {
        let dirbase = 'cd /home/itau-gestao/dados'
        let arquivoHoraInicio = '/home/itau-gestao/dados/TESTAVER/HORA-INTERFACES/INICIO/NOVOANEXO16'
        let arquivoHoraFim = ' /home/itau-gestao/dados/TESTAVER/HORA-INTERFACES/FIM/NOVOANEXO16'
        let setamb = '. setAmb'

        cy.exec(`echo $(date +"%T") > ${arquivoHoraInicio}`);
        cy.exec(`${dirbase} && ${setamb} && novoanexo16 -d 01/06/2025 -u r 15 -z LAYOUT610 VALORBASEPELAAPOLICE -u l 01 -s 000000001 -o $SCCIDIRATV/TESTAVER/NOVOANEXO16_VER`)
        cy.exec(`${dirbase} && ${setamb} && test -s $SCCIDIRATV/TESTAVER/NOVOANEXO16_VER`)
        cy.exec(`echo $(date +"%T") > ${arquivoHoraFim}`);

    });
});
