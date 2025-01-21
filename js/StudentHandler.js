class StudentHandler {
    constructor() {
        this.students = [];
    }

    initializeFromJSON(students) {
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

    deleteStudent(studentName) {
        this.students = this.students.filter(student => student.studentName !== studentName);
    }

    getAllStudents() {
        return [...this.students]; // Retourne une copie pour éviter toute modification externe
    }

    getStudentByName(studentName) {
        return this.students.find(student => student.studentName === studentName) || null;
    }

    clearStudents() {
        this.students = [];
    }
}