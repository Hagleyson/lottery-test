/// <reference types="cypress"/>
describe("Register, Login, Logout, Recovery ", () => {
  beforeEach(() => {
    Cypress.env("name", "hagleyson fernandes leite");
    Cypress.env("email", "hagleyson@hagleyson.com.br");
    Cypress.env("password", "1234");

    cy.visit("registration");
    cy.get(":nth-child(1) > .sc-hKwDye").type(Cypress.env("name"));
    cy.get(":nth-child(2) > .sc-hKwDye").type(Cypress.env("email"));
    cy.get(":nth-child(3) > .sc-hKwDye").type(Cypress.env("password"));
    cy.server();
    cy.route("POST", "/user/create").as("postRegister");
    cy.get(".sc-iqseJM > .sc-iCfMLu").click();

    cy.visit("/");
    cy.get(":nth-child(1) > .sc-hKwDye").type(Cypress.env("email"));
    cy.get(":nth-child(2) > .sc-hKwDye").type(Cypress.env("password"));
    cy.server();
    cy.route("POST", "/login").as("postLogin");
    cy.get(".sc-iqseJM > .sc-iCfMLu").click();
    cy.wait("@postLogin").then((resp) => {
      expect(resp.status).be.eq(200);
    });
  });

  it("create game below minimum cart value", () => {
    cy.get(":nth-child(2) > .sc-iCfMLu").click();
    for (let index = 0; index < 3; index++) {
      cy.get(
        ":nth-child(1) > :nth-child(7) > :nth-child(1) > :nth-child(1)"
      ).click();
      cy.get(":nth-child(2) > .sc-iCfMLu").click();
    }
    cy.get(".dgXNRi > .sc-iCfMLu").click();
    cy.get(".Toastify__toast-body > :nth-child(2)").should(
      "include.text",
      "Valor minimo"
    );
  });
  it("create game above minimum cart value", () => {
    cy.get(":nth-child(2) > .sc-iCfMLu").click();
    for (let index = 0; index < 12; index++) {
      cy.get("#completeGame").click();
      cy.get("#addToCar").click();
    }
    cy.get(".dgXNRi > .sc-iCfMLu").click();
    cy.url().should("include", "/home");
  });
  it("adding 3 games of each type, removing one from the cart and saving the game", () => {
    cy.get(":nth-child(2) > .sc-iCfMLu").click();
    const addGame = (element) => {
      for (let index = 0; index < 3; index++) {
        if (index === 0) cy.get(element).click();
        cy.get("#completeGame").click();
        cy.get("#addToCar").click();
      }
    };
    addGame(".gTFAwW");
    addGame(".jilNxS");
    addGame(".emATwa");
    addGame(".cEWelm");
    cy.get(".sc-furwcr > :nth-child(1) > svg").click();
    cy.get(".swal2-confirm").click();
    cy.get(".dgXNRi > .sc-iCfMLu").click();
    cy.url().should("include", "/home");
  });
});
