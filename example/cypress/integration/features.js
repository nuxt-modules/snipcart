/* eslint-disable */

describe("Snipcart", () => {
  it("snipcart element should have been injected", () => {
    cy.visit("/");
    cy.server()
    cy.route({
      method: "GET",
      url: "https://cdn.snipcart.com/**"
    }).as("apiCheck");

    cy.wait('@apiCheck')
    cy.wait(1000)

    cy.get('[data-item-custom1-name="Frame color"]').should('exist')
    cy.get('[data-item-custom5-name="Readonly information"]').should('exist')
    cy.get('[data-item-name="awesome nuxt title"]').should('exist')
    cy.get('[data-item-description="awesome nuxt description"]').should('exist')

    cy.get(".snipcart-add-item").trigger("click");

    cy.get(".snipcart-modal__container").should('exist');

    cy.get(".bg-red").should('exist');
  });
});

