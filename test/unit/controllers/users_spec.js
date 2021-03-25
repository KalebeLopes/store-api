import UsersController from '../../../src/controller/users'
import User from '../../../src/models/user'
import sinon from 'sinon'

describe('Controllers: Users', () => {
  const defaultId = '56cb91bdc3464f14678934ca'
  const defaultRequest = {
    params: {}
  }
  const defaultUse = [
    {
      __V: 0,
      _id: defaultId,
      name: 'Default name',
      email: 'user@mail.com',
      password: 'password',
      role: 'user'
    }
  ] 

  describe('get() users', () => {
    it('shoud return a list of users', async() => {
      const response = {
        send: sinon.spy()
      }

      User.find = sinon.stub()
      User.find.withArgs({}).resolves(defaultUse)
      
      const usersController = new UsersController(User);
      await usersController.get(defaultRequest, response);

      sinon.assert.calledWith(response.send, defaultUse)
    })
  })
})

