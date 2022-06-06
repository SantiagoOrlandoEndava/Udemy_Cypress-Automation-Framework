/// <reference types="cypress" />

describe("Alias and invoke", () => {

	beforeEach(() => {
		cy.visit("https://automationteststore.com/");
	})

	it("Validate a specific hair care product", () => {
		cy.get("a[href*='product/category&path=']").contains("Hair Care").click();

		cy.get(".fixed_wrapper .prdocutname").eq(0).invoke("text").then((productThumbnail) => {
			cy.wrap(productThumbnail).should("include", "Seaweed Conditioner");
			// expect(productThumbnail).to.include('Seaweed Conditioner') //2 ways of doing the same thing
		})
	});

	it("Validate product thumbnail", () => {
		cy.get('.thumbnail').should('have.length', 16)
		cy.get('.thumbnail .productcart').should('have.attr','title', 'Add to Cart')
	});


	it("Calculate total of normal and sale products", () => { //option saving array of texts as an alias
		cy.get('.thumbnail .oneprice').invoke('text').as('normalItemPrice')
		cy.get('.thumbnail .pricenew').invoke('text').as('saleItemPrice')

		var itemsTotalPrice = 0;
		cy.get('@normalItemPrice').then($linkText => {
			var normalItemsPriceTotal = 0;
			var normalItemsPrices = $linkText.split('$');

			for(var i = 0; i < normalItemsPrices.length; i++) {
				normalItemsPriceTotal += Number(normalItemsPrices[i])
			}

			itemsTotalPrice += normalItemsPriceTotal;
			cy.log("Non sale price items total: " + normalItemsPriceTotal)
		})

		cy.get('@saleItemPrice').then($linkText => {
			var saleItemsPriceTotal = 0;
			var saleItemsPrices = $linkText.split('$');

			for(var i = 0; i < saleItemsPrices.length; i++) {
				saleItemsPriceTotal += Number(saleItemsPrices[i])
			}

			itemsTotalPrice += saleItemsPriceTotal;
			cy.log("Sale price items total: " + saleItemsPriceTotal)
		})
		.then(() => {
			cy.log("The total price of all products: " + itemsTotalPrice)
			expect(itemsTotalPrice).to.equal(648.5)
		})
	});

	it("Calculate total of normal and sale products - option 2", () => { //option accessing the array of texts via promise/then
		var itemsTotalPrice = 0;

		cy.get('.thumbnail .oneprice').invoke('text').then($linkText => {
			var normalItemsPriceTotal = 0;
			var normalItemsPrices = $linkText.split('$');
			
			//option 1
			// for(var i = 0; i < normalItemsPrices.length; i++) {
			//     // cy.log(normalItemsPrices[i])
			//     normalItemsPriceTotal += Number(normalItemsPrices[i])
			// }

			//option 2
			var normalItemsPricesNumber = Cypress._.map(normalItemsPrices, Number) //had to do this because normalItemsPrices was an array of strings. With this I turn it in an array of numbers
			normalItemsPriceTotal = Cypress._.sum(normalItemsPricesNumber)

			itemsTotalPrice += normalItemsPriceTotal;
			cy.log("Non sale price items total: " + normalItemsPriceTotal)
			
			//option 3
			// cy.wrap(normalItemsPrices).each(($el, index, $list) => {
			//   normalItemsPriceTotal += Number($el)
			// }).then(() => {
			//   itemsTotalPrice += normalItemsPriceTotal;
			//   cy.log("Non sale price items total: " + normalItemsPriceTotal)
			// })
		})

		cy.get('.thumbnail .pricenew').invoke('text').then($linkText => {
			var saleItemsPriceTotal = 0;
			var saleItemsPrices = $linkText.split('$');

			for(var i = 0; i < saleItemsPrices.length; i++) {
				saleItemsPriceTotal += Number(saleItemsPrices[i])
			}
			
			itemsTotalPrice += saleItemsPriceTotal;
			cy.log("Sale price items total: " + saleItemsPriceTotal)
		})
		.then(() => {
			cy.log("The total price of all products: " + itemsTotalPrice)
			expect(itemsTotalPrice).to.equal(648.5)
		})

	});

});
