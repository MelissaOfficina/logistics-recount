describe('recount process', () => {
  it('passes', () => {

    cy.fixture('shipments').then((shipments) => {
      shipments.forEach((shipment) => {
        if(shipment.status === 'new') {
          cy.visit(`/shipments/${shipment.id}`)
          cy.get('[data-testid="start-recount-btn"]').should('be.visible')
            cy.get('[data-testid="start-recount-btn"]').click()
          cy.get('[data-testid="bin-good"]').should('be.visible')
          cy.get('[data-testid="bin-reject"]').should('be.visible')
          cy.get('[data-testid="bin-unknown"]').should('be.visible')
        }
      })
    })
  })
})