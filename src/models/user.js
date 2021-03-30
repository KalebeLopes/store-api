import mongoose from "mongoose";
import Util from "util";
import bcrypy from "bcrypt";

const hashAsync = Util.promisify(bcrypy.hash);
const schema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  role: String
});

schema.pre("save", async function(next) {
  if (!this.password || !this.isModified("password")) {
    return next();
  }
  try {
    const hashedPassword = await hashAsync(this.password, 10);
    this.password = hashedPassword;
  } catch (err) {
    next(err);
  }
});

schema.set("toJSON", {
  // utilizado para intervir na serialização e customizar o resultado final do obj
  transform: (doc, ret, options) => ({
    // transform para remover o password do obj final
    _id: ret._id,
    email: ret.email,
    name: ret.name,
    role: ret.role
  })
});

const User = mongoose.model("User", schema);

export default User;
