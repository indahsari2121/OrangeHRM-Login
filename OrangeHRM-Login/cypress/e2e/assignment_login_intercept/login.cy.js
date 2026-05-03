describe('Login OrangeHRM - Intercept Version', () => {

  beforeEach(() => {
    cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login')
    cy.get('input[name="username"]', { timeout: 10000 }).should('be.visible')
  })

  // ===============================
  // TC-LGN-01 Login Valid
  // ===============================
  it('TC-LGN-01 Login valid', () => {

    cy.intercept('POST', '**/auth/validate').as('validLogin')

    cy.get('input[name="username"]').type('Admin')
    cy.get('input[name="password"]').type('admin123')
    cy.get('button[type="submit"]').click()

    cy.wait('@validLogin')
      .its('response.statusCode')
      .should('eq', 302)

    cy.url().should('include', 'dashboard')
  })


  // ===============================
  // TC-LGN-02 Username Salah
  // ===============================
  it('TC-LGN-02 Username salah', () => {

    cy.intercept('POST', '**/auth/validate').as('invalidUsername')

    cy.get('input[name="username"]').type('Adminn')
    cy.get('input[name="password"]').type('admin123')
    cy.get('button[type="submit"]').click()

    cy.wait('@invalidUsername')
      .its('response.statusCode')
      .should('eq', 302)

    cy.contains('Invalid credentials').should('be.visible')
  })


  // ===============================
  // TC-LGN-03 Password Salah
  // ===============================
  it('TC-LGN-03 Password salah', () => {

    cy.intercept('POST', '**/auth/validate').as('invalidPassword')

    cy.get('input[name="username"]').type('Admin')
    cy.get('input[name="password"]').type('admin1234')
    cy.get('button[type="submit"]').click()

    cy.wait('@invalidPassword')
      .its('response.statusCode')
      .should('eq', 302)

    cy.contains('Invalid credentials').should('be.visible')
  })


  // ===============================
  // TC-LGN-04 Username Kosong
  // ===============================
  it('TC-LGN-04 Username kosong', () => {

    cy.intercept('POST', '**/auth/validate').as('emptyUsername')

    cy.get('button[type="submit"]').click()

    cy.wait(2000)

    // Pastikan tidak ada request yang terkirim
    cy.get('@emptyUsername.all').should('have.length', 0)

    cy.get('.oxd-input-field-error-message')
      .should('contain', 'Required')
  })


  // ===============================
  // TC-LGN-05 Password Kosong
  // ===============================
  it('TC-LGN-05 Password kosong', () => {

    cy.intercept('POST', '**/auth/validate').as('emptyPassword')

    cy.get('input[name="username"]').type('Admin')
    cy.get('button[type="submit"]').click()

    cy.wait(2000)

    // Pastikan tidak ada request yang terkirim
    cy.get('@emptyPassword.all').should('have.length', 0)

    cy.get('.oxd-input-field-error-message')
      .should('contain', 'Required')
  })

})
