/// <reference types="cypress" />

describe("Network Requests", () => {

    beforeEach(() => {
        cy.visit("https://example.cypress.io/commands/network-requests");
    });

    it("Get Request", () => {
        cy.intercept({
            method: "GET",
            url: "**/comments/*" 
        },
        { //with this code, we are stubbing the response. That means that whenever this GET request is made, this following body will be the response.
            body: { 
                postId: 1,
                id: 1,
                name: "test name 123",
                email: "joe_blogs123@test.com",
                body: "Hello world"
            }
        }).as("getComment");

        cy.get(".network-btn").click(); //when we click this, the GET request is made

        cy.wait("@getComment").its("response.statusCode").should("eq", 200);
    });

    it("Post Request", () => {
        cy.intercept("POST", "/comments").as("postComment");

        cy.get(".network-post").click(); //when we click this, the POST request is made

        cy.wait("@postComment").should(({request, response}) => {
            cy.log("request: ",request);

            expect(request.body).to.include("email");
            expect(request.headers).to.have.property("content-type");
            expect(request.headers).to.have.property("origin",  "https://example.cypress.io");

            cy.log("response: ", response);
            expect(response.body).to.have.property("name", "Using POST in cy.intercept()");
        })
    })

    it("Put Request", () => {
        let message = "Unable to find comment!"
        
        cy.intercept({
            method: "PUT",
            url: "**/comments/*"
        },
        { //with this code we are stubbing a response to this PUT, so when it gets called, this will be the response:
            statusCode: 404,
            body: { error: message },
            delay: 500
        }).as("putComment");

        cy.get(".network-put").click(); //when we click this, the PUT request is made

        cy.wait("@putComment").its("response.statusCode").should("eq", 404);

        cy.get(".network-put-comment").should("contain", message);
    })

});
