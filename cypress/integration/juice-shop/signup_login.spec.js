/// <reference types="cypress" />

describe('Signup test', () => {

    const email = Math.random().toString(36).substring(2) + '@gmail.com'
    const password = "password1";
    const securityAnswer = "Hello world";

    context("UI tests", () => {
        beforeEach(() => {
            // cy.visit("http://localhost:3000/#/");
            // cy.get(".cdk-overlay-backdrop").click(-50, -50, {force: true})
            cy.visit('http://localhost:3000/')
            cy.get('button').contains('Dismiss').click()
            cy.get('#navbarAccount').click()
            cy.get('#navbarLoginButton').click()
            cy.url().should('include', 'login')
        })
    
        it('Test valid signup', () => {
            cy.get('#newCustomerLink').contains('Not yet a customer').click({force: true}) //the force:true is because on the website it sometimes appeared a popup for a language issue that covers the button
            cy.url().should('include', 'register')
    
            cy.get('#emailControl').type(email)
            cy.get('#passwordControl').type(password)
            cy.get('#repeatPasswordControl').type(password)
    
            cy.get('#mat-select-2').click().get('mat-option').eq(1).click()
            // cy.get('.mat-form-field-type-mat-select > .mat-form-field-wrapper > .mat-form-field-flex > .mat-form-field-infix').click();
            // cy.get('#mat-option-3 > .mat-option-text').click();
            //TODO : watch this lines from above
    
            cy.get('#securityAnswerControl').type(securityAnswer)
            cy.get('#registerButton').click()
            cy.url().should('include', 'login')
            cy.get('.mat-snack-bar-container').contains('Registration completed successfully.');
        })
    
        it('Test valid login', () => {
            cy.get('#email').type(email)
            cy.get('#password').type(password)
            cy.get('#loginButton').click()
            // cy.get('.mat-button-wrapper').contains('Your Basket')
            cy.contains('Your Basket')
        })

    })

    context("API tests", () => {
        const userCredentials = {
            "email": email,
            "password": password
        }

        it('Test valid login via API', () => {
            cy.request({
                method: 'POST',
                url: 'http://localhost:3000/rest/user/login',
                body: userCredentials
            }).then(({response}) => {
                expect(response.statusCode).to.eq(200)
            })

            //option 2:
            // cy.request("POST", "http://localhost:3000/rest/user/login", userCredentials).then(response => {
            //     expect(response.status).to.eq(200);
            // })
        })

        it('Login via token', () => {
            cy.request("POST", "http://localhost:3000/rest/user/login", userCredentials).then(response => {
                const userToken = response.body.authentication.token
                
                cy.visit("http://localhost:3000/", { 
                    onBeforeLoad(browser) { //with this, we are making that before the page loads, it saves the token in the browser localStorage. So when it enters the website, it is as if the user had already logged in
                        browser.localStorage.setItem("token", userToken)
                    }
                })

                cy.get('button').contains('Dismiss').click()
                cy.contains('Your Basket')
            })
        })

    })

})
