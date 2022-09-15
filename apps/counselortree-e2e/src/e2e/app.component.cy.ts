describe('counselortree', () => {
  beforeEach(() => cy.visit('/iframe.html?id=appcomponent--primary'));
  it('should render the component', () => {
    cy.get('swogeti-root').should('exist');
  });
});
