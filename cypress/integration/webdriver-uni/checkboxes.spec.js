/// <reference types="cypress" />

describe("Verify checkboxes via webdriveruni", () => {
    beforeEach(function() {
        //option 1
        // cy.navigateTo_WebdriverUni_Homepage()
        // cy.get('#dropdown-checkboxes-radiobuttons').invoke('removeAttr', 'target').click({force:true})
        
        //option 2
        //cy.visit("/Dropdown-Checkboxes-RadioButtons/index.html")

        //option 3
        cy.navigateTo_WebdriverUni_Checkbox_page()
    })

    it("Check and validate checkbox", () => {
        //cy.get('#checkboxes > :nth-child(1) > input').check().should('be.checked')
        cy.get("#checkboxes input[type='checkbox']").first().check().should('be.checked')
        cy.get("#checkboxes input[type='checkbox']").eq(1).check().should('be.checked')
    });

    it("Uncheck and validate checkbox", () => {
        // cy.get(':nth-child(5) > input').uncheck().should('not.be.checked')
        cy.get("#checkboxes input[type='checkbox']").eq(2).uncheck().should('not.be.checked')
    });

    it("Check multiple checkboxes", () => {
        //cy.get("input[type='checkbox']").check(["option-1", "option-2", "option-3", "option-4"]).should('be.checked') //this way I check the elements I specify
        cy.get("input[type='checkbox']").check().should('be.checked') //this way I check all the elements returned in the get()
    });

    /* ==== Test Created with Cypress Studio ==== */
    it('Click all radio buttons', function() {
        /* ==== Generated with Cypress Studio ==== */
        cy.get('[value="green"]').check();
        cy.get('[value="blue"]').check();
        cy.get('[value="yellow"]').check();
        cy.get('#radio-buttons > [value="orange"]').check();
        cy.get('[value="purple"]').check();
        /* ==== End Cypress Studio ==== */
    });
})