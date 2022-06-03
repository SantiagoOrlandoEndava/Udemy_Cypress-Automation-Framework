/// <reference types="cypress" />

describe("Handle js alerts", () => {

    beforeEach(() => {
        cy.visit("/Popup-Alerts/index.html")
    })

    it("Confirm js alert contains the correct text", () => {
        cy.get('#button1').click()

        cy.on('window:alert', (str) => {
            expect(str).to.equal('I am an alert box!')
        })
    })

    it("Validate js confirm alert box works correctly when clicking ok", () => {
        cy.get('#button4').click()

        cy.on('window:confirm', (str) => {
            expect(str).to.eq('Press a button!')
            return true;
        })
        cy.get('#confirm-alert-text').contains('You pressed OK!')
    })

    it("Validate js confirm alert box works correctly when clicking cancel", () => {
        cy.get('#button4').click()

        cy.on('window:confirm', (str) => {
            expect(str).to.eq('Press a button!')
            return false;
        })
        cy.get('#confirm-alert-text').contains('You pressed Cancel!')
    })

    it("Validate js confirm alert box using a stub", () => {
        const stub = cy.stub()

        // stub.onFirstCall().returns(true) //not necessary because the default is true
        stub.onSecondCall().returns(false) //I am making the stub change the behavior of the window:confirm and making it cancel the alert

        cy.on('window:confirm', stub)


        cy.get('#button4').click().then(() => {
            expect(stub.getCall(0)).to.be.calledWith('Press a button!')
        }).then(() => {
            cy.get('#confirm-alert-text').contains('You pressed OK!')
        })

        cy.get('#button4').click().then(() => {
            expect(stub.getCall(1)).to.be.calledWith('Press a button!')
        }).then(() => {
            cy.get('#confirm-alert-text').contains('You pressed Cancel!')
        })

        //if the window:confirm is called more than 2 times, it will return True by default.
        cy.get('#button4').click().then(() => {
            expect(stub).to.be.calledWith('Press a button!')
        }).then(() => {
            cy.get('#confirm-alert-text').contains('You pressed OK!')
        })
    })

})