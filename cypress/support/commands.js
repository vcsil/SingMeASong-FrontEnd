/* eslint-disable no-undef */
// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

import { createRecommendationMusic } from "../factories/generateMusicRecommendation";

Cypress.Commands.add("resetDatabase", () => {
    cy.request("DELETE", `http://localhost:5000/recommendations/e2eReset`, {});
});

Cypress.Commands.add("createRecommendation", () => {
    const newRecommendation = createRecommendationMusic();
    cy.request("POST", `http://localhost:5000/recommendations`, {
        name: newRecommendation.name,
        youtubeLink: newRecommendation.youtubeLink,
    });
});
