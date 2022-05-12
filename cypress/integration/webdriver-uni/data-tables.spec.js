/// <reference types="Cypress" />
describe("Handling data via webdriveruni", () => {

    beforeEach(() => {
        cy.visit("http://webdriveruniversity.com/");
        cy.get("#data-table").invoke("removeAttr", "target").click({ force: true });
    });

    it("Calculate and assert the total age of all users", () => {
        let totalAge = 0

        cy.get('#thumbnail-1 td:nth-child(3)').each(($el, index, $list) => {
            totalAge += Number($el.text())
        }).then(() => { //thats the solution. To put a then() next to the each
            expect(totalAge).to.eq(322)
        })
    });

    it("Calculate and assert the age of a given user based on last name", () => {
        //option 1
        // cy.get('#thumbnail-1 td:nth-child(2)').each(($el, index, $list) => {
        //     const text = $el.text()
        //     if(text.includes("Woods")) {
        //         cy.get('#thumbnail-1 td:nth-child(2)').eq(index).next().then((age) => {
        //             const userAge = age.text();
        //             expect(userAge).to.equal("80");
        //         })
        //     }
        // })

        //option 2
        cy.get('#thumbnail-1 td:nth-child(2)').contains('Woods').next().invoke('text').should('eq', '80')
    }); 

});
  