it("should register a user, prevent other users from seeing it, but allow admin to see it", () => {
  const date = Date.now();
  const newUser = {
    lastName: `Doe.${date}`,
    firstName: `John.${date}`,
  };

  cy.login("user@inskripta.com", "azerty", "test.localhost");
  cy.visit("http://test.localhost:3000");
  cy.get("button").contains("Créer une inscription").click();
  cy.get("a").contains("Créer une inscription pour un nouvel étudiant").click();
  cy.get("input[name='last-name']").type(newUser.lastName);
  cy.get("input[name='first-name']").type(newUser.firstName);
  cy.get("button[type='submit']").contains("Suivant").click();
  cy.get("ul[role='list'] h5").contains(
    `${newUser.lastName} ${newUser.firstName}`,
  );

  cy.clearAllCookies();
  cy.login("test2.admin@inskripta.com", "azerty", "test.localhost");
  cy.visit("http://test.localhost:3000");
  cy.contains(`${newUser.lastName} ${newUser.firstName}`).should("not.exist");

  cy.clearAllCookies();
  cy.login("test.admin@inskripta.com", "azerty", "test.localhost");
  cy.visit("http://test.localhost:3000/admin");
  cy.get("table tbody tr").should("contain.text", newUser.lastName);
  cy.get("table tbody tr").should("contain.text", newUser.firstName);

  cy.visit("http://test.localhost:3000/admin/registrations");
  cy.get("table tbody tr").should("contain.text", newUser.firstName);
  cy.get("table tbody tr").should("contain.text", newUser.lastName);
});
