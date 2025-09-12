describe("Processamento completo de movimentações diárias", () => {

  it("Deve criar bancos, executar FastRPA e processar GMOV diário corretamente", () => {
    let dirBase = 'cd /home/itau-gestao/dados';
    let arquivos_gerados = '/home/itau-gestao/dados/arquivos_gerados';
    let setamb = '. setamb';

    cy.exec(`mkdir -p ${arquivos_gerados}`, { failOnNonZeroExit: false });
    cy.exec(dirBase);

    const meses = ["01", "02", "03", "04"];
    const tipos = ["nrps", "nmov"];

    meses.forEach((mes) => {
      tipos.forEach((tipo) => {
        cy.exec(`criadb -c -d $SCCIDIRATV ${tipo}:${mes}2025`, { failOnNonZeroExit: false });
      });
    });

    // <<-- INÍCIO EXECUÇÃO FASTRPA -->>
    let inicioExecucaoFastRpa = new Date();
    cy.exec(`${dirBase} && ${setamb} && fastrpa -d 30/12/2024 -x 000000 999999 -P $MENOSP -n g`, { timeout: 10 * 60 * 1000 });
    cy.exec(`${dirBase} && ${setamb} && fastrpa -d 30/01/2025 -x 000000 999999 -P $MENOSP -n g`, { timeout: 10 * 60 * 1000 });
    cy.exec(`${dirBase} && ${setamb} && lsdb -F"|" RPA | awk -F"|" '$4==1501' > ${arquivos_gerados}/rpa_012025.txt`, { timeout: 10 * 60 * 1000 });

    cy.readFile(`${arquivos_gerados}/rpa_012025.txt`).then((content) => {
      expect(content.trim().length).to.be.greaterThan(0);
    });

    cy.exec(`${dirBase} && ${setamb} && convxdbtosql -n 1 -e 12/2024 -z LIMPATABELA NRPS`, { failOnNonZeroExit: false });
    cy.exec(`${dirBase} && ${setamb} && echo "01|30/12/2024|02/01/2025" | alteradb -f"|" -d $SCCIDIRATV sccictb`, { timeout: 10 * 60 * 1000 });
    cy.exec(`${dirBase} && ${setamb} && grps -d 02/01/2025 -x 000000 999999`, { timeout: 10 * 60 * 1000 });



    // <<-- INÍCIO EXECUÇÃO GMOVDIARIO -->> 
    let inicioExecucaoFastGmov = new Date();

    Array.from({ length: 20 }).forEach(() => {
    cy.exec(`${dirBase} && ${setamb} && gmovdiario -u b 1 -z IGNORATESTACTB -P $MENOSP`);
    });

    cy.exec(`${dirBase} && ${setamb} && fastrpa -d 31/01/2025 -x 000000 999999 -P $MENOSP -n g`, { timeout: 10 * 60 * 1000 });
    cy.exec(`${dirBase} && ${setamb} && gmovdiario -u b 1 -z IGNORATESTACTB -P $MENOSP`, { timeout: 10 * 60 * 1000 });
    cy.exec(`${dirBase} && ${setamb} && convxdbtosql -n 1 -e 01/2025 -z LIMPATABELA NRPS`, { failOnNonZeroExit: false, timeout: 10 * 60 * 1000 });
    cy.exec(`${dirBase} && ${setamb} && fastrpa -d 28/02/2025 -x 000000 999999 -P $MENOSP -n g`, { timeout: 10 * 60 * 1000 });
    cy.exec(`${dirBase} && ${setamb} && fastrpa -d 31/03/2025 -x 000000 999999 -P $MENOSP -n g`, { timeout: 10 * 60 * 1000 });
    cy.exec(`${dirBase} && ${setamb} && fastrpa -d 30/04/2025 -x 000000 999999 -P $MENOSP -n g`, { timeout: 10 * 60 * 1000 });

    Array.from({ length: 19 }).forEach(() => {
      cy.exec(`${dirBase} && ${setamb} && gmovdiario -u b 1 -z IGNORATESTACTB -P $MENOSP`);
    });

    Array.from({ length: 41 }).forEach(() => {
      cy.exec(`${dirBase} && ${setamb} && gmovdiario -u b 1 -z IGNORATESTACTB -P $MENOSP -n 6`);
    });
    // <<-- FIM EXECUÇÃO GMOVDIARIO -->> 

    // <<-- LIMPEZA TABELA CONCILIACAO  -->> 
    cy.exec(`${dirBase} && ${setamb} && lsdb -F"|" -d $SCCIDIRATV conciliacao_ctb > $SCCIDIRATV/TESTAVER/conciliacao_ctb.exc`)
    cy.exec(`${dirBase} && ${setamb} && excluidb -f"|" -d $SCCIDIRATV conciliacao_ctb -a  $SCCIDIRATV/TESTAVER/conciliacao_ctb.exc`)
  });
});
