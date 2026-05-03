describe('TUGAS API Automation - 10 Requests FakeStore', () => {

  const baseUrl = 'https://fakestoreapi.com'

  // 1 GET All Products
  it('GET All Products', () => {
    cy.request(`${baseUrl}/products`)
      .then(res => {
        expect(res.status).to.eq(200)
        expect(res.body.length).to.be.greaterThan(0)
      })
  })

  // 2 GET Single Product
  it('GET Single Product', () => {
    cy.request(`${baseUrl}/products/1`)
      .then(res => {
        expect(res.status).to.eq(200)
        expect(res.body.id).to.eq(1)
      })
  })

  // 3 GET All Categories
  it('GET Categories', () => {
    cy.request(`${baseUrl}/products/categories`)
      .then(res => {
        expect(res.status).to.eq(200)
        expect(res.body.length).to.be.greaterThan(0)
      })
  })

  // 4 GET Products by Category
  it('GET Products by Category', () => {
    cy.request(`${baseUrl}/products/category/electronics`)
      .then(res => {
        expect(res.status).to.eq(200)
        expect(res.body.length).to.be.greaterThan(0)
      })
  })

  // 5 POST Create Product
it('POST Create Product', () => {
  cy.request('POST', `${baseUrl}/products`, {
    title: 'QA Product',
    price: 100,
    description: 'Automation Test Product',
    image: 'https://i.pravatar.cc',
    category: 'electronics'
  }).then(res => {
    expect(res.status).to.eq(201)   // <-- FIX DI SINI
    expect(res.body.title).to.eq('QA Product')
  })
})

  // 6 PUT Update Product
  it('PUT Update Product', () => {
    cy.request('PUT', `${baseUrl}/products/1`, {
      title: 'Updated Product'
    }).then(res => {
      expect(res.status).to.eq(200)
      expect(res.body.title).to.eq('Updated Product')
    })
  })

  // 7 DELETE Product
  it('DELETE Product', () => {
    cy.request('DELETE', `${baseUrl}/products/1`)
      .then(res => {
        expect(res.status).to.eq(200)
      })
  })

  // 8 GET All Users
  it('GET All Users', () => {
    cy.request(`${baseUrl}/users`)
      .then(res => {
        expect(res.status).to.eq(200)
        expect(res.body.length).to.be.greaterThan(0)
      })
  })

  // 9 GET Single User
  it('GET Single User', () => {
    cy.request(`${baseUrl}/users/1`)
      .then(res => {
        expect(res.status).to.eq(200)
        expect(res.body.id).to.eq(1)
      })
  })

  // 10 GET Carts
  it('GET Carts', () => {
    cy.request(`${baseUrl}/carts`)
      .then(res => {
        expect(res.status).to.eq(200)
        expect(res.body.length).to.be.greaterThan(0)
      })
  })

})