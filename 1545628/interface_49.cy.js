describe('Rotina de Fechamento Contábil', () => {
    const arquivoHoraInicio = '/home/itau-gestao/dados/TESTAVER/HORA-INTERFACES/INICIO/INTERFACE49M';
    const arquivoHoraFim = '/home/itau-gestao/dados/TESTAVER/HORA-INTERFACES/FIM/INTERFACE49M';
    const dirbase = 'cd /home/itau-gestao/dados';
    const setamb = '. setAmb';
    
     it('Executa gerainterfaces 49M | Jun', () => {     
     cy.exec(`echo $(date +"%T") > ${arquivoHoraInicio}`);
     cy.exec(`${dirbase} && ${setamb} && gerainterfaces -u r 0 -a $SCCIDIRATV/arqs/xmlinterfaces/interface49-M.xml -x 000000 999999 -o $SCCIDIRATV/TESTAVER/MENSAL/INTERFACE49M-VER.xml -d 30/06/2025 -s $SCCIDIRATV/arqs/xmlinterfaces/CodigosMoeda.xml`, {timeout : 100 * 60 * 1000});
     cy.exec(`echo $(date +"%T") > ${arquivoHoraFim}`);
    
  });
});