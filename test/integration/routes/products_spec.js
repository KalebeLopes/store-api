describe('Routes: Products', () => {
  let request
  let app

  before(async () => {
    app = await global.setupApp()
    request = global.supertest(app)
  })

  after(async () => await app.database.connection.close());

  const defaultProduct = {
    name: 'Default product',
    description: 'product description',
    price: 100
  }

  describe('GET /products', () => {
    it('shoud return a list of products', done => {
      request
      .get('/products')
      .end((err, res) => {
        global.expect(res.body[0]).to.eql(defaultProduct)
        done(err)
      })
    })
  })

})