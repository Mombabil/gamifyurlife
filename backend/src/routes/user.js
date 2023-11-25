const express = require("express");
const User = require("../models/user");
const authentification = require("../middlewares/authentification");
const router = new express.Router();

// CREATE
// creation de compte
router.post("/users", async (req, res, next) => {
  const user = new User(req.body);

  try {
    const authToken = await user.generateAuthTokenAndSaveUser();
    res.status(201).send({ user, authToken });
  } catch (e) {
    console.error("Veuillez entrez des informations valides!");
  }
});
// connexion
router.post("/users/login", async (req, res, next) => {
  try {
    const user = await User.findUser(req.body.email, req.body.password);
    const authToken = await user.generateAuthTokenAndSaveUser();
    res.send({ user, authToken });
  } catch (e) {
    console.error("Ce compte n'existe pas!");
  }
});
// déconnexion
router.post("/users/logout", authentification, async (req, res, next) => {
  try {
    // on recupere la liste de tt les tokens
    // on filtre le token en cours d'utilisation
    req.user.authTokens = req.user.authTokens.filter((authToken) => {
      return authToken.authToken !== req.authToken;
    });

    await req.user.save();
    res.send();
  } catch (e) {
    res.status(500).send();
  }
});
// supprimer ts les tokens de l'utilisateur
router.post("/users/logout/all", authentification, async (req, res, next) => {
  try {
    req.user.authTokens = [];
    await req.user.save();
    res.send();
  } catch (e) {
    res.status(500).send();
  }
});
// READ ALL
// router.get("/users", async (req, res, next) => {
//   try {
//     const users = await User.find({});
//     res.send(users);
//   } catch (e) {
//     res.status(500).send(e);
//   }
// });

// on insere le middleware au milieu de la requete pour verifier l'authentification de l'utilisateur
router.get("/users/me", authentification, async (req, res, next) => {
  res.send(req.user);
});

// READ BY ID
// router.get("/users/:id", async (req, res, next) => {
//   const userId = req.params.id;
//   try {
//     const user = await User.findById(userId);
//     if (!user) return res.status(404).send("User not found!");
//     res.send(user);
//   } catch (e) {
//     res.status(500).send(e);
//   }
// });

// UPDATE
router.patch("/users/me", authentification, async (req, res, next) => {
  const updatedInfo = Object.keys(req.body);

  try {
    updatedInfo.forEach((update) => (req.user[update] = req.body[update]));
    await req.user.save();

    res.send(req.user);
  } catch (e) {
    res.status(500).send(e);
  }
});

// DELETE
router.delete("/users/me", authentification, async (req, res, next) => {
  try {
    await req.user.remove();
    res.send(req.user);
  } catch (e) {
    res.status(500).send(e);
  }
});

module.exports = router;
