const login = (email: string, password: string) => {
  cy.get('input[name="email"]').type(email);
  cy.get('input[name="password"]').type(password);

  cy.get('button[type="submit"]').click();

  cy.url().should("contain", "/payments");
};
Cypress.Commands.add("login", login);

const logout = () => {
  cy.get('button[name="logout"]').click();
};
Cypress.Commands.add("logout", logout);
