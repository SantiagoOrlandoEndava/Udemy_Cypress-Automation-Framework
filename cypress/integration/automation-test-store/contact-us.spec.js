/// <reference types="cypress" />

describe("Test Contact Us form via Automation Test Store", () => {

    before(() => {
        cy.fixture("userDetails").as("user")
        cy.visit("https://www.automationteststore.com/");
    })

    it("Should be able to submit a successful submission via contact us form", () => {
        //cy.xpath("//a[contains(@href, 'contact')]").click();

        // cy.get("a[href$='contact']").click().then((linkText) => {
        //     cy.log("Clicked on link using text: " + linkText.text())
        // })
        cy.get("a[href$='contact']").click().invoke('text').then((linkText) => { //2 ways of doing the same thing
            cy.log("Clicked on link using text: " + linkText)
        })

        cy.get("@user").then((user) => {
            cy.get('#ContactUsFrm_first_name').type(user.first_name);
            cy.get('#ContactUsFrm_email').type(user.email);

            cy.get('#ContactUsFrm_first_name').should('have.value',user.first_name) //when it is an input value, should contain can't be used. Instead I should use have.value
            cy.get('#ContactUsFrm_email').should('have.value', user.email)
        })

        cy.get('#ContactUsFrm_enquiry').type("Do you provide additional discount on bulk orders?")
        cy.get("button[title='Submit']").click();

        cy.get('.mb40').contains('Your enquiry has been successfully sent to the store owner!')
    });

})