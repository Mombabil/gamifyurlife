# npm i react-router-dom axios sass

## npm i @reduxjs/toolkit react-redux

1- Créer et configurer le store
2- Créer slice (reducers)
3- "useDispatch" pour lancer les reducers
4- "useSelector" pour puiser la data dans le store

1- Connexion utilisateur
Redux recupere les données du formulaire à l'intérieur du composant <Login />
Sur le composant page <Home />, grace a Redux, on récupere le token de connexion
Si le token existe, l'utilisateur est connecté, on affiche le composant <Logged>
Si non, l'utilisateur n'est pas connecté, on affiche le composant <Login />
