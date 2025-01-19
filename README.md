# Projet : GradeFlow

## Description
GradeFlow est une application web intuitive conçue pour la gestion des barèmes de notation. Elle permet aux enseignants et aux formateurs de créer et d'utiliser des barèmes de notation pour évaluer les rendus de travaux pratiques.

---

## Fonctionnalités principales
- **Création de barèmes personnalisés** : Ajoutez des questions, attribuez des points et gérez vos barèmes.
- **Chargement de barèmes existants** : Importez des fichiers JSON pour réutiliser vos barèmes.
- **Évaluation d'élèves** : Enregistrez les notes et commentaires pour chaque élève.
- **Résumé des résultats** : Téléchargez une page HTML détaillée pour chaque élève.
- **Téléchargement de fichiers** : Sauvegardez vos barèmes et résultats sous forme de fichiers JSON.
- **Mode sombre** : Une interface adaptée à toutes les conditions d'éclairage.

---

## Structure du projet
### Fichiers principaux
- **`index.html`** : Page principale pour créer ou charger des barèmes.
- **`nouveau.html`** : Interface de création de barèmes.
- **`charger.html`** : Interface d'utilisation des barèmes.

### Scripts
- **`darkmode.js`** : Gestion du mode sombre via des variables CSS.
- **`nouveau.js`** : Création de barèmes.
- **`charger.js`** : Utilisation des barèmes et génération des fichiers téléchargeables.

### Styles
- **`common.css`** : Styles communs à toutes les pages.
- **`index.css`** : Styles spécifiques à la page d'accueil.
- **`nouveau.css`** : Mise en page pour la création des barèmes.
- **`charger.css`** : Styles pour l'interface d'utilisation des barèmes.

---

## Prérequis
- Navigateur moderne compatible avec HTML5, CSS3 et JavaScript ES6.

---

## Installation
1. Clonez le dépôt :
   ```bash
   git clone https://github.com/Waytaria/GradeFlow
   ```
2. Ouvrez **`index.html`** dans votre navigateur préféré.

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

---

## Contribution
Les contributions sont les bienvenues ! Pour participer :
1. Forkez le dépôt.
2. Créez une branche pour votre fonctionnalité :
   ```bash
   git checkout -b nouvelle-fonctionnalité
   ```
3. Soumettez une pull request.

---

## Licence
Ce projet est sous licence **MIT**. Consultez le fichier **`LICENSE`** pour plus de détails.

---

## Auteurs
- **Thomas Ferragu** - Créateur principal
- Contributions bienvenues !

