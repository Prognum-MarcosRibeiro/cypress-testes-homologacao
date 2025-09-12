describe('Gerar Interface 49M', () => {
    let dirBase = 'cd /home/itau-gestao/dados';
    let arquivoHoraInicio =  '/home/itau-gestao/dados/TESTAVER/HORA-INTERFACES/INICIO/INTERFACE49M';
    let arquivoHoraFim =  '/home/itau-gestao/dados/TESTAVER/HORA-INTERFACES/FIM/INTERFACE49M';
    let setAmb = '. setamb';

    it('Executando rotina', () => {
        cy.exec(`echo $(date +"%T") > ${arquivoHoraInicio}`);
        cy.exec(`${dirBase} && ${setAmb} && gerainterfaces -u r 0 -a $SCCIDIRATV/arqs/xmlinterfaces/interface49-M.xml -x 000000 010000 -o $SCCIDIRATV/TESTAVER/MENSAL/INTERFACE49M-VER.xml -d 31/01/2025 -s $SCCIDIRATV/arqs/xmlinterfaces/CodigosMoeda.xml`, {timeout: 6 * 60 * 1000})
        cy.exec(`echo $(date +"%T") > ${arquivoHoraFim}`);
        });

    it('Validando arquivo', () => {
        const header = '000000000010000000198PROGNUM        PROGNUM        ITAU-UNIBANCO  SO-CA          20250131CATIO MENSAL-CENTRAL DE RISCO                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      ';
        const dadosDaOperacao = '1000000000527032100003110457631060240000F00000000445207857700070397Adquirente_00000000445207     CAD_ENDEMUT_0                 00025 AP 115 B      SANTA CECILIA  00025025S�O PAULO           SPI                                                           00000000000000{0000000{0000000{0000000{ N  1 20211001         01S  N99999999000001 3SO                                                                                               00000000{                                                                                                                                                                                                                                                                  ';
        const trailler = '900000379130000000198PROGNUM        PROGNUM        ITAU-UNIBANCO  SO-CA          20250131CATIO MENSAL-CENTRAL DE RISCO                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      ';

            cy.readFile(`/home/itau-gestao/dados/TESTAVER/MENSAL/INTERFACE49M-VER.xml`, { timeout: 3 * 60 * 1000 } ).then((content) => {
                const linhas = content.split(/\r?\n/);
                expect(linhas[0]).to.equal(header);
                expect(linhas[4]).to.equal(dadosDaOperacao);
                expect(linhas.find(l => l.startsWith('9'))).to.equal(trailler);
            });
    });
});