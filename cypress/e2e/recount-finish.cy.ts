describe('recount scan', () => {
  it('passes', () => {

      cy.visit('/shipments')

      cy.get('[data-testid="shipments-table"]').should('be.visible')

      cy.fixture('shipments').then((shipments) => {
          shipments.forEach((shipment) => {
              if(shipment.status === 'new') {
                  cy.visit(`/shipments/${shipment.id}`);
                  cy.get('[data-testid="shipment-header"]').should("be.visible");
                  cy.get('[data-testid="start-recount-btn"]')
                      .should("be.visible")
                      .click();
                  cy.get('[data-testid="bin-good"]').should("be.visible");
                  cy.get('[data-testid="bin-reject"]').should("be.visible");
                  cy.get('[data-testid="bin-unknown"]').should("be.visible");

                  cy.get('[data-testid="bin-good"] .choose').click();
                  cy.get('[data-testid="bin-good"]').should(
                      "have.class",
                      "active",
                  );

                  cy.get('[name="sku"]').type("1");
                  cy.get('[name="qty"]').type("{backspace}1");
                  cy.get(".scan").should("not.be.disabled");
                  cy.get(".scan").click();

                  cy.get('[name="sku"]').type("5");
                  cy.get('[name="qty"]').type("{backspace}1");
                  cy.get(".scan").should("not.be.disabled");
                  cy.get(".scan").click();

                  cy.get('[name="sku"]').type("13");
                  cy.get('[name="qty"]').type("{backspace}1");
                  cy.get(".scan").should("not.be.disabled");
                  cy.get(".scan").click();

                  cy.get(".open-modal").click();
                  cy.get('[data-testid="confirm-placement-btn"]').should(
                      "be.visible",
                  );
                  cy.get('[data-testid="confirm-placement-btn"]').click();
                  cy.get('[data-testid="placement-finished-toast"]').should(
                      "be.visible",
                      "active",
                  );
              }
          })
      })
  })
})