/// <reference types="cypress" />

describe("Test Datepicker via webdriveruni", () => {
    it("Select date from the datepicker", () => {
        cy.visit("http://www.webdriveruniversity.com")
        cy.get('#datepicker').invoke('removeAttr', 'target').click({force:true})
        cy.get('#datepicker').click();

        var date = new Date();
        date.setDate(date.getDate() + 400); //get current day and add 400 days

        var futureYear = date.getFullYear();
        var futureMonth = date.toLocaleString("en-GB", {month: "long"}); //the "en-GB" is to display it in Great Britain style. If I did it with the "default" option it returns the month in Spanish and the test keeps iterating.
        var futureDay = date.getDate();

        cy.log("Future year to select: " + futureYear);
        cy.log("Future month to select: " + futureMonth);
        cy.log("Future day to select: " + futureDay);

        function selectYear() {
            cy.get('.datepicker-dropdown').find('.datepicker-switch').first().then(currentDate => {
                if(!currentDate.text().includes(futureYear)) {
                    cy.get('.next').first().click();
                    selectYear();
                }
            })
        }

        function selectMonth() {
            cy.get('.datepicker-dropdown').find('.datepicker-switch').first().then(currentDate => {
                if(!currentDate.text().includes(futureMonth)) {
                    cy.get('.next').first().click();
                    selectMonth();
                }
            })
        }
        
        function selectFutureDay() {
            cy.get('[class="day"]').contains(futureDay).click();
        }

        selectYear();
        selectMonth();
        selectFutureDay();
    });
})