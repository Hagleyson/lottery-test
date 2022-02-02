describe("Account ", () => {
  beforeEach(() => {
    Cypress.env("name", "hagleyson fernandes leite");
    Cypress.env("email", "hagleyson@hagleyson.com.br");
    Cypress.env("password", "1234");

    cy.visit("registration");
    cy.get(":nth-child(1) > .sc-hKwDye").type(Cypress.env("name"));
    cy.get(":nth-child(2) > .sc-hKwDye").type(Cypress.env("email"));
    cy.get(":nth-child(3) > .sc-hKwDye").type(Cypress.env("password"));
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
  it("account should work", () => {
    cy.get(".navData").click();
    cy.get(":nth-child(1) > .sc-hKwDye").type(" leite");
    cy.get(":nth-child(2) > .sc-hKwDye").type(".hf");
    cy.server();
    cy.route("PUT", "http://127.0.0.1:3333/user/update").as("postUpdate");
    cy.get(".sc-iCfMLu").click();
    cy.wait("@postUpdate").then((resp) => {
      expect(resp.status).be.eq(200);
    });
    cy.url().should("include", "/home");
  });
});
