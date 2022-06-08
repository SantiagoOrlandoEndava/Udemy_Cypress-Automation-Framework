/// <reference types="cypress" />

describe("Update Request", () => {

    //should make a GET after this so as to check if it is indeed modified.
    it("Update an existing post via the /posts api", () => {
        cy.request({
            method: "PUT",
            url: "http://localhost:3000/posts/2",
            body: {
                title: "Where can i buy apples?",
                author: "Tom Jones",
            },
        }).then((response) => {
            expect(response.status).to.eql(200);
        });
    })

});
