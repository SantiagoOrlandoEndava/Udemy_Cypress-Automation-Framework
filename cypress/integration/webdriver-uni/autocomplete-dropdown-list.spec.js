/// <reference types="cypress" />

describe("Verify Autocomplete dropwdown lists via webdriveruni", () => {
    it("Select specific product via autocomplete list", () => {
        cy.visit("http://www.webdriveruniversity.com")
        cy.get('#autocomplete-textfield').invoke('removeAttr', 'target').click({force:true})

        cy.get('#myInput').type('A')
        cy.get('#myInputautocomplete-list > *').each(($el, index, $list) => {
            const prod = $el.text();
            const productToSelect = 'Avacado';

            if(prod === productToSelect) {
                // $el.click(); //it appeared strikethrough because it was deprecated on jQuery
                // $el.trigger('click') // option 1
                cy.wrap($el).click() // option 2

                cy.get('#submit-button').click();
                cy.url().should('include', productToSelect)
            }
        })

        cy.get('#myInput').type('g')
        cy.get('#myInputautocomplete-list > *').each(($el, index, $list) => {
            const prod = $el.text();
            const productToSelect = 'Grapes';

            if(prod === productToSelect) {
                cy.wrap($el).click()

                cy.get('#submit-button').click();
                cy.url().should('include', productToSelect)
            }
        })
        
    });
})