/// <reference types="cypress" />

describe("Test File Upload via webdriveruni", () => {

    beforeEach(() => {
        cy.visit("/File-Upload/index.html?filename=")
    });

    it("Upload a file", () => {
        let fileToUpload = "gatito.jpg";
        
        cy.fixture("gatito.jpg", "base64").then(fileContent => {
            cy.get("#myFile").attachFile(
                {
                    fileContent,
                    fileName: fileToUpload,
                    mimeType: "image/jpg" //file type
                },
                {
                    uploadType: "input"
                }
            )
        })

        //option 1: using stub
        const stub = cy.stub()
        cy.on('window:alert', stub)

        cy.get("#submit-button").click().then(() => {
            expect(stub).to.be.calledWith('Your file has now been uploaded!')
        }).then(() => {
            cy.url().should('include', fileToUpload)
        })

        //option 2: without using stub
        // cy.get("#submit-button").click();

        // cy.on('window:alert', (str) => {
        //     expect(str).to.equal('Your file has now been uploaded!')
        // })

        // // cy.url().contains("gatito.jpg") //do not work with contanis because it requeire a global window object as a subject
        // cy.url().should('include', fileToUpload)
    });

    it("Upload no file", () => {
        //option 1: using stub
        const stub = cy.stub()
        cy.on('window:alert', stub)

        cy.get("#submit-button").click().then(() => {
            expect(stub).to.be.calledWith('You need to select a file to upload!')
        }).then(() => {
            cy.url().should('eq', Cypress.config().baseUrl + '/File-Upload/index.html?filename=')
        })

        //option 2: without using stub
        // cy.get("#submit-button").click();

        // cy.on('window:alert', (str) => {
        //     expect(str).to.equal('You need to select a file to upload!')
        // })

        // cy.url().should('eq', Cypress.config().baseUrl + '/File-Upload/index.html?filename=')
    });
})