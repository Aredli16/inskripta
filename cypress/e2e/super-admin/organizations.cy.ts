// noinspection ES6PreferShortImport
import { slugify } from "../../../utils/slugify";

describe("Organization Management", () => {
  beforeEach(() => {
    cy.login("superadmin@inskripta.com", "azerty");
    cy.visit("http://localhost:3000/admin");
  });

  it("should display list of organizations", () => {
    cy.get("table").should("exist");
    cy.get("table thead tr").within(() => {
      cy.get("th").should("have.length", 3);
      cy.get("th").eq(0).should("contain", "ID");
      cy.get("th").eq(1).should("contain", "Nom");
      cy.get("th").eq(2).should("contain", "Actions");
    });
    cy.get("table tbody tr").should("have.length.greaterThan", 1);
  });

  it("should add a new organization", () => {
    const organizationName = `Test Organization ${Date.now()}`;
    const organizationNameFormatted = slugify(organizationName);

    cy.origin(`http://${organizationNameFormatted}.localhost:3000`, () => {
      cy.visit("/auth/login");
      cy.get("input[name=email]").type("user@inskripta.com");
      cy.get("input[name=password]").type("azerty");
      cy.get("button[type=submit]").click();
      cy.url().should("not.include", "/auth/login");

      cy.contains("Page non trouvée").should("exist");
    });

    cy.visit("http://localhost:3000/admin");
    cy.get("a").contains("Ajouter une organisation").click();
    cy.url().should("include", "/admin/add");
    cy.get("input[name='name']").type(organizationName);
    cy.get("button[type='submit']").contains("Sauvegarder").click();
    cy.url().should("match", /\/admin\/[0-9a-fA-F-]{36}$/);
    cy.get("input[name='name']").should(
      "have.value",
      organizationNameFormatted,
    );
    cy.get("a[href='/admin']").contains("Annuler").click();
    cy.url().should("include", "/admin");
    cy.get("table tbody tr").should("contain", organizationNameFormatted);
    cy.origin(`http://${organizationNameFormatted}.localhost:3000`, () => {
      cy.visit("/");
      cy.get("button").contains("Créer une inscription").should("exist");
    });
  });

  it("should create then update an organization", () => {
    const originalName = `Test Organization ${Date.now()}`;
    const slugOriginal = slugify(originalName);

    const updatedName = originalName + " Updated";
    const slugUpdated = slugify(updatedName);

    cy.visit("http://localhost:3000/admin");
    cy.get("a").contains("Ajouter une organisation").click();
    cy.url().should("include", "/admin/add");
    cy.get("input[name='name']").type(originalName);
    cy.get("button[type='submit']").contains("Sauvegarder").click();
    cy.url().should("match", /\/admin\/[0-9a-fA-F-]{36}$/);
    cy.get("input[name='name']").should("have.value", slugOriginal);
    cy.get("a[href='/admin']").contains("Annuler").click();
    cy.url().should("include", "/admin");
    cy.get("table tbody tr").should("contain", slugOriginal);
    cy.get("table tbody tr")
      .contains(slugOriginal)
      .parent("tr")
      .within(() => {
        cy.contains("Voir").click();
      });
    cy.url().should("match", /\/admin\/[0-9a-fA-F-]{36}$/);
    cy.get("input[name='name']").clear().type(updatedName);
    cy.get("button[type='submit']").contains("Sauvegarder").click();
    cy.url().should("match", /\/admin\/[0-9a-fA-F-]{36}$/);
    cy.get("a[href='/admin']").contains("Annuler").click();
    cy.get("table tbody tr").should("contain", slugUpdated);
  });

  it("should create then delete an organization", () => {
    const organizationName = `Test Organization ${Date.now()}`;
    const organizationSlug = slugify(organizationName);

    cy.visit("http://localhost:3000/admin");
    cy.get("a").contains("Ajouter une organisation").click();
    cy.url().should("include", "/admin/add");
    cy.get("input[name='name']").type(organizationName);
    cy.get("button[type='submit']").contains("Sauvegarder").click();
    cy.url().should("match", /\/admin\/[0-9a-fA-F-]{36}$/);
    cy.get("input[name='name']").should("have.value", organizationSlug);
    cy.get("a[href='/admin']").contains("Annuler").click();
    cy.url().should("include", "/admin");
    cy.get("table tbody tr").should("contain", organizationSlug);
    cy.get("table tbody tr")
      .contains(organizationSlug)
      .parent("tr")
      .within(() => {
        cy.contains("Voir").click();
      });
    cy.url().should("match", /\/admin\/[0-9a-fA-F-]{36}$/);
    cy.get("button").contains("Supprimer l'organisation").click();
    cy.get("div[role='dialog']").should("exist");
    cy.get("div[role='dialog'] button").contains("Supprimer").click();
    cy.url().should("include", "/admin");
    cy.get("table tbody tr").should("not.contain", organizationSlug);
  });
});
