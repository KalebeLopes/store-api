import ProductsController from '../../../src/controller/products'
import Product from '../../../src/models/product'
import sinon from 'sinon'
import { expect } from 'chai'

describe('Contollers: Products', () => {

  const defaultProduct = [{
    name: 'Default product',
    description: 'product description',
    price: 100
  }]

  describe('get() products', () => {
    it('shoud return a list of products', async() => {
      const request = {}
      const response = {
        send: sinon.spy()
      }

      Product.find = sinon.stub()
      Product.find.withArgs({}).resolves(defaultProduct)

      const productsController = new ProductsController(Product)
      await productsController.get(request, response)

      sinon.assert.calledWith(response.send, defaultProduct)
    })
  })
})
