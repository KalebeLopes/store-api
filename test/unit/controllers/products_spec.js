import ProductsController from '../../../src/controller/products'
import sinon from 'sinon'
import { expect } from 'chai'

describe('Contollers: Products', () => {

  const defaultProduct = [{
    name: 'Default product',
    description: 'product description',
    price: 100
  }]

  describe('get() products', () => {
    it('shoud return a list of products', () => {
      const request = {}
      const response = {
        send: sinon.spy()
      }

      const productsController = new ProductsController()
      productsController.get(request, response)

      expect(response.send.called).to.be.true
      expect(response.send.calledWith(defaultProduct)).to.be.true
    })
  })
})