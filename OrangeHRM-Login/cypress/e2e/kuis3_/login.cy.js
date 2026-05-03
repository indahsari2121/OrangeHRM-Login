import LoginPage from './loginPage'
import { loginData } from './loginData'


describe('Login OrangeHRM - Kuis 3 Positive Cases', () => {

  const loginPage = new LoginPage()

  beforeEach(() => {
    loginPage.visit()
    loginPage.usernameField().should('be.visible')
  })

  // ──────────────────────────────────────────────────────────
  // TC-001 | Login dengan username dan password benar
  // Pre-condition : Halaman login OrangeHRM terbuka di browser
  // ──────────────────────────────────────────────────────────
  it('TC-001 | Login dengan username dan password benar', () => {
    loginPage.login(
      loginData.valid.username,
      loginData.valid.password
    )

    cy.url({ timeout: 10000 }).should('include', 'dashboard')
    cy.get('.oxd-topbar-header-breadcrumb h6').should('contain.text', 'Dashboard')
  })

  // ──────────────────────────────────────────────────────────
  // TC-002 | Toggle visibility password (show/hide)
  // Pre-condition : Halaman login OrangeHRM terbuka di browser
  // ──────────────────────────────────────────────────────────
  it('TC-007 | Password dapat ditampilkan dan disembunyikan menggunakan ikon toggle', () => {
    loginPage.passwordField().type(loginData.valid.password)

    // Verifikasi awal: password tersembunyi
    loginPage.passwordField().should('have.attr', 'type', 'password')

    // Klik ikon mata — tampilkan password
    loginPage.passwordToggleIcon().click()
    loginPage.passwordField().should('have.attr', 'type', 'text')

    // Klik ikon mata kembali — sembunyikan password
    loginPage.passwordToggleIconHide().click()
    loginPage.passwordField().should('have.attr', 'type', 'password')
  })

  // ──────────────────────────────────────────────────────────
  // TC-003 | Navigasi ke halaman Forgot Password
  // Pre-condition : Halaman login OrangeHRM terbuka di browser
  // ──────────────────────────────────────────────────────────
  it('TC-008 | Klik link Forgot your password diarahkan ke halaman Reset Password', () => {
    loginPage.forgotPasswordLink().should('be.visible').click()

    cy.url().should('include', '/auth/requestPasswordResetCode')
    cy.get('.orangehrm-forgot-password-title').should('be.visible')
    cy.get('input[name="username"]').should('be.visible')
    cy.get('button[type="submit"]').should('be.visible')
  })

  // ──────────────────────────────────────────────────────────
  // TC-004| Forgot Password dengan username terdaftar
  // Pre-condition : Berada di halaman Forgot Password
  // ──────────────────────────────────────────────────────────
  it('TC-009 | Reset password berhasil menampilkan pesan sukses saat username valid dimasukkan', () => {
    loginPage.forgotPasswordLink().click()

    cy.url().should('include', '/auth/requestPasswordResetCode')

    cy.get('input[name="username"]')
      .clear()
      .type(loginData.forgotPassword.username)

    cy.get('button[type="submit"]').click()

    cy.get('.oxd-text--p', { timeout: 10000 })
      .should('be.visible')
      .and('contain.text', 'Reset Password link sent successfully')
  })

  // ──────────────────────────────────────────────────────────
  // TC-005 | Logout setelah berhasil login
  // Pre-condition : Pengguna sudah berhasil login ke Dashboard
  // ──────────────────────────────────────────────────────────
  it('TC-012 | Pengguna berhasil logout dan diarahkan kembali ke halaman Login', () => {
    loginPage.login(
      loginData.valid.username,
      loginData.valid.password
    )

    cy.url({ timeout: 10000 }).should('include', 'dashboard')

    loginPage.userDropdownTab().click()
    cy.get('.oxd-dropdown-menu').should('be.visible')
    loginPage.logoutMenuItem().click()

    cy.url().should('include', '/auth/login')
    loginPage.usernameField().should('be.visible')
    loginPage.passwordField().should('be.visible')
  })

})
