describe('Importação de Leads', () => {

    const dataUse = {
        prazo: 240,
        valorFinanc: 200000,
        rendaComprovada: 10461.06,
        taxaJuros: "FIXED",
        sistAmort: "PRICE",
        valorProperty: 2400000
    };

    const requestEndPoint = 'http://10.100.1.35/aejs/rest/w/wintegracaoc6/SalvaSimulacao';

    const queryParams = {
        sessionKey: '123456',
        ambienteOperacional: '/c6bank/ambiente_integracao',
        userName: 'loginintegracao',
        GrupoTpOper: 227
    };

    const requestBody = {
        simulation_id: 1518,
        loan_id: "01H8YA71CX7RYJ0L2DSXQK00FN",
        account_source: "Home",
        amortization_type: dataUse.sistAmort,
        creation_date: "2025-07-28T20:41:43.041Z",
        loan_amount: dataUse.valorFinanc.toFixed(2),
        total_amount: dataUse.valorFinanc.toFixed(2),
        amortization_period: dataUse.prazo,
        interest_installment: dataUse.taxaJuros,
        dilute_additional_costs: false,
        channel: "WEB",
        person: {
            cpf_number: "47708350000",
            email: "cypress@prognum.com.br",
            phone_number: "999999999",
            area_code: "11",
            average_income: dataUse.rendaComprovada,
            first_name: "Cypress",
            last_name: "User",
            person_birthdate: "1970-01-01",
            sexo: "Masculino"
        },
        property: {
            property_type: "BUSINESS",
            owner: "SELF",
            estimated_value: dataUse.valorProperty.toFixed(2),
            address: {
                street: "Rua Doutor Israel",
                address_number: 446,
                complement: "N/A",
                neighborhood: "Pq. Presid. Medici",
                city: "Itu",
                state: "SP",
                zip_code: "13211-772"
            }
        },
        payments: {
            first: 1963.10,
            last: 1963.10,
            skipped_month: 1
        },
        costs: {
            iof_percentage: 0.033800,
            registry_value: 1000.00,
            property_evaluation: 240.00,
            insurance_percentage: 0.000350
        },
        partner: {
            cnpj_number: "55201079000100",
            name: "Teste 2"
        }
    };

    function verificarValoresNavegacao(numeroOper) {
        cy.loginSupervisor('/c6bank');
        cy.acessarOperacao(numeroOper, 'Limite e aprovação de crédito');
        cy.contains('Alterar', { timeout: 10000 }).should('be.visible');
        cy.get('[name="SIMULACAO_ORIGINACAO$NU_PRAZO_MESES_OPERACAO"]').should('have.value', dataUse.prazo);
        cy.get('[name="SIMULACAO_ORIGINACAO$VA_FINANCIAMENTO"]').should('have.value', dataUse.valorFinanc.toLocaleString('pt-BR', { minimumFractionDigits: 2 }));
        cy.get('[name="SIMULACAO_ORIGINACAO$VA_RENDA_FAMILIAR"]').should('have.value', dataUse.rendaComprovada.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 }));
        let taxaJurosFormatada;
        dataUse.taxaJuros === 'FIXED' ? taxaJurosFormatada = 'FIXA' : null;
        cy.contains('label', 'Tipo de Juros').parent().find('input').should('have.value', taxaJurosFormatada);

        let sistAmortFormatada;
        dataUse.sistAmort === 'PRICE' ? sistAmortFormatada = '1 - TP     ' : null;
        cy.get('[name="SIMULACAO_ORIGINACAO$CO_SISTEMA_AMORTIZACAO"]').should('have.value', sistAmortFormatada);

        let calculoLTV = (dataUse.valorFinanc / dataUse.valorProperty) * 100;
        cy.get('[name="SIMULACAO_ORIGINACAO$PE_LTV"]').should('have.value', calculoLTV.toFixed(2).replace('.', ',') + " %");
    }

    it('', () => {
        cy.request({
            method: 'PUT',
            url: requestEndPoint,
            qs: queryParams,
            headers: { 'Content-Type': 'application/json' },
            body: requestBody
        }).then((response) => {
            expect(response.status).to.eq(200);
            let numeroOperacao = response.body.dados.NU_PRETENDENTE;
            verificarValoresNavegacao(numeroOperacao);
        });
    });
});