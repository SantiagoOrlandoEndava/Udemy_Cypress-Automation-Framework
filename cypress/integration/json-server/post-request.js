/// <reference types="cypress" />

//NOT FIXING IT BECAUSE I WOULD NEED TO INSTALL A LOT OF THINGS.
//should fix the strategy, because the second test depends on the first one.
//Could be 2 describes, one for the POST and the other with the POST in a before hook and the GET in the it().
//Or actually I could make all of this spec in only one it(), given that 
describe("Post Request", () => {

    var titleOfPosts = new Array();
    let randomTitle = Math.random().toString(36).substring(1) + Math.random().toString(36).substring(1);

    it("Create a new post via /posts api", () => {
        cy.request({
            method: "POST",
            url: "http://localhost:3000/posts",
            body: {
                title: randomTitle,
                author: "Sarah Jones"
            }
        }).then(response => {
            expect(response.status).to.eq(201)
        })
    })

    it("Validate title of latest post", () => {
        cy.request({
            method: "GET",
            url: "http://localhost:3000/posts",
            headers: {
                accept: "application/json"
            }
        }).then(response => {
            let body = response.body;
            body.forEach((item) => {
                titleOfPosts.push(item.title);
            })
        }).then(() => { //probably this is not necessary. I could directly grab the last object of the body array and make the assertion
            var latestPostTitle = titleOfPosts[titleOfPosts.length -1]
            expect(latestPostTitle).to.eq(randomTitle);
        })
    })

});
