import express from 'express'
import productsRoute from './products'
import usersRoute from './users'

const router = express.Router()

router.use('/products', productsRoute)
router.get('/', (req, res) => {
  return res.send('Hello World');
});

router.use('/users', usersRoute)

export default router