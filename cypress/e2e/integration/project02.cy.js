/// <reference types="cypress"/>

describe('Project02 - Login Function', () => {

    beforeEach(() => { 
        cy.visit('https://techglobal-training.com/frontend/project-2');
  
      });
  
      it('Test Case 01 - Validate the Login Form', () => {
        
        cy.get('#username').should('be.visible')
        .and('not.have.attr', 'required')

        cy.get('label[for="username"]').should('have.text', 'Please enter your username')

        cy.get('#password').should('be.visible')
        .and('not.have.attr', 'required')
      
        cy.get('label[for="password"]').should('have.text', 'Please enter your password')

        cy.get('#login_btn').should('be.visible')
        .and('be.enabled')
        .and('have.text', 'LOGIN')

        cy.get('form a').should('be.visible') 
        .and('have.text', 'Forgot Password?')
        .and('have.attr', 'href')       
      })


      it('Test Case 02 - Validate the Valid Login', () => {

        cy.get('#username').type('TechGlobal')
        cy.get('#password').type('Test1234')
        cy.get('#login_btn').click()
        cy.get('#success_lgn').should('be.visible')

        cy.get('#logout').should('be.visible')
        .and('have.text', "LOGOUT")
      })

      it('Test Case 03 - Validate the Logout', () => {
    
      cy.get('#username').type('TechGlobal')
      cy.get('#password').type('Test1234')
      cy.get('#login_btn').click()
      cy.get('#logout').click()
      cy.get('.LoginForm_form__m12Jc').should('be.visible')

      })

      it('Test Case 04 - Validate the Forgot Password? Link and Reset Password modal', () => {

      cy.get('form a').click()
      cy.get('#modal_title').should('be.visible')
      cy.get('button.delete').should('be.visible')
      cy.get('#email').should('be.visible')
      cy.get('label[for="email"]').should('have.text', "Enter your email address and we'll send you a link to reset your password. ") 

      cy.get('#submit').should('be.visible')
      .and('be.enabled')
      .and('have.text', "SUBMIT")

      })

      it('Test Case 05 - Validate the Reset Password modal close button', () => {

        cy.get('form a').click()
        cy.get('.modal-card').should('be.visible')
        cy.get('button.delete').click()
        cy.get('.modal-card').should('not.exist')

      })

      it('Test Case 06 - Validate the Reset Password form submission', () => {
        
        const email = "e@dds.com"

        cy.get('form a').click()
        cy.get('#email').type(email)
        cy.get('#submit').click()
        cy.get('#confirmation_message').should('have.text', "A link to reset your password has been sent to your email address.")

      })  

      it('Test Case 07 - Validate the invalid login with the empty credentials', () => {

        cy.get('#username').clear()
        cy.get('#password').clear()
        cy.get('#login_btn').click()
        cy.get('#error_message').should('have.text',"Invalid Username entered!")

      })

      it('Test Case 08 - Validate the invalid login with the wrong username', () => {

        const userName = "John";
        const password = "Test1234"

        cy.get('#username').type(userName)
        cy.get('#password').type(password)
        cy.get('#login_btn').click()
        cy.get('#error_message').should('have.text',"Invalid Username entered!")

      })

      it('Test Case 09 - Validate the invalid login with the wrong password', () => {

        const userName = "TechGlobal";
        const password = "1234"

        cy.get('#username').type(userName)
        cy.get('#password').type(password)
        cy.get('#login_btn').click()
        cy.get('#error_message').should('have.text',"Invalid Password entered!")

      })

      it('Test Case 10 - Validate the invalid login with the wrong username and password', () => {

        const userName = "John";
        const password = "1234"

        cy.get('#username').type(userName)
        cy.get('#password').type(password)
        cy.get('#login_btn').click()
        cy.get('#error_message').should('have.text',"Invalid Username entered!")

      })

})
