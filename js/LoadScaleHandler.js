class LoadScaleHandler {
    constructor() {
        this.questionHandler = new QuestionHandler(); // Gérer les questions du barème
        this.students = []; // Liste des élèves notés
    }

    initialize() {
        document.getElementById('load-bareme').addEventListener('click', () => this.loadScale());
        document.getElementById('next-button').addEventListener('click', (event) => {
            event.preventDefault();
            this.nextStudent();
        });
        document.getElementById('save-button').addEventListener('click', () => this.downloadResults());
        document.getElementById('generate-button').addEventListener('click', () => this.generateStudentTables());

        // Passer à l'élève suivant avec la touche "Entrée"
        document.addEventListener('keydown', (event) => {
            if (event.key === 'Enter') {
                event.preventDefault();
                this.nextStudent();
                document.getElementById('student-name').focus();
            }
        });
    }

    loadScale() {
        const fileInput = document.getElementById('upload-json');
        const file = fileInput.files[0];

        if (file && file.type === 'application/json') {
            const reader = new FileReader();
            reader.onload = (event) => {
                try {
                    const data = JSON.parse(event.target.result);
                    this.initializeFromData(data);
                } catch (error) {
                    alert('Erreur lors du chargement du fichier JSON : ' + error.message);
                }
            };
            reader.readAsText(file);
        } else {
            alert('Veuillez sélectionner un fichier JSON valide.');
        }
    }

    initializeFromData(data) {
        if (data.questions) {
            this.questionHandler.initializeFromJSON(data);
            this.populateQuestions(this.questionHandler.getAllQuestions());
        } else {
            alert('Le fichier JSON ne contient pas de questions valides.');
        }

        if (data.students) {
            this.initializeStudentsFromJSON(data.students);
            this.renderStudents('students-list');
        }
    }

    populateQuestions(questions) {
        const form = document.getElementById('bareme-form');
        const questionsContainer = document.getElementById('questions-container');

        questionsContainer.innerHTML = '';

        if (questions.length > 0) {
            const table = document.createElement('table');
            table.classList.add('questions-table');

            const thead = document.createElement('thead');
            thead.innerHTML = `
                <tr>
                    <th>Question</th>
                    <th>Points Max</th>
                    <th>Points Obtenus</th>
                </tr>`;
            table.appendChild(thead);

            const tbody = document.createElement('tbody');
            questions.forEach((question) => {
                const row = document.createElement('tr');

                const questionCell = document.createElement('td');
                questionCell.textContent = question.text;

                const pointsCell = document.createElement('td');
                pointsCell.textContent = question.points;

                const inputCell = document.createElement('td');
                const questionInput = document.createElement('input');
                questionInput.type = 'number';
                questionInput.name = question.id;
                questionInput.placeholder = '0';
                questionInput.min = 0;
                questionInput.max = question.points;
                inputCell.appendChild(questionInput);

                row.appendChild(questionCell);
                row.appendChild(pointsCell);
                row.appendChild(inputCell);
                tbody.appendChild(row);
            });

            table.appendChild(tbody);
            questionsContainer.appendChild(table);

            form.classList.remove('hidden');
        }
    }

    saveStudentData() {
        const studentName = document.getElementById('student-name').value.trim();
        const studentComment = document.getElementById('comments').value.trim();
        const questionInputs = document.querySelectorAll('#questions-container input[type="number"]:not([disabled])');

        if (!studentName) {
            alert("Veuillez entrer le nom de l'élève.");
            return;
        }

        const answers = Array.from(questionInputs).map(input => ({
            question: input.name,
            points: parseFloat(input.value) || 0
        }));

        const totalPoints = answers.reduce((sum, answer) => sum + answer.points, 0);

        this.addOrUpdateStudent(studentName, totalPoints, answers, studentComment);
        this.sortStudentsAlphabetically();
        this.renderStudents('students-list');
        this.clearFormValues();
    }

    initializeStudentsFromJSON(students) {
        if (!Array.isArray(students)) {
            throw new Error('Le format JSON pour les élèves est invalide.');
        }

        this.students = students.map(student => ({
            studentName: student.studentName,
            totalPoints: student.totalPoints || 0,
            answers: student.answers || [],
            comment: student.comment || ''
        }));
    }

    addOrUpdateStudent(studentName, totalPoints, answers, comment) {
        const existingIndex = this.students.findIndex(s => s.studentName === studentName);

        if (existingIndex !== -1) {
            this.students[existingIndex] = { studentName, totalPoints, answers, comment };
        } else {
            this.students.push({ studentName, totalPoints, answers, comment });
        }
    }

    sortStudentsAlphabetically() {
        this.students.sort((a, b) => a.studentName.localeCompare(b.studentName));
    }

    renderStudents(containerId) {
        const container = document.getElementById(containerId);
        container.innerHTML = '';

        const totalStudentsDiv = document.createElement('input');
        totalStudentsDiv.classList.add('student-list-header');
        totalStudentsDiv.type = 'text';
        totalStudentsDiv.value = `${this.students.length} élèves corrigés`;
        totalStudentsDiv.disabled = true;
        container.appendChild(totalStudentsDiv);

        this.students.forEach(student => {
            const studentItem = document.createElement('div');
            studentItem.classList.add('student-item');

            const nameDiv = document.createElement('div');
            nameDiv.textContent = student.studentName;

            const pointsInput = document.createElement('input');
            pointsInput.type = 'text';
            pointsInput.value = `${student.totalPoints} points`;
            pointsInput.disabled = true;

            const editButton = document.createElement('button');
            editButton.textContent = 'Éditer';
            editButton.addEventListener('click', () => {
                this.editStudent(student.studentName);
            });

            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'Supprimer';
            deleteButton.addEventListener('click', () => {
                this.deleteStudent(student.studentName);
                this.renderStudents(containerId);
            });

            studentItem.appendChild(nameDiv);
            studentItem.appendChild(pointsInput);
            studentItem.appendChild(editButton);
            studentItem.appendChild(deleteButton);
            container.appendChild(studentItem);
        });
    }

    editStudent(studentName) {
        const student = this.students.find(s => s.studentName === studentName);

        if (!student) {
            alert(`Impossible de trouver l'élève : ${studentName}`);
            return;
        }

        document.getElementById('student-name').value = student.studentName;
        document.getElementById('comments').value = student.comment || '';

        const questionInputs = document.querySelectorAll('#questions-container input[type="number"]:not([disabled])');
        questionInputs.forEach(input => {
            const answer = student.answers.find(a => a.question === input.name);
            input.value = answer ? answer.points : '';
        });
    }

    deleteStudent(studentName) {
        const confirmation = confirm(`Êtes-vous sûr de vouloir supprimer l'élève "${studentName}" ?`);
        if (!confirmation) return;

        this.students = this.students.filter(student => student.studentName !== studentName);
    }

    nextStudent() {
        const studentName = document.getElementById('student-name').value.trim();
        const studentComment = document.getElementById('comments').value.trim();
        const questionInputs = document.querySelectorAll('#questions-container input[type="number"]:not([disabled])');
    
        if (!studentName) {
            alert("Veuillez entrer le nom de l'élève avant de passer au suivant.");
            return;
        }
    
        const answers = Array.from(questionInputs).map(input => ({
            question: input.name,
            points: parseFloat(input.value) || 0
        }));

        const totalPoints = answers.reduce((sum, answer) => sum + answer.points, 0);

        this.addOrUpdateStudent(studentName, totalPoints, answers, studentComment);
        this.sortStudentsAlphabetically();
        this.renderStudents('students-list');
        this.clearFormValues();
    }    

    clearFormValues() {
        console.log('hi');
        document.getElementById('student-name').value = '';
        document.getElementById('comments').value = '';
        const questionInputs = document.querySelectorAll('#questions-container input[type="number"]:not([disabled])');
        questionInputs.forEach(input => input.value = '');
    }

    downloadResults() {
        const outputData = {
            questions: this.questionHandler.getAllQuestions(),
            students: this.students
        };
        const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(outputData, null, 2));
        const downloadAnchor = document.createElement('a');
        downloadAnchor.setAttribute("href", dataStr);
        downloadAnchor.setAttribute("download", "resultats_eleves.json");
        document.body.appendChild(downloadAnchor);
        downloadAnchor.click();
        document.body.removeChild(downloadAnchor);
    }

    generateStudentTables() {
        if (!this.students.length || !this.questionHandler.getAllQuestions().length) {
            alert("Impossible de générer les tableaux : les élèves ou les questions sont manquants.");
            return;
        }
    
        const htmlContent = this.students.map(student => {
            const tableRows = student.answers.map(answer => {
                const questionData = this.questionHandler.getAllQuestions().find(q => q.id === answer.question);
                const questionText = questionData ? questionData.text : 'Question inconnue';
                const pointsMax = questionData ? questionData.points : 'N/A';
    
                return `
                    <tr>
                        <td>${questionText}</td>
                        <td>${answer.points}</td>
                        <td>${pointsMax}</td>
                    </tr>`;
            }).join('');
    
            return `
                <table border="1" style="border-collapse: collapse; width: 100%; margin-bottom: 20px;">
                    <caption style="font-weight: bold; text-align: left; margin-bottom: 10px;">
                        Résultats de ${student.studentName}
                    </caption>
                    <thead>
                        <tr>
                            <th>Question</th>
                            <th>Points Obtenus</th>
                            <th>Points Max</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${tableRows}
                        <tr>
                            <td><strong>Total</strong></td>
                            <td><strong>${student.totalPoints}</strong></td>
                            <td><strong>${this.questionHandler.getAllQuestions().reduce((sum, question) => sum + question.points, 0)}</strong></td>
                        </tr>
                        <tr>
                            <td colspan="3">
                                <em>${student.comment.replace(/\n/g, '<br>') || 'Aucun'}</em>
                            </td>
                        </tr>
                    </tbody>
                </table>`;
        }).join('');
    
        const fullHtml = `
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Récapitulatif des Résultats</title>
                <style>
                    body {
                        font-family: Arial, sans-serif;
                        line-height: 1.6;
                        background-color: #f9f9f9;
                        color: #333;
                        width : 35%;
                        margin : auto;
                    }
    
                    table {
                        width: 100%;
                        border-collapse: collapse;
                        margin-bottom: 20px;
                        background-color: #fff;
                        box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
                    }
    
                    caption {
                        font-weight: bold;
                        text-align: left;
                        margin-bottom: 10px;
                        font-size: 1.2rem;
                        padding: 10px;
                        color: #222;
                    }
    
                    th, td {
                        padding: 10px;
                        border: 1px solid #ddd;
                    }
    
                    th {
                        background-color: #6200ea;
                        color: #fff;
                    }
    
                    td {
                        background-color: #f9f9f9;
                    }
    
                    td:nth-child(2), td:nth-child(3), th {
                        text-align: center;
                    }
    
                    tr:nth-child(even) td {
                        background-color: #f3f3f3;
                    }
    
                    tr:last-child td {
                        font-weight: bold;
                        background-color: #f1f1f1;
                    }
    
                    em {
                        font-style: italic;
                        color: #555;
                    }
                </style>
            </head>
            <body>
                ${htmlContent}
            </body>
            </html>`;
    
        const blob = new Blob([fullHtml], { type: 'text/html' });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = 'recapitulatif_resultats.html';
        link.click();
    }    
}

// Initialisation
const loadScaleHandler = new LoadScaleHandler();
loadScaleHandler.initialize();