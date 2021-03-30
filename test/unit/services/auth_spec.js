import AuthService from '../../../src/services/auth.js'
import bcrypt from 'bcrypt'
import Util from 'util'
import sinon from 'sinon'
import jwt from 'jsonwebtoken'
import config from 'config'
import { expect } from 'chai'

const hasAsync = Util.promisify(bcrypt.hash)

describe('Service: Auth', () => {
  context('autenticate', () => {
    it('should authenticate an user', async () => {
      const fakeUserModel = {
        findOne: sinon.stub()
      }
      const user = {
        name: 'John',
        email: 'jhondoe@mail.com',
        password: '12345'
      } 
      const authService = new AuthService(fakeUserModel)
      const hashedPassword = await hasAsync(user.password, 10)
      const userFromDatabase = {
        ...user,
        password: hashedPassword
      }

      fakeUserModel.findOne.withArgs({ email: user.email }).resolves(userFromDatabase)
      
      const res = await authService.authenticate(user)
      
      expect(res).to.eql(userFromDatabase)
    })

    it('should return false when the password does not match', async () => {
      const user = {
        email: 'jhondoe@mail.com',
        password: '12345'
      };

      const fakeUserModel = {
        findOne: sinon.stub()
      };

      fakeUserModel.findOne.resolves({ email: user.email, password: 'fakePassword' });

      const authService = new AuthService(fakeUserModel);
      const response = await authService.authenticate(user);

      expect(response).to.be.false;
    })
  })

  context('generateToken', () => {
    it('should generate a JWT token from a payload', () => {
      const payload = {
        name: 'John',
        email: 'john@mail.com',
        password: '12345'
      }
      const expectedToken = jwt.sign(payload, config.get('auth.key'), {
        expiresIn: config.get('auth.tokenExpiresIn')
      })
      const generatedToken = AuthService.generateToken(payload)
      expect(generatedToken).to.eql(expectedToken)
    })
  })
})