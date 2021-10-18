/* eslint-disable */

describe('Snipcart', () => {
  it('snipcart element should have been injected', () => {
    cy.intercept({
      method: "GET",
      url: "https://app.snipcart.com/api/sessions"
    }).as("apiCheck");

    cy.intercept({
      method: "GET",
      url: "https://cdn.snipcart.com/themes/*/default/snipcart.js"
    }).as("jsCheck");

    cy.intercept({
      method: "GET",
      url: "https://cdn.snipcart.com/themes/*/default/snipcart.css"
    }).as("cssCheck");

    cy.visit('/')

    cy.wait("@apiCheck");
    cy.wait("@jsCheck");
    cy.wait("@cssCheck");


    cy.get('html').then((el) => {
      const html = el[0].innerHTML

      chai
        .expect(html)
        .contain(
          '<link data-n-head="ssr" rel="preconnect" href="https://app.snipcart.com">'
      );

      chai
        .expect(html)
        .contain(
          '<link data-n-head="ssr" rel="preconnect" href="https://cdn.snipcart.com">'
      );

      chai
        .expect(html)
        .contain(
          '<link data-n-head="ssr" rel="stylesheet" href="https://cdn.snipcart.com/themes/v3.0/default/snipcart.css">'
      );
    })

    cy.get('html').then((el) => {
      const html = el[0].innerHTML;

      chai
        .expect(html)
        .contain('<script src="https://cdn.snipcart.com/themes/v3.0/default/snipcart.js"></script>');

      chai.expect(html).contain('<div id="snipcart" class="snipcart">');
    })
  })
})
