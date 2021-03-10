import { expect } from "chai"
import Product from "../../../src/models/product"

describe('Routes: Products', () => {
  let request
  let app

  before(async () => {
    app = await global.setupApp()
    request = global.supertest(app)
  })

  after(async () => await app.database.connection.close());

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
        .end((err, res) => {
          global.expect(res.body).to.eql([expectedProduct])
          done(err)
      })
    })

    context('when an id is specified', done => {
      it('should return 200 with one product', done => {
        request
          .get(`/products/${defaulId}`)
          .end((err, res) => {
            global.expect(res.statusCode).to.eql(200)
            global.expect(res.body).to.eql(expectedProduct)
            // console.log(res.body)
            done(err)
          })
      })
    })
  })
})