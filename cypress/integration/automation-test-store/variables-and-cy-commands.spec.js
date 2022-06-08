/// <reference types="cypress" />

describe("Verifying variables, cypress commands and jquery commands", () => {

    beforeEach(() => {
        cy.visit("https://automationteststore.com/")
    });

    it("Navigating to specific product pages", () => {
        //The following will fail
        // const makeupLink = cy.get("a[href*='product/category&path=']").contains("Makeup")
        // const skincareLink = cy.get("a[href*='product/category&path=']").contains("Skincare")
        // makeupLink.click();
        // skincareLink.click();

        //The following will pass
        // const makeupLink = cy.get("a[href*='product/category&path=']").contains("Makeup")
        // makeupLink.click();
        // const skincareLink = cy.get("a[href*='product/category&path=']").contains("Skincare")
        // skincareLink.click();

        //Recommended Approach
        cy.get("a[href*='product/category&path=']").contains("Skincare").click()
        cy.get("a[href*='product/category&path=']").contains("Makeup").click()
    })

    it("Navigating to specific product pages", () => {
        cy.get("a[href*='product/category&path=']").contains("Makeup").click()

        //Following code will fail
        // const header = cy.get("h1 .maintext");
        // cy.log(header.text())

        cy.get("h1 .maintext").then(($headerText) => {
            const headerText = $headerText.text()
            cy.log("Found header text: " + headerText)
            expect(headerText).to.eq('Makeup')
        })
    })

    it("Validate properties of the Contact Us Page", () => {
        cy.visit("https://automationteststore.com/index.php?rt=content/contact")

        //Uses cypress commands and chaining
        cy.contains('#ContactUsFrm', 'Contact Us Form').find('#field_11').should('contain', 'First name')

        //JQuery Approach
        // cy.contains('#ContactUsFrm', 'Contact Us Form').then(text => {
        //     const firstNameText = text.find('#field_11').text()
        //     expect(firstNameText).to.contain('First name')

        //     //Embedded commands (Closure)
        //     cy.get('#field_11').then(fnText => {
        //         cy.log(fnText.text())
        //         expect(fnText).to.contain('First name')
        //     })
        // })
    })
    
})