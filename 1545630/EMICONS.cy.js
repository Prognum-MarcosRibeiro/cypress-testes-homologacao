describe('Rotina de Maio e Junho', () => {

    it('Executa o EMICONS', () => {
        let dirbase = 'cd /home/itau-gestao/dados'
        let arquivoHoraInicio = '/home/itau-gestao/dados/TESTAVER/HORA-INTERFACES/INICIO/EMICONS'
        let arquivoHoraFim = ' /home/itau-gestao/dados/TESTAVER/HORA-INTERFACES/FIM/EMICONS'
        let setamb = '. setAmb'

        cy.exec(`echo $(date +"%T") > ${arquivoHoraInicio}`);
        cy.exec(`${dirbase} && ${setamb} && lsdb -d $SCCIDIRATV -F"|" EMICONS NU_MAC CTR DIAEMIS DIAVENC CODSUSP LCOBR NPC SALDODEV TOTPREST JURO TXPST VALTXADM CODREAJ SEGFIN SEGIMV | awk -F"|" '$1==1451'  > $SCCIDIRATV/TESTAVER/emicons.VER`)
        cy.exec(`${dirbase} && ${setamb} && sort $SCCIDIRATV/TESTAVER/emicons.VER -o $SCCIDIRATV/TESTAVER/emicons.VER`)
        cy.exec(`${dirbase} && ${setamb} && test -s $SCCIDIRATV/TESTAVER/emicons.VER`)
        cy.exec(`echo $(date +"%T") > ${arquivoHoraFim}`);

    });
});
