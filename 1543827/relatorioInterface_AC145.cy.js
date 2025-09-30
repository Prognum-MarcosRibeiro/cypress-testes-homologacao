describe('Relatórios Automáticos relAC145 com dias úteis', () => {
  
    it('Gera relatórios para cada dia útil de Janeiro a Abril', () => {
    const dirbase = 'cd /home/itau-gestao/dados';
    const setamb = '. setAmb'
    const mesesSelecionados = ["01", "02", "03", "04"];
    const ano = 2025;

    mesesSelecionados.forEach((mes) => {
     cy.contarDiasUteis(parseInt(mes), ano).then((diasUteis) => {
       diasUteis.forEach((dia) => {
       const diaStr = String(dia).padStart(2, '0');
       const comando = `${dirbase} && ${setamb} && relAC145 -d ${diaStr}/${mes}/${ano} -x 000000 999999 -n 0 -o $SCCIDIRATV/TESTAVER/CONCILIACAO/AC145-${diaStr}${mes}${ano}`;
          
          cy.exec(comando, {timeout: 300000 }).then((res) => 
            cy.log(`Executado para ${diaStr}/${mes}/${ano}: ${res.stdout}`)
          );
        });
      });
    });
  });
});