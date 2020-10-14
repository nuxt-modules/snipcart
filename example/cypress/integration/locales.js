/* eslint-disable */

describe("Snipcart", () => {
  it("snipcart element should have been injected", () => {
    cy.visit("/");
    cy.server();
    cy.route({
      method: "GET",
      url: "https://cdn.snipcart.com/**"
    }).as("apiCheck");

    cy.wait("@apiCheck");
    cy.wait(1000)

    cy.get(".snipcart-add-item").trigger("click");

    cy.get(".snipcart-modal__container").should("contain", "Total fr");

    cy.get(".snipcart-modal__close-title").trigger('click');

    cy.get(".switch-lang").trigger('click');

    cy.get(".snipcart-checkout").trigger('click');

    cy.get(".snipcart-modal__container").should("contain", "Total en");

  });
});
