document.addEventListener('DOMContentLoaded', () => {
    const gradeForm = document.getElementById('gradeForm');
    const resultDiv = document.getElementById('result');
    const studentsList = document.getElementById('students');
    let students = [];

    gradeForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const studentName = document.getElementById('studentName').value;
        const exam1 = parseFloat(document.getElementById('exam1').value);
        const exam2 = parseFloat(document.getElementById('exam2').value);
        
        const average = calculateAverage(exam1, exam2);
        const status = average >= 60 ? 'Geçti' : 'Kaldı';
        const grade = getLetterGrade(average);
        
        const student = {
            name: studentName,
            exam1: exam1,
            exam2: exam2,
            average: average,
            status: status,
            grade: grade
        };
        
        students.push(student);
        displayResult(student);
        updateStudentList();
        gradeForm.reset();
    });

    function calculateAverage(exam1, exam2) {
        return (exam1 * 0.4) + (exam2 * 0.6);
    }

    function getLetterGrade(average) {
        if (average >= 90) return 'AA';
        if (average >= 85) return 'BA';
        if (average >= 80) return 'BB';
        if (average >= 75) return 'CB';
        if (average >= 70) return 'CC';
        if (average >= 65) return 'DC';
        if (average >= 60) return 'DD';
        return 'FF';
    }

    function displayResult(student) {
        const resultClass = student.status === 'Geçti' ? 'result-success' : 'result-fail';
        resultDiv.innerHTML = `
            <div class="alert alert-info">
                <h4>${student.name}</h4>
                <p>Vize: ${student.exam1}</p>
                <p>Final: ${student.exam2}</p>
                <p>Ortalama: ${student.average.toFixed(2)}</p>
                <p>Harf Notu: ${student.grade}</p>
                <p class="${resultClass}">Durum: ${student.status}</p>
            </div>
        `;
    }

    function updateStudentList() {
        studentsList.innerHTML = '';
        students.forEach((student, index) => {
            const li = document.createElement('li');
            li.className = 'list-group-item student-item';
            li.innerHTML = `
                <span>${student.name} - Ortalama: ${student.average.toFixed(2)} - ${student.grade} - Durum: ${student.status} </span>
                <span class="delete-btn" onclick="deleteStudent(${index})">❌</span>
            `;
            studentsList.appendChild(li);
        });
    }

    window.deleteStudent = function(index) {
        students.splice(index, 1);
        updateStudentList();
    };
});