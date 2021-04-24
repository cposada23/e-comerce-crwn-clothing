/// <reference types="cypress" />

describe('My First Test', () => {
  it('Does not do much!', () => {
    expect(true).to.equal(true)
  })
  it('open the home page', () => {
    cy.visit('http://localhost:3000/')
  })
})