describe('Rotina de Fechamento | Maio e Jun', () => {
    const arquivoHoraInicio = '/home/itau-gestao/dados/TESTAVER/HORA-INTERFACES/INICIO/RECEPCARTEIRA';
    const arquivoHoraFim = '/home/itau-gestao/dados/TESTAVER/HORA-INTERFACES/FIM/RECEPCARTEIRA';
    const dirbase = 'cd /home/itau-gestao/dados';
    const setamb = '. setAmb';

     it('Executa gerainterfaces RECEPCARTEIRA | Jun',() => {    
     cy.exec(`echo $(date +"%T") > ${arquivoHoraInicio}`);
     cy.exec(`${dirbase} && ${setamb} && gerainterfaces -a $SCCIDIRARQS/arqs/xmlinterfaces/recepcaocarteira-M-posi.xml -x 000000 999999 -o $SCCIDIRATV/TESTAVER/recepcarteira-M_VER -d 30/06/2025`, {timeout : 100 * 60 * 1000});
     cy.exec(`echo $(date +"%T") > ${arquivoHoraFim}`);
     
  })
});
