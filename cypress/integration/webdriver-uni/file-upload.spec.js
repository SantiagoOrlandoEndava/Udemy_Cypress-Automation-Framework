/// <reference types="cypress" />

describe("Test File Upload via webdriveruni", () => {

    beforeEach(() => {
        cy.visit("http://www.webdriveruniversity.com")
        cy.get('#file-upload').invoke('removeAttr', 'target').click({force:true})
    });

    it("Upload a file....", () => {
        cy.fixture("gatito.jpg", "base64").then(fileContent => {
            cy.get("#myFile").attachFile(
                {
                    fileContent,
                    fileName: "gatito.jpg",
                    mimeType: "image/jpg" //tipo del archivo a subir
                },
                {
                    uploadType: "input" //con esto decimos que es de tipo upload
                }
            )
        })
        cy.get("#submit-button").click();
    });

    it("Upload no file....", () => {
        cy.get("#submit-button").click();
    });
})