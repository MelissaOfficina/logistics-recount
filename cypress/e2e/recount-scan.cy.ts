describe('recount scan', () => {
  it('passes', () => {

    cy.visit(`/recount/1`)

    cy.get('[data-testid="bin-good"] .choose').click()
    cy.get('[data-testid="bin-good"]').should('have.class', 'active')

    cy.get('[name="sku"]').type('1234567')
    cy.get('[name="qty"]').type('{backspace}2')
    cy.get('.scan').should('not.be.disabled')
    cy.get('.scan').click()

    cy.get('[data-testid="bin-good-total"]').should('have.text', '2')
  })
})