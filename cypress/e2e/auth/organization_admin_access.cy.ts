describe("Organization Admin Access", () => {
  it("should super admin not be able to access organization admin page", () => {
    cy.login("superadmin@inskripta.com", "azerty", "test.localhost");
    cy.visit("http://test.localhost:3000/admin", {
      failOnStatusCode: false,
    });
    cy.url().should("include", "/admin");
    cy.contains("404");
    cy.contains("Page non trouvée").should("exist");
  });

  it("should organization admin should be able to access organization admin page", () => {
    cy.login("test.admin@inskripta.com", "azerty", "test.localhost");
    cy.visit("http://test.localhost:3000/admin");
    cy.url().should("include", "/admin");
    cy.contains("Elèves");
  });

  it("should user not be able to access organization admin page", () => {
    cy.login("user@inskripta.com", "azerty", "test.localhost");
    cy.visit("http://test.localhost:3000/admin", { failOnStatusCode: false });
    cy.url().should("include", "/admin");
    cy.contains("404");
    cy.contains("Page non trouvée").should("exist");
  });

  it("should organization admin on another organization should not be able to access other organization page", () => {
    cy.login("test2.admin@inskripta.com", "azerty", "test.localhost");
    cy.visit("http://test.localhost:3000/admin", { failOnStatusCode: false });
    cy.url().should("include", "/admin");
    cy.contains("404");
    cy.contains("Page non trouvée").should("exist");
  });
});
