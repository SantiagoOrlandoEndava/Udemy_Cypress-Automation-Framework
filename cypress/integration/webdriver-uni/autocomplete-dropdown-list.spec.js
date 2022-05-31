/// <reference types="cypress" />

describe("Verify Autocomplete dropwdown lists via webdriveruni", () => {
    
    it("Select specific product via autocomplete list", () => {
        const productToSelect = 'Almond';
        cy.visit("/Autocomplete-TextField/autocomplete-textfield.html")

        // cy.get('#myInput').type('A')
        // cy.get('#myInputautocomplete-list').each(($el, index, $list) => {
        //     const prod = $el.text();
        //     const productToSelect = 'Almond';

        //     if(prod === productToSelect) {
        //         // $el.click(); //it appeared strikethrough because it was deprecated on jQuery
        //         // $el.trigger('click') // option 1
        //         cy.wrap($el).click() // option 2

        //         cy.get('#submit-button').click();
        //         cy.url().should('include', productToSelect)
        //     }
        // })    
        
        //BETTER WAY OF DOING THE SAME THING:
        cy.get('#myInput').type('A')
        cy.get('#myInputautocomplete-list').contains(productToSelect).click()
        cy.get('#submit-button').click();
        cy.url().should('include', productToSelect)
    });
})