export default class UsersController {
  constructor(User) {
    this.User = User
  }

  async get (req, res) {
    try {
      const users = await this.User.find({})
      res.send(users)
    } catch(err) {
      res.status(400).send(err.message)
    }
  }

  async getById (req, res) {
    try {
      const user = await this.User.findOne({ _id: req.params.id })
      console.log(user)
      res.send(user)
    } catch (err) {
      res.status(400).send(err.message)
    }
  }

  async createUser (req, res) {
    const user = new this.User(req.body)
    try {
      await user.save()
      res.status(201).send(user)
    } catch (err) {
      res.status(422).send(err.message)
    }
  }

  async updateUser (req, res) {
    const idUser = req.params.id 
    const bodyNewUser = req.body
    try {
      const newUser = await this.User.updateOne({_id: idUser}, bodyNewUser)
      res.status(201).send(await this.User.findOne({_id: idUser}))
    } catch (err) {
      res.status(422).send(err.message)
    }
  }

  async deleteAll (req, res) {
    try {
      await this.User.deleteMany({})
      res.status(204).send()
    } catch (err) {
      res.status(400).send(err.message)
    }
  }

  async deleteById (req, res) {
    const userId = req.params.id
    try {
      await this.User.deleteOne({_id: userId})
      res.status(204).send()
    } catch (err) {
      res.status(400).send(err.message)
    }
  }

}