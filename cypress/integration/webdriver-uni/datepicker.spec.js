/// <reference types="cypress" />

describe("Test Datepicker via webdriveruni", () => {

    it("Select date from the datepicker", () => {
        cy.visit("/Datepicker/index.html")

        cy.get('#datepicker').click();

        var date = new Date();
        date.setDate(date.getDate() + 400); //get current day and add 400 days

        var futureYear = date.getFullYear();
        var futureMonth = date.toLocaleString("en-GB", {month: "long"}); 
        //the "en-GB" is to display it in Great Britain style. 
        //If I did it with the "default" option it returns the month in Spanish and the test keeps iterating.
        var futureDay = date.getDate();

        cy.log("Future year to select: " + futureYear);
        cy.log("Future month to select: " + futureMonth);
        cy.log("Future day to select: " + futureDay);

        
        function selectYearOrMonth(future) {
            return cy.get('.datepicker-dropdown').find('.datepicker-switch').first().then(currentDate => {
                if(!currentDate.text().includes(future)) {
                    cy.get('.next').first().click();
                    selectYearOrMonth(future);
                }
            })
        }

        function selectYear() {
            return selectYearOrMonth(futureYear)
        }

        function selectMonth() {
            return selectYearOrMonth(futureMonth)
        }

        
        function selectFutureDay() {
            cy.get('[class="day"]').contains(futureDay).click();
        }

        selectYear();
        selectMonth();
        selectFutureDay();
    });
})