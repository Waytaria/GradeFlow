export class Scale {
    constructor(jsonData = null) {
        this.questions = [];

        if (jsonData) {
            try {
                const parsedData = typeof jsonData === 'string' ? JSON.parse(jsonData) : jsonData;
                if (Array.isArray(parsedData.questions)) {
                    this.questions = parsedData.questions.map(question => ({
                        id: question.id,
                        text: question.text,
                        points: parseFloat(question.points) // Assurer que les points sont en float
                    }));
                } else {
                    alert("Format JSON invalide : la propriété 'questions' est manquante ou incorrecte.");
                }
            } catch (error) {
                alert("Erreur lors de l'initialisation depuis le JSON : " + error.message);
            }
        }
    }

    // Create - Ajouter une question
    addQuestion(text, maxPoints) {
        if (!text || typeof maxPoints !== 'number' || maxPoints < 0) {
            alert("Données invalides pour la question : assurez-vous que le texte est non vide et que les points sont un nombre positif.");
            return null;
        }

        const id = this.questions.length > 0
            ? (parseInt(this.questions[this.questions.length - 1].id, 10) + 1).toString()
            : "1";
        const question = { id, text, points: parseFloat(maxPoints) }; // Convertir en float
        this.questions.push(question);
        return question;
    }

    // Read - Obtenir toutes les questions
    getAllQuestions() {
        return this.questions;
    }

    // Read - Obtenir une question par ID
    getQuestionById(id) {
        const question = this.questions.find(question => question.id === id);
        if (!question) {
            alert("Question introuvable avec l'ID : " + id);
        }
        return question || null;
    }

    // Update - Modifier une question par ID
    updateQuestion(id, newText, newMaxPoints) {
        const question = this.getQuestionById(id);
        if (!question) {
            alert("Impossible de mettre à jour : question introuvable avec l'ID " + id);
            return null;
        }

        if (!newText || typeof newMaxPoints !== 'number' || newMaxPoints < 0) {
            alert("Données invalides pour la mise à jour : assurez-vous que le texte est non vide et que les points sont un nombre positif.");
            return null;
        }

        question.text = newText;
        question.points = parseFloat(newMaxPoints); // Convertir en float
        return question;
    }

    // Delete - Supprimer une question par ID
    deleteQuestion(id) {
        const index = this.questions.findIndex(question => question.id === id);
        if (index === -1) {
            alert("Impossible de supprimer : question introuvable avec l'ID " + id);
            return null;
        }

        return this.questions.splice(index, 1)[0];
    }

    // Convertir le barème en JSON
    toJSON() {
        return JSON.stringify({ questions: this.questions }, null, 2);
    }
}