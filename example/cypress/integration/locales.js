/* eslint-disable */

describe("Snipcart", () => {
  it("snipcart element should have been injected", () => {
    cy.intercept({
      method: "GET",
      url: "https://app.snipcart.com/api/sessions"
    }).as("apiCheck");

    cy.visit("/");

    cy.wait("@apiCheck");

    cy.get(".snipcart-add-item").trigger("click");

    cy.get(".snipcart-modal__container").should("contain", "We're Total fr");

    cy.get(".snipcart-modal__close-title").trigger('click');

    cy.get(".switch-lang").trigger('click');

    cy.get(".snipcart-checkout").trigger('click');

    cy.get(".snipcart-modal__container").should("contain", "We're Total en");

  });
});
