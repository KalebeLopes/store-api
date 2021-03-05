import { expect } from "chai"
import { request } from "express"

describe('Routes: Products', () => {
  const defaultProduct = {
    name: 'Default product',
    description: 'product description',
    price: 100
  }

  describe('GET /products', () => {
    it('shoud return a list of products', done => {
      global.request
      .get('/products')
      .end((err, res) => {
        expect(res.body[0]).to.eql(defaultProduct)
        done(err)
      })
    })
  })
})