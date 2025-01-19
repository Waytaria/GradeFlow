const studentResults = [];
let data = {};
let currentStudentIndex = null;

document.getElementById('load-bareme').addEventListener('click', () => {
    const fileInput = document.getElementById('upload-json');
    const file = fileInput.files[0];

    if (file && file.type === 'application/json') {
        const reader = new FileReader();
        reader.onload = (event) => {
            try {
                data = JSON.parse(event.target.result);
                initializeFromData(data);
            } catch (error) {
                alert('Erreur lors du chargement du fichier JSON : ' + error.message);
            }
        };
        reader.readAsText(file);
    } else {
        alert('Veuillez sélectionner un fichier JSON valide.');
    }
});

function populateForm(questions) {
    const form = document.getElementById('bareme-form');
    const questionsContainer = document.getElementById('questions-container');

    questionsContainer.innerHTML = '';

    if (Array.isArray(questions) && questions.length > 0) {
        const table = document.createElement('table');
        table.classList.add('questions-table');
        
        const thead = document.createElement('thead');
        const headerRow = document.createElement('tr');
        headerRow.innerHTML = `
            <th>Question</th>
            <th>Points Max</th>
            <th>Points Obtenus</th>
        `;
        thead.appendChild(headerRow);
        table.appendChild(thead);

        const tbody = document.createElement('tbody');
        questions.forEach((question, index) => {
            const row = document.createElement('tr');

            const questionCell = document.createElement('td');
            questionCell.textContent = question.text;
            questionCell.classList.add('question-text');

            const pointsCell = document.createElement('td');
            pointsCell.textContent = question.points;
            pointsCell.classList.add('question-points');

            const inputCell = document.createElement('td');
            const questionInput = document.createElement('input');
            questionInput.type = 'number';
            questionInput.name = `${question.id}`;
            questionInput.placeholder = 'Points obtenus';
            questionInput.min = 0;
            questionInput.max = question.points;
            inputCell.classList.add('question-max');
            inputCell.appendChild(questionInput);

            row.appendChild(questionCell);
            row.appendChild(pointsCell);
            row.appendChild(inputCell);
            tbody.appendChild(row);
        });

        const totalRow = document.createElement('tr');
        totalRow.innerHTML = `
            <td colspan="2"></td>
            <td class="question-max"><input type="text" id="total-points" value="0" disabled style="text-align: center; font-weight: bold;"></td>
        `;
        tbody.appendChild(totalRow);

        table.appendChild(tbody);
        questionsContainer.appendChild(table);

        if (!questionsContainer.dataset.eventAttached) {
            questionsContainer.addEventListener('input', updateTotalPoints);
            questionsContainer.dataset.eventAttached = true;
        }

        form.classList.remove('hidden');
    } else {
        alert('Le fichier JSON ne contient pas de questions valides.');
    }
}

function updateTotalPoints() {
    const questionInputs = document.querySelectorAll('#questions-container input[type="number"]:not([disabled])');
    let total = 0;

    questionInputs.forEach((input) => {
        total += parseInt(input.value) || 0;
    });

    const totalInput = document.getElementById('total-points');
    totalInput.value = total;
}

function saveStudentData() {
    const studentName = document.getElementById('student-name').value.trim();
    const studentComment = document.getElementById('comments').value.trim();

    if (!studentName) {
        alert("Veuillez entrer le nom de l'élève.");
        return;
    }

    const questionInputs = document.querySelectorAll('#questions-container input[type="number"]:not([disabled])');
    const answers = [];

    questionInputs.forEach((input, index) => {
        answers.push({
            question: input.name,
            points: parseInt(input.value) || 0
        });
    });

    const totalPoints = answers.reduce((sum, answer) => sum + answer.points, 0);

    const existingStudentIndex = studentResults.findIndex(s => s.studentName === studentName);

    if (existingStudentIndex !== -1) {
        studentResults[existingStudentIndex] = { studentName, totalPoints, answers, comment: studentComment };
        updateStudentInList(studentName, totalPoints);
    } else {
        studentResults.push({ studentName, totalPoints, answers, comment: studentComment });
        addStudentToList(studentName, totalPoints);
    }

    clearFormValues();
    updateTotalPoints();
    document.getElementById('student-name').focus();
}

