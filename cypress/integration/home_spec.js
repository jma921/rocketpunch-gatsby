describe('My First Test', function() {
  it('.should() - assert that <title> is correct', function() {
    cy.visit('http://localhost:8000/');
    cy
      .title()
      .should('include', 'Rocketpunch Labs | Graphic Design | Web Design');
  });
  it('First work link should go to work link', function() {
    cy.visit('http://localhost:8000/');
    cy.get('#work > :nth-child(1) > a').then(link => {
      const path = link[0].pathname;
      link.click();
      cy.url().should('include', path);
    });
  });
});
