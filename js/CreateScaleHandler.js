class CreateScaleHandler {
    constructor() {
        this.questionHandler = new QuestionHandler();
    }

    initialize() {
        // Attacher les écouteurs d'événements
        document.getElementById('add-question').addEventListener('click', () => this.addQuestion());
        ['question', 'points'].forEach(id => {
            document.getElementById(id).addEventListener('keydown', (event) => {
                if (event.key === 'Enter') {
                    this.addQuestion();
                }
            });
        });
        document.getElementById('save-questions').addEventListener('click', () => this.saveToFile());
        document.getElementById('load-scale').addEventListener('click', () => this.loadFromFile());

        // Rendu initial des questions
        this.renderQuestions();
    }

    addQuestion() {
        const questionInput = document.getElementById('question');
        const pointsInput = document.getElementById('points');
        const text = questionInput.value.trim();
        const points = parseFloat(pointsInput.value);

        try {
            this.questionHandler.addQuestion(text, points);
            this.renderQuestions();
        } catch (error) {
            alert(error.message);
        }

        questionInput.value = '';
        pointsInput.value = '';
        questionInput.focus();
    }

    deleteQuestion(id) {
        try {
            this.questionHandler.deleteQuestion(id);
            this.renderQuestions();
        } catch (error) {
            alert(error.message);
        }
    }

    moveQuestionUp(id) {
        this.questionHandler.moveQuestionUp(id);
        this.renderQuestions();
    }

    moveQuestionDown(id) {
        this.questionHandler.moveQuestionDown(id);
        this.renderQuestions();
    }

    renderQuestions() {
        const container = document.getElementById('questions-container');
        container.innerHTML = '';
        const questions = this.questionHandler.getAllQuestions();

        questions.forEach((question) => {
            const li = document.createElement('li');

            const questionText = document.createElement('div');
            questionText.classList.add('question-text');
            questionText.textContent = `${question.text}`;

            const questionPoints = document.createElement('div');
            questionPoints.classList.add('question-points');
            questionPoints.textContent = `${question.points} points`;

            const upArrow = document.createElement('span');
            upArrow.innerHTML = '⬆️';
            upArrow.classList.add('move-up');
            upArrow.title = 'Monter';
            upArrow.style.cursor = 'pointer';
            upArrow.addEventListener('click', () => this.moveQuestionUp(question.id));

            const downArrow = document.createElement('span');
            downArrow.innerHTML = '⬇️';
            downArrow.classList.add('move-down');
            downArrow.title = 'Descendre';
            downArrow.style.cursor = 'pointer';
            downArrow.addEventListener('click', () => this.moveQuestionDown(question.id));

            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'Supprimer';
            deleteButton.addEventListener('click', () => {
                if (confirm(`Êtes-vous sûr de vouloir supprimer la question : "${question.text}" ?`)) {
                    this.deleteQuestion(question.id);
                }
            });

            li.appendChild(questionText);
            li.appendChild(questionPoints);
            li.appendChild(upArrow);
            li.appendChild(downArrow);
            li.appendChild(deleteButton);
            container.appendChild(li);
        });
    }

    saveToFile() {
        const formattedData = {
            questions: this.questionHandler.getAllQuestions().map((question) => ({
                id: question.id,
                text: `${question.text}`,
                points: question.points
            })),
            students: [] // Réservé pour des données supplémentaires si nécessaire
        };
        const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(formattedData, null, 2));
        const downloadAnchor = document.createElement('a');
        const name = document.getElementById('bareme-name').value;
        downloadAnchor.setAttribute("href", dataStr);
        downloadAnchor.setAttribute("download", `${name !== '' ? name : 'unnamed'}.json`);
        document.body.appendChild(downloadAnchor);
        downloadAnchor.click();
        document.body.removeChild(downloadAnchor);
    }

    loadFromFile() {
        const fileInput = document.createElement('input');
        fileInput.type = 'file';
        fileInput.accept = 'application/json';
        fileInput.addEventListener('change', (event) => {
            const file = event.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = (e) => {
                    try {
                        const data = JSON.parse(e.target.result);
                        this.questionHandler.initializeFromJSON(data); // Utilisation de initializeFromJSON
                        this.renderQuestions();
                    } catch (error) {
                        alert('Erreur lors du chargement du fichier JSON : ' + error.message);
                    }
                };
                reader.readAsText(file);
            }
        });
        fileInput.click();
    }
}
// Initialisation
const createScaleHandler = new CreateScaleHandler();
createScaleHandler.initialize();