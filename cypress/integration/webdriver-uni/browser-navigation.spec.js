/// <reference types="cypress" />

describe("Validate webdriveruni homepage links", () => {
    
    it("Confirm links redirect to the correct pages", () => {
        // cy.visit("http://www.webdriveruniversity.com/Contact-Us/contactus.html") 
        //Interesting how if Cypress runs this line, the following SecurityError is displayed: 
        //Blocked a frame with origin "http://www.webdriveruniversity.com" from accessing a cross-origin frame.

        cy.visit("http://www.webdriveruniversity.com")
        cy.get('#contact-us').invoke('removeAttr', 'target').click({force:true})
        cy.url().should('include', 'contactus')

        cy.go('back')
        cy.reload()
        cy.url().should('eq', 'http://www.webdriveruniversity.com/')
        //cy.reload(true) //reload without using cache

        cy.go('forward')
        cy.url().should('include', 'contactus')
    });
})