# initialisation
Pour initialiser le projet nous devons lancer notre serveur json sur le port 3500
```
 json-server -w data/db.json -p 3500
 ```

 pour pouvoir lancer le serveur il faut installer json-server
 ```
 // installation globale:
npm i json-server -g
 // lancer le serveur sans installation prealable.
npx json-server -w data/db.json -p 3500
 ```