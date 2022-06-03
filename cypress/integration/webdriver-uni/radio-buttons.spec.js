/// <reference types="cypress" />

describe("Verify radio buttons via webdriveruni", () => {

    beforeEach(() => {
        cy.visit("/Dropdown-Checkboxes-RadioButtons/index.html")
    })

    it("Check specific radio buttons", () => {
        cy.get('#radio-buttons').find("[type='radio']").first().check().should('be.checked')
        cy.get('#radio-buttons').find("[type='radio']").eq(1).check().should('be.checked')
    })

    it("Validate the states of specific radio buttons", () => {
        cy.get("[value='lettuce']").should('not.be.checked')
        cy.get("[value='pumpkin']").should('be.checked')

        cy.get("[value='lettuce']").check().should('be.checked')
        cy.get("[value='pumpkin']").should('not.be.checked')

        cy.get("[value='cabbage']").should('be.disabled')
    })

})