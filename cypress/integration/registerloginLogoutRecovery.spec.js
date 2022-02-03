/// <reference types="cypress"/>

describe("Register, Login, Logout, Recovery ", () => {
  beforeEach(() => {
    Cypress.env("name", "hagleyson fernandes");
    Cypress.env("email", "hagleyson@hagleyson.com.com.br");
    Cypress.env("password", "1234");
  });
  it.skip("must register in the system", () => {
    cy.visit("registration");
    cy.get(":nth-child(1) > .sc-hKwDye").type(Cypress.env("name"));
    cy.get(":nth-child(2) > .sc-hKwDye").type(Cypress.env("email"));
    cy.get(":nth-child(3) > .sc-hKwDye").type(Cypress.env("password"));
    cy.server();
    cy.route("POST", "/user/create").as("postRegister");
    cy.get(".sc-iqseJM > .sc-iCfMLu").click();
    cy.wait("@postRegister").then((resp) => {
      expect(resp.status).be.eq(200);
    });
  });
  it.skip("when you have e-mail registered in the system", () => {
    cy.visit("registration");
    cy.get(":nth-child(1) > .sc-hKwDye").type(Cypress.env("name"));
    cy.get(":nth-child(2) > .sc-hKwDye").type(Cypress.env("email"));
    cy.get(":nth-child(3) > .sc-hKwDye").type(Cypress.env("password"));
    cy.server();
    cy.route("POST", "/user/create").as("postRegister");
    cy.get(".sc-iqseJM > .sc-iCfMLu").click();
    cy.wait("@postRegister").then((resp) => {
      expect(resp.status).be.eq(400);
    });
  });
  it("using invalid values ​​for login", () => {
    cy.visit("/");
    cy.get(".sc-iqseJM > .sc-iCfMLu").click();
    cy.get(":nth-child(1) > span").should(
      "include.text",
      "Email é Obrigatório!"
    );
    cy.get(":nth-child(2) > span").should("include.text", "senha!");
  });
  it.skip("must enter the system", () => {
    cy.visit("/");
    cy.get(":nth-child(1) > .sc-hKwDye").type(Cypress.env("email"));
    cy.get(":nth-child(2) > .sc-hKwDye").type(Cypress.env("password"));

    cy.server();
    cy.route("POST", "/login").as("postLogin");
    cy.get(".sc-iqseJM > .sc-iCfMLu").click();
    cy.wait("@postLogin").then((resp) => {
      expect(resp.status).be.eq(200);
    });
    cy.url().should("include", "/home");
  });

  it.skip("must exit the system", () => {
    cy.get(":nth-child(2) > .sc-gKclnd").click();
    cy.get(".swal2-confirm").click();
    cy.url().should("include", "/login");
  });

  it.skip("must reset password", () => {
    cy.visit("/resetPassword");
    cy.get(".sc-hKwDye").type(Cypress.env("email"));
    cy.server();
    cy.route("POST", "http://127.0.0.1:3333/reset").as("postReset");
    cy.get(".sc-iqseJM > .sc-iCfMLu").click();
    cy.wait("@postReset").then((resp) => {
      expect(resp.status).be.eq(200);
    });
  });
});
