class QuestionHandler {
    constructor(pointsRange = { min: 1, max: 100 }) {
        this.questions = [];
        this.pointsRange = pointsRange;
    }

    addQuestion(text, points) {
        if (this.questions.some(q => q.text === text)) {
            throw new Error('Cette question existe déjà.');
        }

        if (!text || typeof points !== 'number' || points < this.pointsRange.min || points > this.pointsRange.max) {
            throw new Error(`Les données de la question sont invalides. Le texte doit être non vide et les points compris entre ${this.pointsRange.min} et ${this.pointsRange.max}.`);
        }

        const question = { id: this.generateUniqueId(), text, points };
        this.questions.push(question);
        return question;
    }

    deleteQuestion(id) {
        const index = this.questions.findIndex(q => q.id === id);
        if (index === -1) {
            throw new Error(`Question avec l'ID "${id}" introuvable.`);
        }
        return this.questions.splice(index, 1)[0];
    }

    updateQuestion(id, newText, newPoints) {
        const question = this.getQuestionById(id);
        if (!question) {
            throw new Error(`Question avec l'ID "${id}" introuvable.`);
        }

        if (!newText || typeof newPoints !== 'number' || newPoints < this.pointsRange.min || newPoints > this.pointsRange.max) {
            throw new Error(`Les données de la question sont invalides. Le texte doit être non vide et les points compris entre ${this.pointsRange.min} et ${this.pointsRange.max}.`);
        }

        question.text = newText;
        question.points = newPoints;
        return question;
    }

    getAllQuestions() {
        return [...this.questions]; // Retourne une copie pour éviter toute modification externe
    }

    getQuestionById(id) {
        return this.questions.find(q => q.id === id) || null;
    }

    moveQuestionUp(id) {
        const index = this.questions.findIndex(q => q.id === id);
        if (index > 0) {
            [this.questions[index - 1], this.questions[index]] = [this.questions[index], this.questions[index - 1]];
        }
    }

    moveQuestionDown(id) {
        const index = this.questions.findIndex(q => q.id === id);
        if (index < this.questions.length - 1) {
            [this.questions[index], this.questions[index + 1]] = [this.questions[index + 1], this.questions[index]];
        }
    }

    initializeFromJSON(json) {
        try {
            const data = typeof json === 'string' ? JSON.parse(json) : json;
            if (!Array.isArray(data.questions)) {
                throw new Error("Le format JSON est invalide. La propriété 'questions' est manquante ou incorrecte.");
            }

            this.questions = data.questions.map((q) => ({
                id: q.id || this.generateUniqueId(),
                text: q.text,
                points: parseFloat(q.points)
            }));
        } catch (error) {
            throw new Error("Erreur lors de l'initialisation depuis le JSON : " + error.message);
        }
    }

    generateUniqueId() {
        return '_' + Math.random().toString(36).substr(2, 9);
    }
}