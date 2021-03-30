import { expect } from "chai"
import Product from "../../../src/models/product"
import AuthService from '../../../src/services/auth'

describe('Routes: Products', () => {
  const defaulId = '56cb91bdc3464f14678934ca' 
  const defaultProduct = {
    name: 'Default product',
    description: 'product description',
    price: 100
  }

  const expectedProduct = {
    __v: 0,
    _id: defaulId,
    name: 'Default product',
    description: 'product description',
    price: 100
  }

  const expectedAdminUser = {
    _id: defaulId,
    name: 'Jhon Doe',
    email: 'jhon@mail.com',
    role: 'admin'
  }

  const authToken = AuthService.generateToken(expectedAdminUser)

  beforeEach(async() => {
    await Product.deleteMany()
    const product = new Product(defaultProduct)
    product._id = defaulId
    return await product.save()
  })

  afterEach(async() => await Product.deleteMany());

  describe('GET /products', () => {
    it('shoud return a list of products', done => {
      request
        .get('/products')
        .set({'x-access-token': authToken})
        .end((err, res) => {
          global.expect(res.body).to.eql([expectedProduct])
          done(err)
        })
    })

    context('when an id is specified', done => {
      it('should return 200 with one product', done => {
        request
          .get(`/products/${defaulId}`)
          .set({'x-access-token': authToken})
          .end((err, res) => {
            global.expect(res.statusCode).to.eql(200)
            global.expect(res.body).to.eql(expectedProduct)
            // console.log(res.body)
            done(err)
          })
      })
    })
  })

  describe('POST /products', () => {
    context('when posting a product', () => {
      it('shoud return a new product with status code 201', done => {
        const customId = '56cb91bdc3464f14678934ba'
        const newProduct = Object.assign({}, { _id: customId, __v:0}, defaultProduct) 
  
        const expectedSaveProduct = {
          __v: 0,
          _id: customId,
          name: 'Default product',
          description: 'product description',
          price: 100
        }
  
        request 
          .post('/products')
          .set({'x-access-token': authToken})
          .send(newProduct)
          .end((err, res) => {
            global.expect(res.statusCode).to.eql(201)
            global.expect(res.body).to.eql(expectedSaveProduct)
            done(err)
          })
      })
    })
  })

  describe('PUT /products/:id', () => {
    context('when editing a product', () => {
      it('should update the product and return 200 as status code', done => {
        const customProduct = {
          name: 'Custom name'
        }
        const updateProduct = Object.assign({}, customProduct, defaultProduct)

        request
          .put(`/products/${defaulId}`)
          .set({'x-access-token': authToken})
          .send(updateProduct)
          .end((err, res) => {
            expect(res.status).to.eql(200)
            done(err)
          })
      })
    })
  })

  describe('DELETE /product/id', () => {
    context('when delete a product', () => {
      it('should delete the product and return 204 as status code', done => {
        request
          .delete(`/products/${defaulId}`)
          .set({'x-access-token': authToken})
          .end((err, res) => {
            expect(res.status).to.eql(204)
            done(err)
          })
      })
    })
  })

})

