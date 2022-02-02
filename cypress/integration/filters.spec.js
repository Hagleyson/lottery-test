describe("Filters ", () => {
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

  it("lotofacil filter should work", () => {
    cy.server();
    cy.route("GET", " http://127.0.0.1:3333/bet/all-bets?type[]=Lotofácil").as(
      "getBets"
    );
    cy.get(".cEWelm").click();
    cy.wait("@getBets").then((resp) => {
      expect(resp.status).be.eq(200);
    });
  });

  it("mega-sena filter should work", () => {
    cy.server();
    cy.route("GET", " http://127.0.0.1:3333/bet/all-bets?type[]=Mega-Sena").as(
      "getBets"
    );
    cy.get(".gTFAwW").click();
    cy.wait("@getBets").then((resp) => {
      expect(resp.status).be.eq(200);
    });
  });

  it("quina filter should work", () => {
    cy.server();
    cy.route("GET", " http://127.0.0.1:3333/bet/all-bets?type[]=Quina").as(
      "getBets"
    );
    cy.get(".jilNxS").click();
    cy.wait("@getBets").then((resp) => {
      expect(resp.status).be.eq(200);
    });
  });

  it("timemania filter should work", () => {
    cy.server();
    cy.route("GET", " http://127.0.0.1:3333/bet/all-bets?type[]=Timemania").as(
      "getBets"
    );
    cy.get(".emATwa").click();
    cy.wait("@getBets").then((resp) => {
      expect(resp.status).be.eq(200);
    });
  });

  it("all filter should work", () => {
    cy.server();
    cy.route("GET", "http://127.0.0.1:3333/bet/all-bets?type[]=Lotofácil").as(
      "lotofacil"
    );
    cy.get(".cEWelm").click();
    cy.wait("@lotofacil").then((resp) => {
      expect(resp.status).be.eq(200);
    });
    cy.route(
      "GET",
      "http://127.0.0.1:3333/bet/all-bets?type[]=Lotofácil&type[]=Mega-Sena"
    ).as("lotofacilMega");
    cy.get(".gTFAwW").click();
    cy.wait("@lotofacilMega").then((resp) => {
      expect(resp.status).be.eq(200);
    });
    cy.route(
      "GET",
      "http://127.0.0.1:3333/bet/all-bets?type[]=Lotofácil&type[]=Mega-Sena&type[]=Quina"
    ).as("lotofacilMegaQuina");
    cy.get(".jilNxS").click();
    cy.wait("@lotofacilMegaQuina").then((resp) => {
      expect(resp.status).be.eq(200);
    });
    cy.route(
      "GET",
      "http://127.0.0.1:3333/bet/all-bets?type[]=Lotofácil&type[]=Mega-Sena&type[]=Quina&type[]=Timemania"
    ).as("lotofacilMegaQuinaTimemania");
    cy.get(".emATwa").click();
    cy.wait("@lotofacilMegaQuinaTimemania").then((resp) => {
      expect(resp.status).be.eq(200);
    });
  });
});
