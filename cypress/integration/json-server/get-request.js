/// <reference types="cypress" />

describe("Get Request", () => {
    var result;

    it("Validate status code of the /posts api", () => {
        //option 1: 
        // result = cy.request("http://localhost:3000/posts");
        // result.its("status").should("equal", 200)

        //option 2:
        cy.request("http://localhost:3000/posts").then(response => {
            expect(response.status).to.eq(200)
        })
    })

    it("Validate /posts api contains the correct keys and values", () => {
        cy.request({
            method: "GET",
            url: "http://localhost:3000/posts",
            headers: {
                accept: "application/json"
            }
        }).then(response => {
            let body = response.body;
            cy.log(body)
            expect(body[0]).has.property("title", "Example Json Server");
            expect(body[1]).has.property("author", "John Doe");

            body.forEach((item) => {
                expect(item).to.have.all.keys("id", "title", "author");
            });
        })
    })

})