function addStudentToList(name, total) {
    const studentsList = document.getElementById('students-list');

    const existingItems = Array.from(studentsList.children);
    const isStudentPresent = existingItems.some(item => item.querySelector('.student-name').value === name);

    if (!isStudentPresent) {
        const studentItem = document.createElement('li');
        studentItem.classList.add('student-item');

        const studentNameInput = document.createElement('input');
        studentNameInput.type = 'text';
        studentNameInput.value = name;
        studentNameInput.disabled = true;
        studentNameInput.classList.add('student-name');

        const studentPointsInput = document.createElement('input');
        studentPointsInput.type = 'text';
        studentPointsInput.value = `${total} points`;
        studentPointsInput.disabled = true;
        studentPointsInput.classList.add('student-points');

        const editButton = document.createElement('button');
        editButton.textContent = 'Éditer';
        editButton.addEventListener('click', () => editStudent(name));

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Supprimer';
        deleteButton.addEventListener('click', () => deleteStudent(name));

        studentItem.appendChild(studentNameInput);
        studentItem.appendChild(studentPointsInput);
        studentItem.appendChild(editButton);
        studentItem.appendChild(deleteButton);
        studentsList.appendChild(studentItem);
    } else {
        updateStudentInList(name, total);
    }
}

function updateStudentInList(name, total) {
    const studentItems = document.querySelectorAll('.student-item');

    studentItems.forEach(item => {
        const nameInput = item.querySelector('.student-name');
        const pointsInput = item.querySelector('.student-points');

        if (nameInput.value === name) {
            pointsInput.value = `${total}`;
        }
    });
}

function deleteStudent(name) {
    // Remove student from the results array
    const studentIndex = studentResults.findIndex(student => student.studentName === name);
    if (studentIndex !== -1) {
        studentResults.splice(studentIndex, 1);
    }

    // Remove student from the displayed list
    const studentsList = document.getElementById('students-list');
    const studentItems = Array.from(studentsList.children);
    studentItems.forEach(item => {
        const nameInput = item.querySelector('.student-name');
        if (nameInput.value === name) {
            studentsList.removeChild(item);
        }
    });
}

function clearFormValues() {
    document.getElementById('student-name').value = '';
    document.getElementById('comments').value = '';
    const questionInputs = document.querySelectorAll('#questions-container input[type="number"]:not([disabled])');
    questionInputs.forEach(input => input.value = '');
}

function editStudent(name) {
    const student = studentResults.find(s => s.studentName === name);

    if (student) {
        document.getElementById('student-name').value = student.studentName;
        document.getElementById('comments').value = student.comment || '';

        const questionInputs = document.querySelectorAll('#questions-container input[type="number"]:not([disabled])');
        student.answers.forEach((answer, index) => {
            questionInputs[index].value = answer.points;
        });

        updateTotalPoints();
    }
}

function initializeFromData(data) {
    if (data.questions) {
        populateForm(data.questions);
    } else {
        alert('Le fichier JSON ne contient pas de section "questions" valide.');
    }

    if (data.students && Array.isArray(data.students)) {
        data.students.forEach(student => {
            studentResults.push(student);
            addStudentToList(student.studentName, student.totalPoints);
        });
    } else {
        alert('Le fichier JSON ne contient pas de section "students" valide.');
    }
}

function downloadResults() {
    const questions = Array.from(document.querySelectorAll('.question-item')).map(item => {
        const text = item.querySelector('.question-text').textContent;
        const points = item.querySelector('.question-points').value;
        return { text, points: parseInt(points) || 0 };
    });

    const outputData = {
        questions : data.questions,
        students: studentResults
    };
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(outputData, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", "resultats_eleves.json");
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    document.body.removeChild(downloadAnchor);
}

function generateStudentTables() {
    const htmlContent = studentResults.map(student => {
        const tableRows = student.answers.map(answer => {
            console.log(answer);
            const questionData = data.questions.find(q => q.id === answer.question);
            const questionText = questionData ? questionData.text : 'Question inconnue';
            const pointsMax = questionData ? questionData.points : 'N/A';

            return `
                <tr>
                    <td>${questionText}</td>
                    <td>${pointsMax}</td>
                    <td>${answer.points}</td>
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
                        <th>Points Max</th>
                        <th>Points Obtenus</th>
                    </tr>
                </thead>
                <tbody>
                    ${tableRows}
                    <tr>
                        <td><strong>Total</strong></td>
                        <td><strong>${student.totalPoints}</strong></td>
                        <td><strong>${data.questions.reduce((sum, question) => sum + question.points, 0)}</strong></td>
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
        <body style="font-family: Arial, sans-serif; line-height: 1.6;">
            ${htmlContent}
        </body>
        </html>`;

    const blob = new Blob([fullHtml], { type: 'text/html' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'recapitulatif_resultats.html';
    link.click();
}

document.getElementById('save-button').addEventListener('click', downloadResults);
document.getElementById('next-button').addEventListener('click', (event) => {
    event.preventDefault();
    saveStudentData();
});
document.getElementById('generate-button').addEventListener('click', () => {
    generateStudentTables(data);
});