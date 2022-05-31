import Homepage_PO from '../../support/pageObjects/webdriver-uni/Homepage_PO' // "..//" goes 1 level up.
import Contact_Us_PO from '../../support/pageObjects/webdriver-uni/Contact_Us_PO'

/// <reference types="cypress" />

describe("Test Contact Us form via WebdriverUni", () => {
    const homepage_PO = new Homepage_PO();
    const contact_Us_PO = new Contact_Us_PO();

    before(() => {
        cy.fixture('example').then(function(data) {
            //this.data = data; //doesnt work
            globalThis.data = data;
        })
    })

    beforeEach(() => {
        homepage_PO.visitHomepage();
        homepage_PO.clickOn_ContactUs_Button();
    })

    it("Should be able to submit a successful submission via contact us form", () => {
        cy.title().should('include', 'WebDriver | Contact Us');
        cy.url().should('include', 'contactus');

        //option 1
        // cy.get('[name="first_name"]').type(data.first_name);
        // cy.get('[name="last_name"]').type(data.last_name);
        // cy.get('[name="email"]').type(data.email)
        // cy.get('textarea.feedback-input').type("How can I learn Cypress?")
        // cy.get('[type="submit"]').click();
        // cy.get('h1').should('have.text', 'Thank You for your Message!')

        //option 2 - custom command
        // cy.webdriverUni_ContactForm_Submission(Cypress.env("first_name"), data.last_name, data.email, 
        //     "How can I learn Cypress?", 'h1', 'Thank You for your Message!');

        //option 3 - PO
        contact_Us_PO.contactForm_Submission(Cypress.env("first_name"), data.last_name, data.email, 
            "How can I learn Cypress?", 'h1', 'Thank You for your Message!')
    });

    it("Should not be able to submit a successful submission via contact us form as all fields are required", () => {
        //option 2 - custom command
        // cy.webdriverUni_ContactForm_Submission(data.first_name, data.last_name, " ", 
            // "How can I learn Cypress?", 'body', 'Error: Invalid email address');
        //in here I am sending the email field with a " " (a space), which is not exactly what I was trying to do, because a field with a " " is not
        //the same as an empty field. There are workarounds for this, but in order not to make the code bigger I am keeping it like that.

        //option 3 - PO
        contact_Us_PO.contactForm_Submission(Cypress.env("first_name"), data.last_name, " ", 
            "How can I learn Cypress?", 'body', 'Error: Invalid email address')
    });

})