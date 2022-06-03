/// <reference types="cypress" />

describe("Handling IFrame & Modals", () => {
    
    it("Handle webdriveruni iframe and modal", () => {
        cy.visit("/IFrame/index.html")

        //option 1
        // cy.get('#frame').then($iframe => {
        //     const body = $iframe.contents().find('body') //contents() is a jQuery method
        //     cy.wrap(body).as('iframe')
        // })

        //option 2
        cy.get('#frame').its('0.contentDocument').its('body').as('iframe')


        cy.get('@iframe').find('#button-find-out-more').click()

        cy.get('@iframe').find('#myModal').then((modal) => {
            //option 1
            // cy.wrap(modal).should(($expectedText) => {
            //     const text = $expectedText.text()
            //     expect(text).to.include('Welcome to webdriveruniversity.com we sell a wide range of electrical goods');
            // })

            //option 2
            cy.wrap(modal).invoke('text').should('contain', 'Welcome to webdriveruniversity.com we sell a wide range of electrical goods');

            cy.wrap(modal).contains('Close').click()
        })

    });
})