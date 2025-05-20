declare namespace Cypress {
  interface Chainable<Subject = any> {
    login(
      email: string,
      password: string,
      host: string = "localhost",
    ): Chainable<void>;
  }
}
