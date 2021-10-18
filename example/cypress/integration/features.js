/* eslint-disable */

describe("Snipcart", () => {
  it("snipcart element should have been injected", () => {
    cy.intercept({
      method: "GET",
      url: "https://app.snipcart.com/api/sessions"
    }).as("apiCheck");

    cy.visit("/");

    cy.wait("@apiCheck");

    cy.get('[data-item-custom1-name="Frame color"]').should('exist')
    cy.get('[data-item-custom5-name="Readonly information"]').should('exist')
    cy.get('[data-item-name="awesome nuxt title"]').should('exist')
    cy.get('[data-item-description="awesome nuxt description"]').should('exist')

    cy.get(".snipcart-add-item").trigger("click");

    cy.get(".snipcart-modal__container").should('exist');

    cy.get(".bg-red").should('exist');
  });
});

