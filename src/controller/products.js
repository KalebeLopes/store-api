class ProductsController {
  constructor(Product) {
    this.Product = Product;
  }

  async get(req, res) {
    try {
      const products = await this.Product.find({});
      res.send(products);
    } catch (err) {
      res.status(400).send(err.message);
    }
  }

  async getById(req, res) {
    const {
      params: { id }
    } = req;

    try {
      const product = await this.Product.findOne({ _id: id });
      // console.log(product)
      res.send(product);
    } catch (err) {
      res.status(400).send(err.message);
      //console.error('400')
    }
  }

  async createProduct(req, res) {
    const product = new this.Product(req.body);
    try {
      await product.save();
      res.status(201).send(product);
    } catch (err) {
      res.status(422).send(err.message);
    }
  }

  async update(req, res) {
    try {
      await this.Product.updateOne({ _id: req.params.id }, req.body);
      res.sendStatus(200);
    } catch (err) {
      res.status(422).send(err.message);
    }
  }

  async remove(req, res) {
    try {
      const id = req.params.id;
      console.log(id);
      await this.Product.deleteOne({ _id: id });
      res.sendStatus(204);
    } catch (err) {
      res.status(400).send(err.message);
    }
  }
}

export default ProductsController;
