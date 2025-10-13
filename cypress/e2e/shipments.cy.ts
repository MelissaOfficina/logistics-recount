describe('shipments load', () => {
  it('passes', () => {

    cy.visit('/shipments')

    cy.get('[data-testid="shipments-table"]').should('be.visible')

    cy.get('[data-testid^="open-shipment-"]').then(btns => {
      const ids = [...btns].map(btn => btn.getAttribute('data-testid')?.split('open-shipment-')[1])

      ids.forEach(id => {
        cy.visit(`/shipments/${id}`)
        cy.get('[data-testid="shipment-header"]').should('be.visible')
      })
    })

  })
})