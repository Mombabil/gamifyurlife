import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "../../../../feature/user.slice";
import Operation from "./components/Operation";
import { getDatas } from "../../../../feature/datas.slice";

const Logged = () => {
  const [user, setUser] = useState("");
  const [datas, setDatas] = useState([]);
  const token = useSelector((state) => state.user.authToken);
  const activeDatas = useSelector((state) => state.datas.data);
  const dispatch = useDispatch();

  // on recupere les données de l'utilisateur et tt les datas de budgets
  useEffect(() => {
    if (token !== "") {
      const config = {
        headers: { Authorization: `Bearer ${token}` },
      };
      axios
        .get("http://localhost:5000/users/me", config)
        .then((res) => {
          setUser(res.data);
        })
        .then(() => {
          axios
            .get("http://localhost:5000/budgets")
            .then((res) => setDatas(res.data));
        });
    }
  }, []);

  // déconnexion (supprime tt les tokens de l'utilisateur)
  const disconnectUser = () => {
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    axios
      .post("http://localhost:5000/users/logout/all", [], config)
      .then((res) => {
        dispatch(getUser(""));
        dispatch(getDatas(""));
      })
      .catch((e) => console.error(e));
  };

  // script pour afficher la date actuelle
  const dateFormater = (date) => {
    return new Date(date).toLocaleDateString("fr-FR", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };
  // affichage de la date au format numerique dans le tableau
  const dateLiFormater = (date) => {
    return new Date(date).toLocaleDateString("fr-FR", {
      year: "numeric",
      month: "numeric",
      day: "numeric",
    });
  };

  return (
    <div className="logged-container">
      <Operation userId={user._id} />
      <div className="results">
        <div className="headerResults">
          <h2>
            Bienvenue {user.firstname}{" "}
            <button onClick={() => disconnectUser()}>Deconnexion</button>
          </h2>
        </div>
        <div className="infos">
          <div className="currentDate">
            <span>{dateFormater(Date.now())}</span>
          </div>
          <div className="resume">
            <h1>Mes opérations</h1>
            <div className="resumeData">
              {/* <div className="date">
                <form>
                  <label htmlFor="period">Pour le mois de :</label>
                  <select name="period" id="period">
                    <option value="total">Total</option>
                    <option value="janvier">janvier</option>
                    <option value="fevrier">fevrier</option>
                    <option value="mars">mars</option>
                    <option value="avril">avril</option>
                    <option value="mai">mai</option>
                    <option value="juin">juin</option>
                    <option value="juillet">juillet</option>
                    <option value="aout">aout</option>
                    <option value="septembre">septembre</option>
                    <option value="octobre">octobre</option>
                    <option value="novembre">novembre</option>
                    <option value="decembre">decembre</option>
                  </select>
                </form>
              </div>
              <div className="depenses">
                <p>
                  Dépenses : <span>{depenses} €</span>
                </p>
              </div>
              <div className="revenus">
                <p>
                  Revenus : <span>€</span>
                </p>
              </div>
              <div className="result">
                <p>
                  Resultat : <span>€</span>
                </p>
              </div> */}
            </div>
          </div>
        </div>
        <div className="datas">
          <table>
            <thead>
              <tr>
                <th>Date</th>
                <th>Type</th>
                <th>Montant</th>
                <th>Catégorie</th>
                <th>Description</th>
              </tr>
            </thead>
            <tbody>
              {activeDatas === null || activeDatas === ""
                ? datas.map((data) => {
                    if (data.userId === user._id) {
                      return (
                        <tr
                          key={data._id}
                          className={data.depenses ? "depenses" : "revenus"}
                        >
                          <td>{dateLiFormater(data.createdAt)}</td>
                          <td className="color">
                            {data.depenses ? "dépense" : "revenu"}
                          </td>
                          <td>
                            {data.depenses
                              ? data.depenses + "€"
                              : data.revenus + "€"}
                          </td>
                          <td>{data.categorie}</td>
                          <td>{data.description}</td>
                        </tr>
                      );
                    }
                  })
                : activeDatas.map((data) => {
                    if (data.userId === user._id) {
                      return (
                        <tr
                          key={data._id}
                          className={data.depenses ? "depenses" : "revenus"}
                        >
                          <td>{dateLiFormater(data.createdAt)}</td>
                          <td className="color">
                            {data.depenses ? "dépense" : "revenu"}
                          </td>
                          <td>
                            {data.depenses
                              ? data.depenses + "€"
                              : data.revenus + "€"}
                          </td>
                          <td>{data.categorie}</td>
                          <td>{data.description}</td>
                        </tr>
                      );
                    }
                  })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Logged;
