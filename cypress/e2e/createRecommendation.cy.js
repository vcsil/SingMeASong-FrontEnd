import { faker } from "@faker-js/faker";

import { createRecommendationMusic } from "../factories/generateMusicRecommendation";

beforeEach(() => {
    cy.resetDatabase();
});

describe("Testando /", () => {
    it("Deve criar nova recomendação", () => {
        const newRecommendation = createRecommendationMusic();
        cy.visit("http://localhost:3000/");

        cy.get("#name").type(newRecommendation.name);
        cy.get("#url").type(newRecommendation.youtubeLink);
        cy.intercept("POST", `http://localhost:5000/recommendations`).as(
            "newRecom"
        );

        cy.get("#button").click();

        cy.wait("@newRecom");

        cy.contains(newRecommendation.name).should("be.visible");
    });

    it("Deve falhar ao criar recomendação com link errado", () => {
        const newRecommendation = createRecommendationMusic();

        newRecommendation.youtubeLink = faker.internet.url();

        cy.visit("http://localhost:3000/");

        cy.get("#name").type(newRecommendation.name);
        cy.get("#url").type(newRecommendation.youtubeLink);
        cy.intercept("POST", `http://localhost:5000/recommendations`).as(
            "newRecom"
        );

        cy.get("#button").click();

        cy.on("window:alert", (str) => {
            expect(str).to.equal("Error creating recommendation!");
        });
    });

    it("Deve falhar ao criar recomendação com mesmo nome", () => {
        const newRecommendation = createRecommendationMusic();

        cy.visit("http://localhost:3000/");

        cy.get("#name").type(newRecommendation.name);
        cy.get("#url").type(newRecommendation.youtubeLink);
        cy.intercept("POST", `http://localhost:5000/recommendations`).as(
            "newRecom"
        );

        cy.get("#button").click();

        cy.wait("@newRecom");

        cy.get("#name").type(newRecommendation.name);
        cy.get("#url").type(newRecommendation.youtubeLink);
        cy.intercept("POST", `http://localhost:5000/recommendations`).as(
            "newRecom2"
        );

        cy.get("#button").click();

        cy.wait("@newRecom2");

        cy.on("window:alert", (str) => {
            expect(str).to.equal("Error creating recommendation!");
        });
    });
});
