const questions = [];
const POINTS_RANGE = { min: 1, max: 100 };

function renderQuestions() {
    const container = document.getElementById('questions-container');
    container.innerHTML = '';
    questions.forEach((question, index) => {
        const li = document.createElement('li');

        const questionText = document.createElement('div');
        questionText.classList.add('question-text');
        questionText.textContent = `${question.text}`;

        const questionPoints = document.createElement('div');
        questionPoints.classList.add('question-points');
        questionPoints.textContent = `${question.points} points`;

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Supprimer';
        deleteButton.addEventListener('click', () => {
            if (confirm(`Êtes-vous sûr de vouloir supprimer la question : \"${question.text}\" ?`)) {
                deleteQuestion(index);
            }
        });

        li.appendChild(questionText);
        li.appendChild(questionPoints);
        li.appendChild(deleteButton);
        container.appendChild(li);
    });
}

function addQuestion() {
    const questionInput = document.getElementById('question');
    const pointsInput = document.getElementById('points');
    const questionText = questionInput.value.trim();
    const pointsValue = parseInt(pointsInput.value, 10);

    if (questions.some(q => q.text === questionText)) {
        alert('Cette question existe déjà. Veuillez entrer une question différente.');
        return;
    }

    if (questionText && !isNaN(pointsValue) && pointsValue >= POINTS_RANGE.min && pointsValue <= POINTS_RANGE.max) {
        questions.push({ id: generateUniqueId(), text: questionText, points: pointsValue });
        questionInput.value = '';
        pointsInput.value = '';
        renderQuestions();
        questionInput.focus();
    } else {
        alert(`Veuillez entrer une question valide et un nombre de points entre ${POINTS_RANGE.min} et ${POINTS_RANGE.max}.`);
    }
}

function deleteQuestion(index) {
    questions.splice(index, 1);
    renderQuestions();
}

function saveToFile() {
    const formattedData = {
        questions: questions.map((question, index) => ({
            id: question.id,
            text: `${question.text}`,
            points: question.points
        })),
        students: []
    };
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(formattedData, null, 2));
    const downloadAnchor = document.createElement('a');
    const name = document.getElementById('bareme-name').value;
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download",`${name !== '' ? name : 'unnamed'}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    document.body.removeChild(downloadAnchor);
}

function loadFromFile() {
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
                    if (Array.isArray(data.questions)) {
                        questions.length = 0; // Clear existing questions
                        data.questions.forEach((question) => {
                            questions.push({ id: question.id || generateUniqueId(), text: question.text, points: question.points });
                        });
                        renderQuestions();
                    } else {
                        alert('Le fichier JSON ne contient pas de section "questions" valide.');
                    }
                } catch (error) {
                    alert('Erreur lors du chargement du fichier JSON : ' + error.message);
                }
            };
            reader.readAsText(file);
        }
    });
    fileInput.click();
}

function generateUniqueId() {
    return '_' + Math.random().toString(36).substr(2, 9);
}

document.getElementById('add-question').addEventListener('click', addQuestion);
['question', 'points'].forEach(id => {
    document.getElementById(id).addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
            addQuestion();
        }
    });
});
document.getElementById('save-questions').addEventListener('click', saveToFile);
document.getElementById('load-scale').addEventListener('click', loadFromFile);
