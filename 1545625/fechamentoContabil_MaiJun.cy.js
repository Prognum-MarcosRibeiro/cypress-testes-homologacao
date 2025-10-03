describe('Executa gmovdiario para Maio e Junho', () => {
  const dirbase = 'cd /home/itau-gestao/dados';
  const setAmb = '. setAmb';
  const arquivoHoraInicio = '/home/itau-gestao/dados/TESTAVER/HORA-INTERFACES/INICIO/CARGAPOSICAOATRASO';
  const arquivoHoraFim = '/home/itau-gestao/dados/TESTAVER/HORA-INTERFACES/FIM/CARGAPOSICAOATRASO';

  // helper para rodar comandos com ambiente
  function run(cmd, timeout = 60 * 60 * 1000) {
    return cy.exec(`${dirbase} && ${setAmb} && ${cmd}`, { timeout });
  }

  it('Executa fastrpa | Mai - Jun', () => {
    run('fastrpa -d 30/05/2025 -x 000000 999999 -P $MENOSP -n g');
    run('fastrpa -d 30/06/2025 -x 000000 999999 -P $MENOSP -n g');
  });

  it('Grava Data CARGA-POSICAO-ATRASO', () => {
    cy.exec(`echo $(date +"%T") > ${arquivoHoraInicio}`);
    run('cargaposicaoatraso -d 30/06/2025 -x 000000 999999');
    cy.exec(`echo $(date +"%T") > ${arquivoHoraFim}`);
  });

  it('Executa gmovdiario | Maio', () => {
    cy.contarDiasUteis(5, 2025).then((diasUteisMaio) => {
      diasUteisMaio.forEach(() => {
        run('gmovdiario -u b 1 -z IGNORATESTACTB -P 32 -n 6');
      });
    });
  });

  it('Executa gmovdiario | Junho e depois convxdbtosql', () => {
    cy.contarDiasUteis(6, 2025).then((diasUteisJunho) => {
      diasUteisJunho.forEach(() => {
        run('gmovdiario -u b 1 -z IGNORATESTACTB -P 32 -n 6');
      });

      run('convxdbtosql -n 1 -e 06/2025 -z LIMPATABELA NRPS');
    });
  });
});
