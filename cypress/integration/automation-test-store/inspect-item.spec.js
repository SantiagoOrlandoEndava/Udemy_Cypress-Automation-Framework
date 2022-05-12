/// <reference types="cypress" />

describe('Inspect Automation Test Store items using chain of commands', () => {
    
    it('Click on the first item using item text', () => {
        cy.visit("https://automationteststore.com/")
        cy.get('.prdocutname').contains('Skinsheen Bronzer Stick').click().then(function(itemHeaderText) {
            console.log("Selected the following item: " + itemHeaderText.text()) //text() is from jquery
            // console.log("Selected the following item: " + itemHeaderText.innerText) //returns 'undefined'


            // console.log("Selected the following item: " + itemHeaderText.invoke('text')) //do not work. invoke('text') is not a function
            
            // console.log("Selected the following item: " + cy.wrap(itemHeaderText).invoke('text')) 
            //now the invoke() get correctly the object, but the console.log prints the object
            
            cy.wrap(itemHeaderText).invoke('text').should('eq', 'Skinsheen Bronzer Stick') //works good

            // itemHeaderText.text().should('eq', 'Skinsheen Bronzer Stick') //do not work. "is not a function"
            // cy.wrap(itemHeaderText).text().should('eq', 'Skinsheen Bronzer Stick') //do not work. "is not a function"

            // cy.wrap(itemHeaderText).innerText().should('eq', 'Skinsheen Bronzer Stick') //do not work. "is not a function"
            // itemHeaderText.innerText().should('eq', 'Skinsheen Bronzer Stick') //do not work. "is not a function"
        })
    });
    
});