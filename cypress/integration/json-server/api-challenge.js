/// <reference types="cypress" />

describe("Post, Get, Delete Request", () => {
  
    var comments = new Array();
    let comment = Math.random().toString(36).substring(1) + Math.random().toString(36).substring(1);
    let randomPostId = Math.floor(Math.random() * 1000 + 1);
    const urlBase = "http://localhost:3000/comments";

    it("Create a new comment", () => {
        cy.request({
            method: "POST",
            url: urlBase,
            body: {
                body: comment,
                postId: randomPostId
            }
        }).then(response => {
            expect(response.status).to.eql(201)
            //check the response.body
        })
    })

    it("Locate and assert the new comment", () => {
        cy.request({
            method: "GET",
            url: urlBase,
            headers: {
                accept: "application/json"
            }
        }).then(response => {
            let body = response.body;
            body.forEach((item) => {
                comments.push(item.body);
            })
        }).then(() => { //probably this is not necessary. I could directly grab the last object of the body array and make the assertion
            var latestComment = comments[comments.length -1]
            expect(latestComment).to.eq(comment);
        })
    })

    it("Delete the new comment", () => {
        cy.request({
            method: "DELETE",
            url: urlBase + "/" + comments.length
        }).then((response) => {
            expect(response.status).to.eql(200);
        });
    })

});
