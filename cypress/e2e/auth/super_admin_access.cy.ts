describe("Super admin access", () => {
  it("should super admin be able to access super admin page", () => {
    cy.login("superadmin@inskripta.com", "azerty");
    cy.visit("http://localhost:3000/admin");
    cy.contains("Organisations");
  });

  it("should organization admin not be able to access super admin page", () => {
    cy.login("test.admin@inskripta.com", "azerty");
    cy.visit("http://localhost:3000/admin", { failOnStatusCode: false });
    cy.url().should("include", "/admin");
    cy.contains("404");
    cy.contains("Page non trouvée").should("exist");
  });

  it("should user not be able to access super admin page", () => {
    cy.login("user@inskripta.com", "azerty");
    cy.visit("http://localhost:3000/admin", { failOnStatusCode: false });
    cy.url().should("include", "/admin");
    cy.contains("404");
    cy.contains("Page non trouvée").should("exist");
  });
});
