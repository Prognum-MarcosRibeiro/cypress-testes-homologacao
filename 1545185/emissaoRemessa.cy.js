describe('Emissão de Remessa e Processamento de Baixa', () => {
    const dirBase = '/home/itau-gestao/dados';
    const setAmb = '. setAmb';

    function execCmd(cmds, opts = {}) {
        if (Array.isArray(cmds)) {
            cmds.forEach(c => cy.exec(`cd ${dirBase} && ${setAmb} && ${c}`, {
                timeout: 100 * 60 * 1000,
                ...opts,
        }));
    } else {
        cy.exec(`cd ${dirBase} && ${setAmb} && ${cmds}`, {
            timeout: 10 * 60 * 1000,
            ...opts,
        });
    }
}
    it('Deve gerar e registrar o arquivo de remessa', () => {
        execCmd([
            //GERARETGEN
            `cp $SCCIDIRATV/TESTAVER/RETORNO/IB4L1031015416.RET $SCCIDIRATV/TESTAVER/RETORNO/LOTE_BOLETO.tmp`,
            `geraretgen -u l 1 -a $SCCIDIRATV/TESTAVER/RETORNO/LOTE_BOLETO.tmp -d 03/11/2020 03/11/2020 -o $SCCIDIRATV/TESTAVER/RETORNO/LOTE_BOLETO_03_11_2020.txt`,
            `cp $SCCIDIRATV/TESTAVER/RETORNO/LOTE_BOLETO_03_11_2020.txt $SCCIDIRATV/rec/bx112020/`,
            `cp $SCCIDIRATV/TESTAVER/RETORNO/ICDR1031032044.RET $SCCIDIRATV/TESTAVER/RETORNO/LOTE_DEBITO.tmp`,
            `geraretgen -u l 3 -a $SCCIDIRATV/TESTAVER/RETORNO/LOTE_DEBITO.tmp -d 03/11/2020 03/11/2020 -o $SCCIDIRATV/TESTAVER/RETORNO/LOTE_DEBITO_03_11_2020.txt`,
            `cp $SCCIDIRATV/TESTAVER/RETORNO/LOTE_DEBITO_03_11_2020.txt $SCCIDIRATV/rec/bx112020/`
        ]);
    });


    it("Deve processar as baixas de títulos recebidos", () => {
        execCmd([
            //PROCPG
            /*
            `echo $(date +"%T") > /home/itau-gestao/dados/TESTAVER/HORA-INTERFACES/INICIO/PROCESSA_BAIXAS`,
            `procpg -a $SCCIDIRATV/TESTAVER/RETORNO/LOTE_BOLETO_03_11_2020.txt -o $SCCIDIRATV/TESTAVER/LOTE_BOLETO_VER.anl -e 11/2020 -n p -z CRIAARQS`,
            `procpg -a $SCCIDIRATV/TESTAVER/RETORNO/LOTE_DEBITO_03_11_2020.txt -o $SCCIDIRATV/TESTAVER/LOTE_DEBITO_VER.anl -e 11/2020 -n p -z CRIAARQS`,
            `cp PRSTZERO.txt $SCCIDIRATV/rec/bx112020/`,
            `procpg -a PRSTZERO.txt -o PRSTZERO_VER.anl -e 11/2020 -n p -z CRIAARQS`,
            `echo $(date +"%T") > /home/itau-gestao/dados/TESTAVER/HORA-INTERFACES/FIM/PROCESSA_BAIXAS`,
            */
            `fastrpa -d 30/05/2025 -x 000000 999999 -P $MENOSP -n g`,
            `fastrpa -d 30/06/2025 -x 000000 999999 -P $MENOSP -n g`,

            //CARGAPOSICAOATRASO
            `echo $(date +"%T") > /home/itau-gestao/dados/TESTAVER/HORA-INTERFACES/INICIO/CARGAPOSICAOATRASO`,
            `cargaposicaoatraso -d 30/06/2025 -x 000000 999999`,
            `echo $(date +"%T") > /home/itau-gestao/dados/TESTAVER/HORA-INTERFACES/FIM/CARGAPOSICAOATRASO`
        ]);
    });
});