describe("Payment list Component", () => {
  it("should render payment table", () => {
    cy.visit("/payments");
    cy.get("table").should("exist");

    cy.get("thead").should("exist");
    cy.get("th").should("have.length.greaterThan", 0);

    cy.get("tbody tr").should("have.length.greaterThan", 0);
  });

  it("should render empty payments screen", () => {
    cy.intercept("GET", "/api/payments", { body: [] }).as("getPayments");

    cy.visit("/payments");

    cy.get("tbody tr td").contains("No payments.").should("be.visible");
  });
});
