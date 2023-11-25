// npm i bcryptjs
// npm i jsonwebtoken

const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// SCHEMA
const userSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    required: true,
    validate(v) {
      if (!validator.isEmail(v)) throw new Error("Email non valide");
    },
  },
  password: {
    type: String,
    required: true,
  },
  authTokens: [
    {
      authToken: {
        type: String,
        required: true,
      },
    },
  ],
  name: {
    type: String,
  },
  firstname: {
    type: String,
  },
});

// on masque le mot de passe et le token coté front
userSchema.methods.toJSON = function () {
  const user = this.toObject();

  delete user.password;
  delete user.authTokens;

  return user;
};

// créer le token et sauvegarder l'utilisateur connecté
userSchema.methods.generateAuthTokenAndSaveUser = async function () {
  const authToken = jwt.sign({ _id: this._id.toString() }, "foo");
  this.authTokens.push({ authToken });
  await this.save();
  return authToken;
};

// verification du mot de passe au moment de la connexion
userSchema.statics.findUser = async (email, password) => {
  const user = await User.findOne({ email });
  if (!user) throw new Error("Erreur, pas possible de se connecter!");
  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid)
    throw new Error("Erreur, pas possible de se connecter!");
  return user;
};

// initialisation du middleware
// hachage du mot de passe
userSchema.pre("save", async function () {
  if (this.isModified("password"))
    this.password = await bcrypt.hash(this.password, 8);
});

//   Model
const User = mongoose.model("User", userSchema);

module.exports = User;
