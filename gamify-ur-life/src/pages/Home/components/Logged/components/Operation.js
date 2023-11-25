import axios from "axios";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { getDatas } from "../../../../../feature/datas.slice";

const Operation = ({ userId }) => {
  const [datas, setDatas] = useState([]);
  const dispatch = useDispatch();
  // valeur saisie sur la calculette et affichage
  const [data, setData] = useState("");
  // choix de la categorie
  const [categorie, setCategorie] = useState("");
  const [catType, setCatType] = useState("");
  const error = document.querySelector(".error");
  const success = document.querySelector(".success");

  // affichage des boutonsde la calculette
  const values = [7, 8, 9, 4, 5, 6, 1, 2, 3, 0, "."];

  const submit = () => {
    if (data && categorie && catType) {
      // on verifie qu'un nombre valide a été saisie
      const dataToNum = Number(data);
      if (!isNaN(dataToNum)) {
        // gestion de l'affichage des erreurs
        error.textContent = "";
        success.textContent = "Opération Réussi!";

        // envoi vers la base de données
        try {
          axios
            .post("http://localhost:5000/budgets", {
              userId: userId,
              depenses: categorie === "depenses" ? dataToNum : "",
              revenus: categorie === "revenus" ? dataToNum : "",
              categorie: catType,
            })
            .then(() => {
              axios
                .get("http://localhost:5000/budgets")
                .then((res) => dispatch(getDatas(res.data)));
            });
        } catch (e) {
          console.log(e);
        }
        reset();
      } else {
        reset();
      }
    } else {
      success.textContent = "";
      error.textContent =
        "Veuillez saisir une catégorie et une valeur valide !";
      reset();
    }
  };

  const reset = () => {
    setData("");
    setCategorie("");
    setCatType("");
  };

  return (
    <div className="operation-container">
      <h2>Ajouter une opération</h2>
      <p className="error infos"></p>
      <p className="success infos"></p>

      <div className="categorie">
        <h4>Catégorie :</h4>
        {/* on affiche d'abord le bouton radio, apres que l'utilisateur est choisi on le fait disparaitre et on affiche une liste defilante qui propose des choix différent selon ce qui a été choisi dans le bouton radio */}
        {categorie !== "" ? (
          // si on a deja choisi la categorie => liste detaillé
          <form>
            <select
              name="categorie"
              id="categorie"
              onChange={(e) => setCatType(e.target.value)}
            >
              <option value="categorie">Selectionnez une catégorie</option>
              {/* selon ce que vaut categorie, la liste change */}
              {categorie === "depenses" ? (
                <>
                  <option value="alimentaire">alimentaire</option>
                  <option value="logement">logement</option>
                  <option value="bancaire">bancaire</option>
                  <option value="loisir">loisir</option>
                  <option value="shopping">shopping</option>
                </>
              ) : (
                <option value="salaire">salaire</option>
              )}
            </select>
          </form>
        ) : (
          // si on a pas encore choisi la categorie => bouton radio
          <form>
            <div onClick={() => setCategorie("depenses")}>
              <label htmlFor="depenses">Dépense</label>
              <input type="radio" name="depenses" id="depenses" />
            </div>
            <div onClick={() => setCategorie("revenus")}>
              <label htmlFor="revenus">Revenu</label>
              <input type="radio" name="revenus" id="revenus" />
            </div>
          </form>
        )}
      </div>
      <div className="calculatrice">
        <p className="input">
          <span className="infos"></span>
          <span className="saisie">{data}</span>
          <span className="neutral">€</span>
        </p>
        <div className="calc">
          {values.map((value) => (
            <span
              className="touch"
              key={value}
              onClick={(e) =>
                setData(
                  data ? data + e.target.textContent : e.target.textContent
                )
              }
            >
              {value}
            </span>
          ))}
          <span className="submit" onClick={submit}>
            =
          </span>
        </div>
        <span
          className="reset"
          onClick={() => {
            reset();
          }}
        >
          RESET
        </span>
      </div>
    </div>
  );
};

export default Operation;
