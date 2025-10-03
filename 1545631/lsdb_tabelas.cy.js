describe('Rotina de Extração das Tabelas (lsdb)', () => {
    const dirbase = '/home/itau-gestao/dados'
    const setamb = '. setAmb'
    const tabelas = [
        "CMTABNOM",
        "CMTABVAL",
        "TABFAIXAAPOLICE",
        "TAB_GEN_PADRAO",
        "SELIC",
        "TAXA_SELIC",
        "FILIALREGIAO",
        "TABBANCO",
        "MUNIC",
        "TABLCOBR",
        "INTERVENIENTE_QUITANTE",
        "TIPO_TRAMITACAO_FCVS",
        "TABCRITFH",
        "TABCTA",
        "TABCTGN",
        "TABAPOLICE",
        "TABCRIT",
        "TPSERIE",
        "ENTIDADE_SCCI",
        "USUARIO",
        "CAMPO_EDITOR",
        "WEBSENHA",
        "TABTXT",
        "FERIADO",
        "CTACNF",
        "RENDAS_MOVIMENTOS",
        "TAB_CARTORIO",
        "CODIGOS_OCORRENCIA_SERASA",
        "CONFIGURACAO",
        "CONFIGURACAO_SISAT_USUARIO",
        "MAX_PRT_ATS_FGTS"
    ]

    tabelas.forEach(tabela => {
        it(`Extrai tabela ${tabela} via lsdb`, () => {
            const arquivoHoraInicio = `${dirbase}/TESTAVER/HORA-INTERFACES/INICIO/${tabela}`
            const arquivoHoraFim = `${dirbase}/TESTAVER/HORA-INTERFACES/FIM/${tabela}`

            cy.exec(`echo $(date +"%T") > ${arquivoHoraInicio}`)
            cy.exec(`cd ${dirbase} && ${setamb} && lsdb -d $SCCIDIRATV -F"|" ${tabela} > $SCCIDIRATV/TESTAVER/${tabela}_VER`)
            cy.exec(`echo $(date +"%T") > ${arquivoHoraFim}`)

            cy.exec(`cd ${dirbase} && ${setamb} && test -f $SCCIDIRATV/TESTAVER/${tabela}_VER && echo OK`).its('stdout').should('contain', 'OK')
        })
    })
})
