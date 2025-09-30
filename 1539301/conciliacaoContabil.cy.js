describe("Executar icscci para todos os dias úteis de janeiro/2025", () => {
  const dirBase = '/home/itau-gestao/dados';
  const setAmb = '. setAmb';
  const arquivos = `${dirBase}/TESTAVER/MENSAL`;

  const ano = 2025;
  const mes = 1;
  const mm = String(mes).padStart(2, '0');

  function getDiasUteis(mes, ano) {
    let diasUteis = [];
    const ultimoDia = new Date(ano, mes, 0).getDate();
    const feriados = ["01/01/2025"];


    for (let dia = 1; dia <= ultimoDia; dia++) {
      const data = new Date(ano, mes - 1, dia);
      const diaSemana = data.getDay();
      const dd = String(dia).padStart(2, '0');
      const dataStr = `${dd}/${mm}/${ano}`;

      if (diaSemana >= 1 && diaSemana <= 5 && !feriados.includes(dataStr)) {
        diasUteis.push(dia);
      }
    }
    return diasUteis;
  }

  it('Gera arquivos LBG para dias úteis', () => {
    cy.exec(`echo $(date +"%T") > ${dirBase}/TESTAVER/HORA-INTERFACES/INICIO/INTERFACES_LBG_${ano}${mm}`);

    let chain = cy.wrap(null);

    getDiasUteis(mes, ano).forEach(dia => {
      chain = chain.then(() => {
        const dd = String(dia).padStart(2, '0');
        const data = `${dd}/${mm}/${ano}`;
        const nomeSaida = `IC${dd}${mm}.LBG`;

        return cy.exec(`cd ${dirBase} && ${setAmb} && icscci -d ${data} -o ${arquivos}/ICSCCI -u i 1`, {timeout: 10*60*1000})
                 .then(() => cy.exec(`mv -f ${arquivos}/ICSCCI.LBG ${arquivos}/${nomeSaida}`));
      });
    });

    chain.then(() => {
      cy.exec(`echo $(date +"%T") > ${dirBase}/TESTAVER/HORA-INTERFACES/FIM/INTERFACES_LBG_${ano}${mm}`);
    });
  });



  it("Roda o comando para cada dia útil", () => { 

    getDiasUteis(mes, ano).forEach(dia => {
      const diaStr = dia.toString().padStart(2, "0"); 
      const arquivo = `IC${diaStr}01.LBG`;

      cy.exec(
        `consolidavariaveisreceita -a ${arquivos}/${arquivo} -s planilha_configuracao.csv`,
        { failOnNonZeroExit: false }
      )
      });
    });
});
