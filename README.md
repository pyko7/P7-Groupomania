# P7 - Groupomania

Bienvenue sur le repo de mon 7e et dernier projet.

L'objectif de ce projet est de créer un réseau social pour une entreprise.

Le challenge de ce projet a été de créer de A à Z le projet en utilisant pour la première fois React ainsi que MySQL


## Installation

Cloner le projet

```bash
  git clone https://github.com/pyko7/P7-Groupomania.git
```


### Base de donnée

Créer une base de donnée  
```bash
CREATE DATABASE nomDeLaBdd
```
Importer le dump
```bash
mysql --u root --p nomDeLaBdd < nomDuDump.sql
```

### Backend

* Dans le fichier .env.template, retirer l'extension .template pour n'avoir qu'un fichier .env

* Dans ce même fichier .env, modifier les valeurs suivantes:

| Variables  | Données |
| ------------- | ------------- |
| USER  | nom d'utilisateur de la base de données (e.g root)  |
| PASSWORD | mot de passe de la base de données  |
| DATABASE | le nom de votre base de données (e.g nomDeLaBdd)  |

Plus de détails [ici]("https://www.prisma.io/docs/concepts/database-connectors/mysql#connection-details")




Placez-vous à la racine du dossier backend avec la commande
```bash
cd backend
```
Installer les dépendances
```bash
npm install
```
Démarrer le serveur
```bash
node server
```


### Frontend

Placez-vous à la racine du dossier frontend avec la commande
```bash
  cd frontend
```
Installer les dépendances avec la commande
```bash
  npm install
```
Puis démarrer l'application avec la commande
```bash
  npm start
```
L'application devrait s'ouvrir dans le navigateur à l'adresse suivante:
```bash
  http://localhost:8000/auth/login
```

## Technologies & dépendances utilisées

- React v18
- SCSS
- NodeJS
- Express
- Bcrypt
- JsonWebToken
- Multer
- Uuid
- MySQL
- Prisma


