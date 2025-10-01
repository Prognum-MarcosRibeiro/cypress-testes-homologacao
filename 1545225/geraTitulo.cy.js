describe("Gera Título Débito em Conta | reevo, gemictit, gprstzero", () => {
  it("Executa comandos em sequência", () => {
    const dirbase = "/home/itau-gestao/dados";
    const setamb = ". setAmb";

    cy.exec(`cd ${dirbase} && ${setamb} && reevo -e 06/2025 06/2025 -n e -z SCCIDIRATV REVO -x 000000 999999 -s 15 -P $MENOSP`,{ timeout: 100 * 60 * 1000}).then(() => {
      return cy.exec(`cd ${dirbase} && ${setamb} && gemictit -d 01/06/2025 -x 000000 999999 -n 0 G J -P $MENOSP -m 0 60 -u r 1 -u i 3 -s 15 -u b 2`,{ timeout: 100 * 60 * 1000});}).then(() => {
      return cy.exec(`cd ${dirbase} && ${setamb} && gprstzero -d 30/12/2024 01/01/2025 -x 000000 999999 -u r 1 -u b 1 -o PRSTZERO.txt`,             { timeout: 100 * 60 * 1000});
    });
  });
});
