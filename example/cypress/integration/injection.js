/* eslint-disable */

describe('Snipcart', () => {
  it('snipcart element should have been injected', () => {
    cy.visit('/')

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

    cy.wait(1000)

    cy.get('html').then((el) => {
      const html = el[0].innerHTML;

      chai
        .expect(html)
        .contain('<script src="https://cdn.snipcart.com/themes/v3.0/default/snipcart.js"></script>');

      chai.expect(html).contain('<div id="snipcart" class="snipcart">');
    })
  })
})
