class LoginPage {

  // ── Selectors ──────────────────────────────────────────

  usernameField() {
    return cy.get('input[name="username"]')
  }

  passwordField() {
    return cy.get('input[name="password"]')
  }

  loginButton() {
    return cy.get('button[type="submit"]')
  }

  forgotPasswordLink() {
    return cy.get('.orangehrm-login-forgot p')
  }

  passwordToggleIcon() {
    return cy.get('.oxd-icon.bi-eye')
  }

  passwordToggleIconHide() {
    return cy.get('.oxd-icon.bi-eye-slash')
  }

  userDropdownTab() {
    return cy.get('.oxd-userdropdown-tab')
  }

  logoutMenuItem() {
    return cy.contains('.oxd-userdropdown-link', 'Logout')
  }

  // ── Actions ────────────────────────────────────────────

  visit() {
    cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login')
  }

  login(username, password) {
    if (username) {
      this.usernameField().clear().type(username)
    }
    if (password) {
      this.passwordField().clear().type(password)
    }
    this.loginButton().click()
  }

}

export default LoginPage
