beforeEach(() => {
    cy.resetDatabase();
});

describe("Testando interações", () => {
    it("Capaz de upVote", () => {
        cy.visit("http://localhost:3000/");

        cy.createRecommendation();

        cy.intercept("GET", `http://localhost:5000/recommendations`).as(
            "loadRecom"
        );
        cy.wait("@loadRecom");

        cy.get("#upVote").click();

        cy.contains("1").should("be.visible");
    });

    it("Capaz de downVote", () => {
        cy.visit("http://localhost:3000/");

        cy.createRecommendation();

        cy.intercept("GET", `http://localhost:5000/recommendations`).as(
            "loadRecom"
        );
        cy.wait("@loadRecom");

        cy.get("#downVote").click();

        cy.contains("-1").should("be.visible");
    });

    it("Deve eliminar a recomendação votando negativamente 6 vezes", () => {
        cy.visit("http://localhost:3000/");

        cy.createRecommendation();

        cy.intercept("GET", `http://localhost:5000/recommendations`).as(
            "loadRecom"
        );
        cy.wait("@loadRecom");

        cy.get("#downVote").click();
        cy.get("#downVote").click();
        cy.get("#downVote").click();
        cy.get("#downVote").click();
        cy.get("#downVote").click();
        cy.get("#downVote").click();

        cy.contains("No recommendations yet! Create your own :)").should(
            "be.visible"
        );
    });
});
