beforeEach(() => {
    cy.resetDatabase();
});

describe("Testando alterações na página", () => {
    it("Capaz de ir para a página inicial", () => {
        cy.visit("http://localhost:3000/");

        cy.createRecommendation();

        cy.contains("Top").click();

        cy.contains("0").should("be.visible");

        cy.url().should("equal", "http://localhost:3000/top");
    });

    it("Capaz de ir para a página aleatória", () => {
        cy.visit("http://localhost:3000/");

        cy.createRecommendation();

        cy.contains("Random").click();

        cy.contains("0").should("be.visible");

        cy.url().should("equal", "http://localhost:3000/random");
    });
});
