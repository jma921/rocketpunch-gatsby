describe('Footer Tests', function() {
  it('Checks footer copyright date', function() {
    const year = new Date().getFullYear();
    cy.visit('http://localhost:8000/');
    cy.get('.level-item > p').should('contain', year);
  });

  it('Facebook link should go to Facebook page', function() {
    cy.visit('http://localhost:8000/');
    cy
      .get('.facebook-link')
      .should('have.attr', 'href')
      .and('include', 'https://www.facebook.com/rocketpunchlabs/');
  });
  it('Twitter link should go to Twitter page', function() {
    cy.visit('http://localhost:8000/');
    cy
      .get('.twitter-link')
      .should('have.attr', 'href')
      .and('include', 'https://twitter.com/rocketpunchlabs');
  });
  it('Instagram link should go to Instagram page', function() {
    cy.visit('http://localhost:8000/');
    cy
      .get('.instagram-link')
      .should('have.attr', 'href')
      .and('include', 'https://www.instagram.com/rocketpunchlabs/?hl=en');
  });
  it('Email link should send email', function() {
    cy.visit('http://localhost:8000/');
    cy
      .get('.email-link')
      .should('have.attr', 'href')
      .and(
        'include',
        'mailto:rocketpunchlabs@gmail.com?Subject=Hello%20from%20website'
      );
  });
});
