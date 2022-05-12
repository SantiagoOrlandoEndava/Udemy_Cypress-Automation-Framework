class HomePage_PO {
    visitHomepage() {
        cy.visit('/');
    }

    clickOn_ContactUs_Button() {
        cy.get('#contact-us').invoke('removeAttr', 'target').click({ force: true })
    }
}
export default HomePage_PO;