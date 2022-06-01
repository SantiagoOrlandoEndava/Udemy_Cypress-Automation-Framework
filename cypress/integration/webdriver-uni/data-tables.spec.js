/// <reference types="Cypress" />
describe("Handling data via webdriveruni", () => {

    beforeEach(() => {
        cy.visit("/Data-Table/index.html");
    });


    //OPTION 0: create a custom command. It worked, but as the only spec I would be using the function is this one,
    // it made no sense, and it is more efficient to make a function. Custom commands are work well when I need them for all my tests


    //OPTION 1: make a function with a promise. The following warning is displayed on Cypress:

    // While this works in practice, it's often indicative of an anti-pattern. 
    // You almost never need to return both a promise and also invoke cy commands.
    // Cy commands themselves are already promise like, and you can likely avoid the use of the separate Promise.

    // function getNumberOfColumn(column) {
    //     return new Promise((resolve, reject) => {
    //         cy.get('#thumbnail-1').contains('th', column).invoke('index').then(campaign => {
    //             resolve(campaign+1);
    //         });
    //     });
    // }


    //OPTION 2: make a JS function   //https://docs.cypress.io/api/cypress-api/custom-commands#Best-Practices
    function getNumberOfColumn(column) {    //or also:  const getNumberOfColumn = (column) => {
        // return cy chain here so we can chain off this function below
        return cy.get('#thumbnail-1').contains('th', column).invoke('index').then((i) => { //this brings the index of the column
            return i + 1;
        })
    }


    it("Calculate and assert the total age of all users", () => {
        let totalAge = 0

        return getNumberOfColumn('Age').then((i) => { //this brings the index of the column Age.
            cy.get('#thumbnail-1 td:nth-child(' + i + ')').each(($el, index, $list) => {
                totalAge += Number($el.text())
            }).then(() => { //thats the solution! To put a then() next to the each
                expect(totalAge).to.eq(322)
            })
        })
    });

    it("Calculate and assert the age of a given user based on last name", () => {
        return getNumberOfColumn('Lastname').then((i) => { //this brings the index of the column Lastname.
            
            //option 1
            // cy.get('#thumbnail-1 td:nth-child(' + i + ')').each(($el, index, $list) => {
            //     const text = $el.text()
            //     if(text.includes("Woods")) {
            //         cy.get('#thumbnail-1 td:nth-child(' + i + ')').eq(index).next().then((age) => {
            //             const userAge = age.text();
            //             expect(userAge).to.equal("80");
            //         })
            //     }
            // })
            
            //option 2
            cy.get('#thumbnail-1 td:nth-child(' + i + ')').contains('Woods').next().invoke('text').should('eq', '80')
        })
    }); 

});
  