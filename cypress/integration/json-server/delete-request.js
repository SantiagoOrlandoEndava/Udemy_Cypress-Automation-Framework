/// <reference types="cypress" />

describe("Delete Request", () => {
  
    //should make a GET after this so as to check it was indeed deleted
    it("Delete a post via /posts api", () => {
        cy.request({
            method: "DELETE",
            url: "http://localhost:3000/posts/13"
        }).then((response) => {
            expect(response.status).to.eql(200);
        });
    })

});
  