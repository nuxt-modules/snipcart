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
    cy.get(".snipcart-add-item").trigger("click");

    cy.get(".snipcart-modal__container").should('exist');
  });
});

