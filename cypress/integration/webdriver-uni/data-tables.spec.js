//CREATE FUNCTION FOR BOTH IT() GIVEN ITS REPETITIVE

/// <reference types="Cypress" />
describe("Handling data via webdriveruni", () => {

    beforeEach(() => {
        cy.visit("/Data-Table/index.html");
    });

    it("Calculate and assert the total age of all users", () => {
        let totalAge = 0

        cy.get('#thumbnail-1').contains('th', 'Age').invoke('index').then((i) => { //this brings the index of the column Age.
            let indexOfAge = i + 1;
            cy.get('#thumbnail-1 td:nth-child(' + indexOfAge + ')').each(($el, index, $list) => {
                totalAge += Number($el.text())
            }).then(() => { //thats the solution! To put a then() next to the each
                expect(totalAge).to.eq(322)
            })
        })
    });

    it("Calculate and assert the age of a given user based on last name", () => {
        cy.get('#thumbnail-1').contains('th', 'Lastname').invoke('index').then((i) => { //this brings the index of the column Lastname.
            let indexOfLastname = i + 1;
            
            //option 1
            // cy.get('#thumbnail-1 td:nth-child(' + indexOfLastname + ')').each(($el, index, $list) => {
            //     const text = $el.text()
            //     if(text.includes("Woods")) {
            //         cy.get('#thumbnail-1 td:nth-child(' + indexOfLastname + ')').eq(index).next().then((age) => {
            //             const userAge = age.text();
            //             expect(userAge).to.equal("80");
            //         })
            //     }
            // })
            
            //option 2
            cy.get('#thumbnail-1 td:nth-child(' + indexOfLastname + ')').contains('Woods').next().invoke('text').should('eq', '80')
        })
    }); 

});
  