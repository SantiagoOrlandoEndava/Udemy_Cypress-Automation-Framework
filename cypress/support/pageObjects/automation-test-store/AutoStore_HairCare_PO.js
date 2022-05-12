class AutoStore_HairCare_Po {
    addHairCareProductsToBasket() {
        data.productName.forEach((element) => {
            cy.addProductToBasket(element)
        })
        cy.get('.dropdown-toggle > .fa').click();
    }
}
export default AutoStore_HairCare_Po;