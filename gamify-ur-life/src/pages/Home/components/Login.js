import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getUser } from "../../../feature/user.slice";

const Login = () => {
  const [token, setToken] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [newUser, setNewUser] = useState(false);
  const [newEmail, setNewEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [name, setName] = useState("");
  const [firstname, setFirstname] = useState("");

  // recuperation du token de connexion avc redux
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getUser(token));
  }, [token]);

  // creation d'un utilisateur
  const createUser = (e) => {
    e.preventDefault();

    try {
      axios
        .post("http://localhost:5000/users/", {
          email: newEmail,
          password: newPassword,
          name: name,
          firstname: firstname,
        })
        .then((res) => {
          setToken(res.data.authToken);
        });
    } catch (e) {
      console.log("Connexion impossible");
    }

    // on reinitialise le formulaire (utile seulement si la connexion a echoué => mauvais identifiants)
    setNewEmail("");
    setNewPassword("");
    setName("");
    setFirstname("");
    setTimeout(() => {
      if (!token) {
        setError(true);
      }
    }, 500);
  };

  // connexion de l'utilisateur
  const connectUser = (e) => {
    e.preventDefault();

    try {
      axios
        .post("http://localhost:5000/users/login", {
          email,
          password,
        })
        .then((res) => {
          setToken(res.data.authToken);
        });
    } catch (e) {
      console.log("Connexion impossible");
    }
    // on reinitialise le formulaire (utile seulement si la connexion a echoué => mauvais identifiants)
    setEmail("");
    setPassword("");
    setTimeout(() => {
      if (!token) {
        setError(true);
      }
    }, 500);
  };

  return (
    <div className="login-container">
      <div className="presentation">
        <p>Bienvenue sur notre application de gestion de votre budget</p>
        {/* /public/img/login.jpg */}
        <img src="./img/login.jpg" alt="img du login" />
        <p>
          Gérez toutes vos dépenses facilement et faites des économies sans vous
          priver !
        </p>
      </div>
      <div className="connection">
        {newUser ? (
          // Nouvel utilisateur
          <>
            <h2>Créer un compte</h2>
            <form id="login-form" onSubmit={createUser}>
              <label htmlFor="email">Votre adresse mail :</label>
              <input
                type="text"
                name="email"
                id="email"
                placeholder="email"
                className="email"
                onChange={(e) => setNewEmail(e.target.value)}
                value={newEmail}
              />
              <label htmlFor="password">
                Votre mot de passe : (entre 4 et 20 caractères)
              </label>
              <input
                type="password"
                name="password"
                id="password"
                placeholder="mot de passe"
                className="password"
                onChange={(e) => setNewPassword(e.target.value)}
                value={newPassword}
              />
              <label htmlFor="name">Votre nom :</label>
              <input
                type="text"
                name="name"
                id="name"
                placeholder="nom"
                className="name"
                onChange={(e) => setName(e.target.value)}
                value={name}
              />
              <label htmlFor="firstname">Votre prénom :</label>
              <input
                type="text"
                name="firstname"
                id="firstname"
                placeholder="prénom"
                className="firstname"
                onChange={(e) => setFirstname(e.target.value)}
                value={firstname}
              />
              <input type="submit" value="Connexion" className="submit" />
              <p className="error">
                {error
                  ? "Veuillez saisir une adresse mail et un mot de passe valide"
                  : ""}
              </p>
              <p>
                Vous avez déjà un compte, cliquez{" "}
                <span onClick={() => setNewUser(false)}>ici</span>
              </p>
            </form>
          </>
        ) : (
          // Utilisateur déjà inscrit
          <>
            <h2>Formulaire de connexion</h2>
            <form id="login-form" onSubmit={connectUser}>
              <label htmlFor="email">Votre adresse mail :</label>
              <input
                type="text"
                name="email"
                id="email"
                placeholder="email"
                className="email"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
              />
              <label htmlFor="password">Votre mot de passe :</label>
              <input
                type="password"
                name="password"
                id="password"
                placeholder="mot de passe"
                className="password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
              />
              <input type="submit" value="Connexion" className="submit" />
              <p className="error">
                {error
                  ? "Veuillez saisir une adresse mail et un mot de passe valide"
                  : ""}
              </p>
              <p>
                Pas encore de compte, créer en un{" "}
                <span onClick={() => setNewUser(true)}>ici</span>
              </p>
            </form>
          </>
        )}
      </div>
    </div>
  );
};

export default Login;
