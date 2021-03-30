import { expect } from 'chai'
import { request } from 'express'
import User from '../../../src/models/user'
import AuthService from '../../../src/services/auth'

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

  const authToken = AuthService.generateToken(expectedAdminUser)

  beforeEach(async() => {
    await User.deleteMany({})
    const user = new User(defaultAdmin)
    user._id = defaultId
    await user.save()
  })
  
  afterEach(async() => await User.deleteMany({}))

  describe('GET /users', () => {
    it('should return a list of users', done => {
      global.request
        .get('/users')
        .set({'x-access-token': authToken})
        .end((err, res) => {
          global.expect(res.body).to.eql([expectedAdminUser])
          done(err)
        })
    })

    context('when an id is specified', done => {
      it('should return 200 with one user', done => {
        global.request
          .get(`/users/${defaultId}`)
          .set({'x-access-token': authToken})
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
        .set({'x-access-token': authToken})
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
        .set({'x-access-token': authToken})
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
        .set({'x-access-token': authToken})
        .end((err, res) => {
          global.expect(res.statusCode).to.eql(204)
          done(err)
        })
    })

    it('should return statusCode 204 when an user has been deleted', done => {
      global.request 
        .delete(`/users/${defaultId}`)
        .set({'x-access-token': authToken})
        .end((err, res) => {
          global.expect(res.statusCode).to.eql(204)
          done(err)
        })
    })
  })

  describe('POST /users/authenticate', () => {
    context('when authenticating an user', () => {
      it('should generate a valid token', done => {
        global.request
          .post('/users/authenticate')
          .send({
            email: 'jhon@mail.com',
            password: '123password'
          })
          .end((err, res) => {
            global.expect(res.body).to.have.key('token')
            global.expect(res.status).to.eql(200)
            done(err)
          })
      })
  
      it('should return unauthorized when the password does not match', done => {
        
        global.request
          .post(`/users/authenticate`)
          .send({
            email: 'jhon@mail.com',
            password: 'wrong'
          })
          .end((err, res) => {
            global.expect(res.status).to.eql(401)
            done(err)
          })
      })
    })
  })
})

