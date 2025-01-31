export const TEST_USER = {
  id: "12345243",
  email: "test@test.com",
  password: "test",
};

describe("Login", () => {
  beforeEach(() => {
    cy.visit("/login");
  });

  it("should render the login with email and password fields", () => {
    cy.get("form").should("exist");
    cy.get('input[name="email"]').should("exist").and("be.visible");
    cy.get('input[name="password"]').should("exist").and("be.visible");
    cy.get('button[type="submit"]').should("exist").and("have.text", "Login");
  });

  it("should show errors for invalid fields", () => {
    cy.get('button[type="submit"]').click();
    cy.get("p.text-red-500").should("exist").and("have.length", 2);
    cy.get("p.text-red-500")
      .first()
      .should("have.text", "Invalid email address");
    cy.get("p.text-red-500")
      .last()
      .should("have.text", "Password must be at least 8 characters");
  });

  it("should allow the user submit the form", () => {
    cy.get('input[name="email"]').type(TEST_USER.email);
    cy.get('input[name="password"]').type(TEST_USER.password);
    cy.get('button[type="submit"]').should("not.be.disabled");
    cy.get('button[type="submit"]').click();

    cy.wait(1000);
    cy.url().should("include", "/payments");
  });
});
