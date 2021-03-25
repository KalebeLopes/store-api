export default class UsersController {
  constructor(User) {
    this.User = User
  }

  async get (req, res) {
    const users = await this.User.find({})
    res.send(users)
  }

}