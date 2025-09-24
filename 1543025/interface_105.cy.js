describe('Rotina de Fechamento Contábil', () => {

  it('Executa o fechamento contábil | Interface105', () => {
     let dirbase = 'cd /home/itau-gestao/dados';
     let arquivoHoraInicio = '/home/itau-gestao/dados/TESTAVER/HORA-INTERFACES/INICIO/INTERFACE105';
     let arquivoHoraFim = '/home/itau-gestao/dados/TESTAVER/HORA-INTERFACES/FIM/INTERFACE105';
     let setamb = '. setamb';

     cy.exec(`echo $(date +"%T") > ${arquivoHoraInicio}`);
     cy.exec(`${dirbase} && ${setamb} && gerainterfaces -a $SCCIDIRATV/arqs/xmlinterfaces/interface105.xml -x 000000 999999 -s $SCCIDIRATV/arqs/xmlinterfaces/referenciacruzadaitau.xml -o $SCCIDIRATV/TESTAVER/MENSAL/INTERFACE105-VER.xml -d 31/01/2025`, {timeout : 100 * 60 * 1000});
     cy.exec(`echo $(date +"%T") > ${arquivoHoraFim}`);
    
  });
});

