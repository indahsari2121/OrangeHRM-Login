describe('Login OrangeHRM', () => {

  beforeEach(() => {
    cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login')
    cy.get('input[name="username"]', { timeout: 10000 }).should('be.visible')
  })

  it('TC-LGN-01 Login valid', () => {
    cy.get('input[name="username"]').type('Admin')
    cy.get('input[name="password"]').type('admin123')
    cy.get('button[type="submit"]').click()
    cy.url({ timeout: 10000 }).should('include', 'dashboard')
  })

  it('TC-LGN-02 Username salah', () => {
    cy.get('input[name="username"]').type('Adminn')
    cy.get('input[name="password"]').type('admin123')
    cy.get('button[type="submit"]').click()
    cy.contains('Invalid credentials').should('be.visible')
  })

  it('TC-LGN-03 Password salah', () => {
    cy.get('input[name="username"]').type('Admin')
    cy.get('input[name="password"]').type('admin1234')
    cy.get('button[type="submit"]').click()
    cy.contains('Invalid credentials').should('be.visible')
  })

  it('TC-LGN-04 Username kosong', () => {
    cy.get('button[type="submit"]').click()
    cy.get('.oxd-input-field-error-message')
      .should('contain', 'Required')
  })

  it('TC-LGN-05 Password kosong', () => {
    cy.get('input[name="username"]').type('Admin')
    cy.get('button[type="submit"]').click()
    cy.get('.oxd-input-field-error-message')
      .should('contain', 'Required')
  })

})
