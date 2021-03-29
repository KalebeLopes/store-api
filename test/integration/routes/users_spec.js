import { expect } from 'chai'
import { request } from 'express'
import User from '../../../src/models/user'

describe('Routes: Users', () => {
  const defaultId = '56cb91bdc3464f14678934ca'
  const defaultAdmin = {
    name: 'Jhon Doe',
    email: 'jhon@mail.com',
    password: '123password',
    role: 'admin'
  }
  const expectedAdminUser = {
    _id: defaultId,
    name: 'Jhon Doe',
    email: 'jhon@mail.com',
    role: 'admin'
  }

  beforeEach(async() => {
    const user = new User(defaultAdmin)
    user._id = '56cb91bdc3464f14678934ca'
    await User.deleteMany({})
    await user.save()
  })
  
  afterEach(async() => await User.deleteMany({}))

  describe('GET /users', () => {
    it('should return a list of users', done => {
      global.request
        .get('/users')
        .end((err, res) => {
          global.expect(res.body).to.eql([expectedAdminUser])
          done(err)
        })
    })

    context('when an id is specified', done => {
      it('should return 200 with one user', done => {
        global.request
          .get(`/users/${defaultId}`)
          .end((err, res) => {
            global.expect(res.statusCode).to.eql(200)
            global.expect(res.body).to.eql(expectedAdminUser)
            done(err)
          })
      })
    })
  })

  describe('POST /users', () => {
    it('should return status code 201 with a new user', done => {
      const fakeId = '56cb91bdc3464f14678934ba'
      const newUser = Object.assign({}, { _id: fakeId, __v: 0 }, defaultAdmin)

      // const expectedUser = {
      //   _id: fakeId,
      //   email: 'user@mail.com',
      //   name: 'nameUser',
      //   role: 'roleUser'
      // }

      const expectedSavedUser = {
        _id: fakeId,
        name: 'Jhon Doe',
        email: 'jhon@mail.com',
        role: 'admin'
      }

      global.request
        .post('/users')
        .send(newUser)
        .end((err, res) => {
          global.expect(res.body).to.eql(expectedSavedUser)
          global.expect(res.statusCode).to.eql(201)
          done(err)
        })
    })
  })

  describe('PUT /users', () => {
    it('should return statusCode 200 when an user has been updated', done => {
      const updateUser = Object.assign({}, { name: 'kalebe' }, defaultAdmin)

      global.request
        .put(`/users/${defaultId}`)
        .send(updateUser)
        .end((err, res) => {
          global.expect(res.statusCode).to.eql(200)
          done(err)
        })
    })
  })

  describe('DELETE /users', () => {
    it('should return statusCode 204 when all users has been deleted', function (done){
      global.request
        .delete('/users')
        .end((err, res) => {
          global.expect(res.statusCode).to.eql(204)
          done(err)
        })
    })

    it('should return statusCode 204 when an user has been deleted', done => {
      global.request 
        .delete(`/users/${defaultId}`)
        .end((err, res) => {
          global.expect(res.statusCode).to.eql(204)
          done(err)
        })
    })
  })
})