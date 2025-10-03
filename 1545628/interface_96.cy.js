describe('Rotina de Fechamento Contábil', () => {
    const arquivoHoraInicio = '/home/itau-gestao/dados/TESTAVER/HORA-INTERFACES/INICIO/INTERFACE96M';
    const arquivoHoraFim = '/home/itau-gestao/dados/TESTAVER/HORA-INTERFACES/FIM/INTERFACE96M';
    const dirbase = 'cd /home/itau-gestao/dados';
    const setamb = '. setAmb';
    
  it('Executa gerainterfaces 96M | Jun', () => {
     cy.exec(`echo $(date +"%T") > ${arquivoHoraInicio}`);
     cy.exec(`${dirbase} && ${setamb} && gerainterfaces -a $SCCIDIRATV/arqs/xmlinterfaces/interface96.xml -x 000000 999999 -o $SCCIDIRATV/TESTAVER/MENSAL/INTERFACE96-VER.xml -d 30/06/2025`, {timeout : 100 * 60 * 1000});
     cy.exec(`echo $(date +"%T") > ${arquivoHoraFim}`);
    
  });
});