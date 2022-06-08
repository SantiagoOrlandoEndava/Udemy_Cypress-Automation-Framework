import AutoStore_Homepage_PO from '../../support/pageObjects/automation-test-store/AutoStore_Homepage_PO'
import AutoStore_HairCare_PO from '../../support/pageObjects/automation-test-store/AutoStore_HairCare_PO'

/// <reference types="cypress" />

describe("Add multiple items to basket", () => {
    const autoStore_Homepage_PO = new AutoStore_Homepage_PO();
    const autoStore_HairCare_PO = new AutoStore_HairCare_PO();

    before(() => {
        cy.fixture("products").then((data) => {
            globalThis.data = data;
        });
    })

    beforeEach(() => {
        // cy.visit("https://automationteststore.com/");
        // cy.get("a[href*='product/category&path=']").contains("Hair Care").click();
        autoStore_Homepage_PO.accessHomepage();
        autoStore_Homepage_PO.clickOn_HairCare_Link();
    })

    it("Add specific items to basket", () => {
        autoStore_HairCare_PO.addHairCareProductsToBasket();
        cy.get('.block_7').contains('3')
        cy.get('.dropdown-toggle > .fa').click()
        cy.get('.product-list tr').should('have.length', 4)
    })

});
