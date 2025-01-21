# GradeFlow

## Description
GradeFlow est une application web intuitive conçue pour la gestion des barèmes de notation. Elle permet aux enseignants et aux formateurs de créer et d'utiliser des barèmes pour évaluer les rendus de travaux pratiques.

---

## Fonctionnalités principales
- **Création de barèmes personnalisés** : Ajoutez des questions, attribuez des points et gérez vos barèmes.
- **Chargement de barèmes existants** : Importez des fichiers JSON pour réutiliser vos barèmes.
- **Évaluation d'élèves** : Enregistrez les notes et commentaires pour chaque élève.
- **Résumé des résultats** : Téléchargez une page HTML détaillée pour chaque élève.
- **Téléchargement de fichiers** : Sauvegardez vos barèmes et résultats sous forme de fichiers JSON.
- **Mode sombre** : Une interface adaptée à toutes les conditions d'éclairage.

---

## Utilisation
1. **Créer un nouveau barème** :
   - Cliquez sur **"Créer un nouveau barème"**.
   - Ajoutez vos questions et attribuez les points.
2. **Charger un barème existant** :
   - Cliquez sur **"Charger un barème"** et importez un fichier JSON.
3. **Évaluer les élèves** :
   - Remplissez les notes pour chaque élève et ajoutez des commentaires.
   - Téléchargez ou générez un tableau récapitulatif des résultats.

## Structure du projet

### Fichiers principaux
- **`Index.html`** : Page principale avec les options pour créer ou charger des barèmes.
- **`CreateScale.html`** : Interface de création de barèmes.
- **`LoadScale.html`** : Interface d'utilisation des barèmes existants.

### Scripts
- **`darkmode.js`** : Gestion du mode sombre via des variables CSS.
- **`CreateScaleHandler.js`** : Gestion de la création de barèmes.
- **`LoadScaleHandler.js`** : Gestion du chargement et de l'utilisation des barèmes.
- **`QuestionHandler.js`** : Gestion des questions dans les barèmes.
- **`Scale.js`** : Gestion de la structure des barèmes.
- **`StudentHandler.js`** : Gestion des données des élèves.

### Styles
- **`css/common.css`** : Styles communs à toutes les pages.
- **`css/index.css`** : Styles spécifiques à la page principale.
- **`css/createScale.css`** : Mise en page pour la création des barèmes.
- **`css/loadScale.css`** : Styles pour l'interface d'utilisation des barèmes.

---

## Prérequis
- Navigateur moderne compatible avec HTML5, CSS3 et JavaScript ES6.

---

## Installation
1. Clonez le dépôt :
   ```bash
   git clone https://github.com/Waytaria/GradeFlow

## Licence
Ce projet est sous licence **MIT**. Consultez le fichier **LICENSE** pour plus de détails.

---

## Auteurs
- **Thomas Ferragu** - Créateur principal
- Contributions bienvenues !