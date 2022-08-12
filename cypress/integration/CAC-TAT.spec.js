/// <reference types="Cypress"/>

describe('Central de Atendimento ao Cliente TAT', function() {

    beforeEach(() => {
        cy.visit('./src/index.html')
    })

    it('verifica o título da aplicação', function() {
        cy.title().should('be.equal','Central de Atendimento ao Cliente TAT')
    })

    it('preencher os campos obrigatórios e envia o formulário',function() {
        cy.get('#firstName').type('Alisson')
        cy.get('#lastName').type('Zanoni')
        cy.get('#email').type('alisson.zanoni@gmail.com')
        cy.get('#open-text-area').type('estou testando cypress e esses estão sendos meus primeiros testes automatizados, de momento estou achando melhor que o selenium', {delay: 0}) 
        cy.get('.button').click()
        cy.get('.success').should('be.visible')

        // . para indentificar classes # para identificar id 'button[type="submit"]' para identificar por propriedades
        // {delay:0} passar um objeto dentro do type para acelerar o processo de digitação de grandes textos.
    })

    it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', function(){
        cy.get('#firstName').type('Alisson')
        cy.get('#lastName').type('Zanoni')
        cy.get('#email').type('alissonzanoni.br')
        cy.get('#open-text-area').type('estou testando cypress e esses estão sendos meus primeiros testes automatizados, de momento estou achando melhor que o selenium', {delay: 0}) 
        cy.get('.button').click()
        cy.get('.error').should('be.visible')
    })

    it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário',function(){
        cy.get('#firstName').type('Alisson')
        cy.get('#lastName').type('Zanoni')
        cy.get('#email').type('alisso@zanoni.com')
        cy.get('#phone-checkbox').check('phone')
        cy.get('#open-text-area').type('teste') 
        cy.get('.button').click()
        cy.get('.error').should('be.visible')
    })

    it('campo telefone se for passado um valor não-numérico, seu valor continuará vazio.',function(){
        cy.get('#firstName').type('Alisson')
        cy.get('#lastName').type('Zanoni')
        cy.get('#email').type('alisso@zanoni.com')
        cy.get('#phone-checkbox').click()
        cy.get('#phone').type('alisson').should('have.value','')
        cy.get('#open-text-area').type('teste') 
        cy.get('.button').click()
        cy.get('.error').should('be.visible')
    })

    it('preenche e limpa os campos nome, sobrenome, email e telefone',function(){
        cy.get('#firstName').type('alisson').should('have.value','alisson').clear().should('have.value','')
        cy.get('#lastName').type('zanoni').should('have.value','zanoni').clear().should('have.value','')
        cy.get('#email').type('Alisson@gmail.com').should('have.value','Alisson@gmail.com').clear().should('have.value','')
        cy.get('#phone').type(123432).should('have.value','123432').clear().should('have.value','')
    })

    it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios',function(){
        cy.contains('button','Enviar').click()
        cy.get('.error').should('be.visible')
    })

    it('envia o formulário com sucesso usando um comando customizado',function(){
        cy.PreencheCamposObrigatorios()
        cy.get('.success').should('be.visible')
    })

    it('seleciona um produto (YouTube) por seu texto',function(){
        cy.get('#product').select('YouTube').should('have.value','youtube')
        cy.get('.button').click()
        cy.get('.error').should('be.visible')

    })

    it('seleciona um produto (Blog) por seu índice',function(){
        cy.get('#product').select(1).should('have.value','blog')
        cy.get('.button').click()
        cy.get('.error').should('be.visible')

    })

    it('seleciona um produto (Mentoria) por seu valor (value)',function(){
        cy.get('#product').select('mentoria').should('have.value','mentoria')
        cy.get('.button').click()
        cy.get('.error').should('be.visible')
    })

    it('marca o tipo de atendimento "Feedback"',function(){
       cy.get('input[type="radio"]').check('feedback').should('have.value','feedback')
       cy.get('.button').click()
       cy.get('.error').should('be.visible')
    })

    it('marca cada tipo de atendimento',function(){
      cy.get('input[type="radio"]').should('have.length',3).each(function($radio){
        cy.wrap($radio).check()
        cy.wrap($radio).should('be.checked')
      })
    })

    it('marca ambos checkboxes, depois desmarca o último',function(){
        cy.get('input[type="checkbox"]').check('phone').should('have.value','phone')
        cy.get('input[type="checkbox"]').check('email').should('have.value','email').uncheck('email')
        cy.get('.button').click()
        cy.get('.error').should('be.visible')
    })

    it('seleciona um arquivo da pasta fixtures',function(){
        cy.get('input[type="file"]').selectFile('cypress/fixtures/example.json')
        .should(function($input){
            expect($input[0].files[0].name).to.equal('example.json')
        })
    })

    it('seleciona um arquivo simulando um drag-and-drop',function(){
        //Simulando um arquivo sendo arrastado para cima do input 
        cy.get('input[type="file"]').selectFile('cypress/fixtures/example.json', {action: 'drag-drop'})
        .should(function($input){
            expect($input[0].files[0].name).to.equal('example.json')
        })
    })

    it('seleciona um arquivo usando fixture e dando um alias para ela',function(){
        cy.fixture('example.json').as('file')
        cy.get('input[type="file"]').selectFile('@file')
        .should(function($input){
            expect($input[0].files[0].name).to.equal('example.json')
        })
    })

    it('verifica que a política de privacidade abre em outra aba sem a necessidade de um clique',function(){
        cy.get('a').should('have.attr','target','_blank')
    })

    it('abrir a pagina de politicas de privacidade na mesma aba',function(){
        cy.get('a').invoke('removeAttr','target').click()
        cy.contains('Talking About ferrarri')
    })

})

