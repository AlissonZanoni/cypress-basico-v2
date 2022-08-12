it.only('testa a página de politica de privacidade de forma independente',function(){
    cy.visit('/src/privacy.html')
    cy.contains('Talking About Testing')
})