describe('Rotina de Fechamento Contábil', () => {

  it('Executa o fechamento contábil | Cadastro Positivo', () => {
     let dirbase = 'cd /home/itau-gestao/dados';
     let arquivoHoraInicio = '/home/itau-gestao/dados/TESTAVER/HORA-INTERFACES/INICIO/CADASTRO_POSITIVO';
     let arquivoHoraFim = ' /home/itau-gestao/dados/TESTAVER/HORA-INTERFACES/FIM/CADASTRO_POSITIVO';
     let setamb = '. setamb';

     cy.exec(`echo $(date +"%T") > ${arquivoHoraInicio}`);
     cy.exec(`${dirbase} && ${setamb} && gerainterfaces -a $SCCIDIRATV/arqs/xmlinterfaces/CadastroPositivo.xml -d 31/01/2025 -x 000000 999999 -o $SCCIDIRATV/TESTAVER/cadastro_positivo_VER.txt`, {timeout : 100 * 60 * 1000});
     cy.exec(`echo $(date +"%T") > ${arquivoHoraFim}`);
    
  });
});
