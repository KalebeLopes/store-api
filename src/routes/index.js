import express from 'express'
import productsRoute from './products'

const router = express.Router()

router.use('/products', productsRoute)
router.get('/', (req, res) => {
  return res.send('Hello World');
});

export default router