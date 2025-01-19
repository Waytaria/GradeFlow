# Projet : GradeFlow

## Description
EvalSys est une application web intuitive conçue pour la gestion des barèmes de notation. Elle permet aux enseignants et aux formateurs de créer, gérer et évaluer les barèmes de manière efficace. Grâce à son interface interactive, EvalSys simplifie le processus d'évaluation, tout en offrant une personnalisation complète et des fonctionnalités avancées.

---

## Fonctionnalités principales
- **Création de barèmes personnalisés** : Ajoutez des questions, attribuez des points et gérez vos barèmes.
- **Chargement de barèmes existants** : Importez des fichiers JSON pour réutiliser vos barèmes.
- **Évaluation d'élèves** : Enregistrez les notes et commentaires pour chaque élève.
- **Résumé des résultats** : Générez des tableaux HTML détaillés pour chaque élève.
- **Mode sombre** : Activez une interface adaptée aux environnements peu éclairés.
- **Téléchargement de fichiers** : Sauvegardez vos barèmes et résultats sous forme de fichiers JSON.

---

## Structure du projet
### Fichiers principaux
- `index.html` : Page principale pour créer ou charger des barèmes.
- `bareme.html` : Interface pour évaluer les élèves avec un barème sélectionné.
- `resultats.html` : Génération des tableaux de résultats récapitulatifs.

### Scripts
- `darkmode.js` : Gestion du mode sombre via des variables CSS.
- `bareme-manager.js` : Gestion des barèmes et des élèves.
- `generate-tables.js` : Génération de tableaux HTML des résultats.

### Styles
- `common.css` : Styles communs à toutes les pages.
- `index.css` : Styles spécifiques à la page d'accueil.
- `bareme.css` : Mise en page pour la gestion des barèmes.
- `resultats.css` : Styles pour les tableaux de résultats.

---

## Prérequis
- Navigateur moderne compatible avec HTML5, CSS3 et JavaScript ES6.

---

## Installation
1. Clonez le dépôt :
   ```bash
   git clone https://github.com/Waytaria/GradeFlow
   ```
2. Ouvrez `index.html` dans votre navigateur préféré.

---

## Utilisation
1. **Créer un nouveau barème** :
   - Cliquez sur "Créer un nouveau barème".
   - Ajoutez vos questions et attribuez les points.
2. **Charger un barème existant** :
   - Cliquez sur "Charger un barème" et importez un fichier JSON.
3. **Évaluer les élèves** :
   - Remplissez les notes pour chaque élève et ajoutez des commentaires.
   - Téléchargez ou générez un tableau récapitulatif des résultats.

---

## Contribution
Les contributions sont les bienvenues ! Pour participer :
1. Forkez le dépôt.
2. Créez une branche pour votre fonctionnalité :
   ```bash
   git checkout -b nouvelle-fonctionnalite
   ```
3. Soumettez une pull request.

---

## Licence
Ce projet est sous licence MIT. Consultez le fichier `LICENSE` pour plus de détails.

---

## Auteurs
- FERRAGU Thomas - Créateur principal
- Contributions bienvenues !

