/// <reference types="cypress"/>

describe('Project02 - Login Function', () => {

  beforeEach(() => { 
    cy.visit('https://techglobal-training.com/frontend/project-2');
  
  });
  
    it('Test Case 01 - Validate the Login Form', () => {

    cy.get('div > input').each(($el) => {
    cy.wrap($el).should('be.visible')
      cy.wrap($el).should('not.have.attr', 'required')
    });
       
    const expectedLabel = ['Please enter your username', 'Please enter your password'];

    cy.get('div > label').each(($txt, index) => {
      cy.wrap($txt).should('have.text', expectedLabel[index]);
     //expect($txt.text()).to.equal(expectedLabel[index]); 
    });

    cy.get('#login_btn').should('be.visible').and('be.enabled').and('have.text', "LOGIN");

    cy.get('#login_btn').next().should('be.visible').and('have.text', 'Forgot Password?').and('have.attr', 'href');          
  });

    it('Test Case 02 - Validate the Valid Login', () => {

    const credentials = ['TechGlobal', 'Test1234']

    cy.get('div > input').each(($el, index) => {
        cy.wrap($el).type(credentials[index])
    });
        
    cy.get('#login_btn').click();

    cy.get('#success_lgn').should('have.text', "You are logged in");

    cy.get('#logout').should('be.visible').and('have.text', "LOGOUT");
  });

    it('Test Case 03 - Validate the Logout', () => {
    
    const credentials = ['TechGlobal', 'Test1234']

    cy.get('div > input').each(($el, index) => {
      cy.wrap($el).type(credentials[index])
    });
        
    cy.get('#login_btn').click();

    cy.get('#logout').click();

    cy.get('.LoginForm_form__m12Jc').should('be.visible'); // cy.get('form')
  });

  it('Test Case 04 - Validate the Forgot Password? Link and Reset Password modal', () => {

    cy.get('#login_btn').next().click();

    cy.get('#modal_title').should('have.text', "Reset Password");

    cy.get('button.delete').should('be.visible'); // cy.get('[aria-label="close"]')

    cy.get('#email').should('be.visible');

    cy.get('[for="email"]').should('have.text', "Enter your email address and we'll send you a link to reset your password. ");
    
    /*cy.get('[for="email"]').then($txt) => {
        expect($txt.text().trim()).to.equal("Enter your email address and we'll send you a link to reset your password.");
    }
    */

    cy.get('#submit').should('be.visible').and('be.enabled').and('have.text', "SUBMIT");
  });

  it('Test Case 05 - Validate the Reset Password modal close button', () => {

    cy.get('#login_btn').next().click();
    
    cy.get('.modal-card').should('be.visible'); // cy.get('.modal');

    cy.get('[aria-label="close"]').click();

    cy.get('.modal-card').should('not.exist'); //cy.get('.modal');
  });

  it('Test Case 06 - Validate the Reset Password form submission', () => {
        
    const email = "e@dds.com"

    cy.get('#login_btn').next().click();

    cy.get('#email').type(email);

    cy.get('#submit').click();

    cy.get('#confirmation_message').should('have.text', "A link to reset your password has been sent to your email address.");
  });

    const testCases = [
      {
        username : " ",
        password : " ",
        expectedMessage : "Invalid Username entered!"
      },
      {
        username : "John",
        password : "Test1234",
        expectedMessage : "Invalid Username entered!"
      },
      {
        username : "TechGlobal",
        password : "1234",
        expectedMessage : "Invalid Password entered!"
      },
      {
        username : "John",
        password : "1234",
        expectedMessage : "Invalid Username entered!"
      },
    ]

    testCases.forEach(({username, password, expectedMessage}, index) => {

      it(`Test Case 0${index + 7} - Validate login for username: ${username} and password: ${password}`, () => {
      
        cy.get('#username').type(username)

        cy.get('#password').type(password);

        cy.get('#login_btn').click();

        cy.get('#error_message').should('have.text', expectedMessage)
      })

    });
  });
