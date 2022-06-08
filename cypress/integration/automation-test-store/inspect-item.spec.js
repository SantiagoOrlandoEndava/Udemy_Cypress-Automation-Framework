/// <reference types="cypress" />

describe('Inspect Automation Test Store items using chain of commands', () => {
    
    it('Click on the first item using item text', () => {
        cy.visit("https://automationteststore.com/")
        // cy.get('.prdocutname').contains('Skinsheen Bronzer Stick').click().then((itemHeaderText) => {
        //     cy.log("Selected the following item: " + itemHeaderText.text()) //text() is from jquery
        //     // cy.log("Selected the following item: " + itemHeaderText.innerText) //returns 'undefined'
        //     // cy.log("Selected the following item: " + itemHeaderText.invoke('text')) //do not work. invoke('text') is not a function
        //     // cy.log("Selected the following item: " + cy.wrap(itemHeaderText).invoke('text')) //invoke() get correctly the object, but the console.log prints the object
            
        //     cy.wrap(itemHeaderText).invoke('text').should('eq', 'Skinsheen Bronzer Stick') //works ok
        //     // itemHeaderText.text().should('eq', 'Skinsheen Bronzer Stick') //do not work. "is not a function"
        //     // cy.wrap(itemHeaderText).text().should('eq', 'Skinsheen Bronzer Stick') //do not work. "is not a function"
        //     // cy.wrap(itemHeaderText).innerText().should('eq', 'Skinsheen Bronzer Stick') //do not work. "is not a function"
        //     // itemHeaderText.innerText().should('eq', 'Skinsheen Bronzer Stick') //do not work. "is not a function"
        // })

        //the way I like:
        cy.get('.prdocutname').contains('Skinsheen Bronzer Stick').click().invoke('text').then((itemHeaderText) => {
            cy.log("Selected the following item: " + itemHeaderText) //text() is from jquery
            
            cy.wrap(itemHeaderText).should('eq', 'Skinsheen Bronzer Stick') //works ok
            // itemHeaderText.should('eq', 'Skinsheen Bronzer Stick') //do not work
            // expect(itemHeaderText).to.eq('Skinsheen Bronzer Stick') //works ok
        })
    });
    
});