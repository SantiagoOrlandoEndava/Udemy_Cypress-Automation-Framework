class AutoStore_HairCare_Po {
    addHairCareProductsToBasket() {
        data.productName.forEach((element) => {
            cy.addProductToBasket(element)
        })
    }
}
export default AutoStore_HairCare_Po;