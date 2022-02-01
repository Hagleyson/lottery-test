/// <reference types="cypress"/>

describe("Login e Logout no sistema", () => {
  it.skip("register", () => {
    cy.visit("http://localhost:3000/registration");
    cy.get(":nth-child(1) > .sc-hKwDye").type("hagleyson Fernandes");
    cy.get(":nth-child(2) > .sc-hKwDye").type("hagleyson@hag.com.br");
    cy.get(":nth-child(3) > .sc-hKwDye").type("1234");
    cy.server();
    cy.route("POST", "http://127.0.0.1:3333/user/create").as("postRegister");
    cy.get(".sc-iqseJM > .sc-iCfMLu").click();
    cy.wait("@postRegister").then((resp) => {
      expect(resp.status).be.eq(200);
    });
  });

  it.skip("login ", () => {
    cy.visit("http://localhost:3000/");
    cy.get(":nth-child(1) > .sc-hKwDye").type("hagleyson@hag.com.br");
    cy.get(":nth-child(2) > .sc-hKwDye").type("1234");

    cy.server();
    cy.route("POST", "http://127.0.0.1:3333/login").as("postLogin");
    cy.get(".sc-iqseJM > .sc-iCfMLu").click();
    cy.wait("@postLogin").then((resp) => {
      expect(resp.status).be.eq(200);
    });
  });

  it.skip("logout", () => {
    cy.get(":nth-child(2) > .sc-gKclnd").click();
    cy.get(".swal2-confirm").click();
  });

  it("recoveryPassword", () => {
    cy.visit("http://localhost:3000/resetPassword");
    cy.get(".sc-hKwDye").type("hagleyson@hag.com.br");
    cy.server();
    cy.route("POST", "http://127.0.0.1:3333/reset").as("postReset");
    cy.get(".sc-iqseJM > .sc-iCfMLu").click();
    cy.wait("@postReset").then((resp) => {
      expect(resp.status).be.eq(200);
    });
  });
});
