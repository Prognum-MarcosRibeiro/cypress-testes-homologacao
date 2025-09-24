describe('Rotina de Fechamento Contábil', () => {

  it('Executa o fechamento contábil | Interface74', () => {
     let dirbase = 'cd /home/itau-gestao/dados';
     let arquivoHoraInicio = '/home/itau-gestao/dados/TESTAVER/HORA-INTERFACES/INICIO/INTERFACE74';
     let arquivoHoraFim = '/home/itau-gestao/dados/TESTAVER/HORA-INTERFACES/FIM/INTERFACE74';
     let setamb = '. setamb';

     cy.exec(`echo $(date +"%T") > ${arquivoHoraInicio}`);
     cy.exec(`${dirbase} && ${setamb} && gerainterfaces -a $SCCIDIRATV/arqs/xmlinterfaces/interface74.xml -x 000000 999999 -o $SCCIDIRATV/TESTAVER/MENSAL/INTERFACE74-VER.xml -d 31/01/2025`, {timeout : 100 * 60 * 1000});
     cy.exec(`echo $(date +"%T") > ${arquivoHoraFim}`);
    
  });
});
