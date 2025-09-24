describe('Rotina de Fechamento Contábil', () => {

  it('Executa o fechamento contábil | Interface66', () => {
     let dirbase = 'cd /home/itau-gestao/dados';
     let arquivoHoraInicio = '/home/itau-gestao/dados/TESTAVER/HORA-INTERFACES/INICIO/INTERFACE66';
     let arquivoHoraFim = '/home/itau-gestao/dados/TESTAVER/HORA-INTERFACES/FIM/INTERFACE66';
     let setamb = '. setamb';

     cy.exec(`echo $(date +"%T") > ${arquivoHoraInicio}`);
     cy.exec(`${dirbase} && ${setamb} && gerainterfaces -a $SCCIDIRATV/arqs/xmlinterfaces/interface66.xml -x 000000 010000 -o $SCCIDIRATV/TESTAVER/MENSAL/INTERFACE66-VER.xml -d 31/01/2025`, {timeout : 100 * 60 * 1000});
     cy.exec(`echo $(date +"%T") > ${arquivoHoraFim}`);
    
  });
});
