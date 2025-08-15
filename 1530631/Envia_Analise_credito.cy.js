describe('Validação da API AnaliseCredito', () => {

  function validaBody(responseBody) {

    expect(responseBody).to.have.property('individuals');
    expect(responseBody.individuals).to.be.an('array').with.length.greaterThan(0);

    // ---Valida individuals---//
    const first = responseBody.individuals[0];
    expect(first.full_name).to.eq('Adquirente_00000000000191');
    expect(first.birthday_date).to.eq('1991-08-18');
    expect(first.income).to.eq('1400');
    expect(first.gender).to.eq('MALE');
    expect(first.marriage_status).to.eq('NOT_MARRIED');

    //---Valida credit_details---//
    const credit = responseBody.credit_details;
    expect(credit.loan_principal_amount).to.eq('80000');
    expect(credit.tax_interest).to.eq('17.16');
    expect(credit.amount_registration).to.eq('3500');

    // ---Valida property---//
    const property = responseBody.property;
    expect(property.amount_property).to.eq('250000');
    expect(property.address.city).to.eq('VALPARAÍSO DE GOIÁS');
  }

  it('Deve retornar status 200 e validar campos de retorno da API', () => {

    cy.request({
      method: 'POST',
      url: 'http://10.100.1.35/aejs/rest/w/wintegracaoc6/AnaliseCredito',
      qs: {
        NU_OPERACAO: '000001169',
        userName: 'loginintegracao',
        sessionKey: '123456',
        ambienteOperacional: '/c6bank/ambiente_integracao'
      },
      body: {
      }
    }).then((response) => {
       
      expect(response.status).to.eq(200);
      validaBody(response.body);

    });
  });
});
