/// <reference types="cypress" />

describe("Test mouse actions", () => {

    beforeEach(() => {
        cy.visit("/Actions/index.html")
    })

    it("I should be able to drag and drop a draggable item", () => {
        cy.get('#draggable').trigger('mousedown', {which: 1}) 
        //without the which:1 it doesnt work. Apparently it is to click on the center of the element, or something about the left click

        cy.get('#droppable').trigger('mousemove').trigger('mouseup', {force:true}) 
        //without the force:true it doesnt work, because the draggable is covering the droppable. It is to force that the mouse action is released.
    })

    it("I should be able to perform a double mouse click", () => {
        cy.get('#double-click').dblclick();
    })

    it("I should be able hold down the left mouse click button on a given element", () => {
        //option 1
        cy.get('#click-box').trigger('mousedown', {which: 1}).then(($element) => {
            expect($element).to.have.css('background-color', 'rgb(0, 255, 0)')
        })

        //option 2
        // cy.get('#click-box').trigger('mousedown', {which: 1})
        // cy.get('#click-box').should('have.css', 'background-color', 'rgb(0, 255, 0)')
    })
    
}) 