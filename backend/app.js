// npm init
// npm i express mongoose dotenv validator
require("dotenv").config();
const { connectDb } = require("./src/services/mongoose");
const userRoutes = require("./src/routes/user");
const budgetRoutes = require("./src/routes/budget");
const cors = require("cors");

// connexion express
const express = require("express");
const app = express();
const port = process.env.PORT || 5000;

// connexion database
connectDb().catch((err) => console.log(err));

// AuthorisationCORS
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
    optionsSuccessStatus: 200,
  })
);

// gestion des routes
app.use(express.json());
app.use(userRoutes);
app.use(budgetRoutes);
app.use((req, res) => res.json({ message: "l'api est en ligne" }));

app.listen(port, () => {
  console.log("Le serveur est lancé sur le port " + port);
});
