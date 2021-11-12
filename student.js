const fs = require('fs')

const addStudent = (id, name, subject, grade, comment) => {
    const students = loadStudents()
    const duplicateIds = students.filter((student) => {
        return student.id === id
    })
    if (duplicateIds.length === 0) {
        if (!comment) {
            students.push({
                id,
                name,
                subject,
                grade
            })
        }
        else{
            students.push({
                id,
                name,
                subject,
                grade,
                comment
            })
        }
        saveStudents(students)
        console.log('Saved Successfully')
    }
    else {
        console.log('Error Duplicate Ids')
    }


}

const loadStudents = () => {
    try {
        const dataBuffer = fs.readFileSync('students.json').toString()
        return JSON.parse(dataBuffer)
    }
    catch (e) {
        return []
    }
}

const saveStudents = (students) => {
    const saveData = JSON.stringify(students) 
    fs.writeFileSync('students.json', saveData)
}

const removeStudent = (id) => {
    const students = loadStudents()

    const studentsToKeep = students.filter((student) => {
        return student.id !== id
    })
    
    saveStudents(studentsToKeep)
}

const readStudent = (id) => {
    const students = loadStudents()
    const student = students.find((student) => {
    
        return student.id === id
    })
    if (student) {
        console.log(student);

    }
    else {
        console.log('Not found')
    }
}

const listStudent = () => {
    const students = loadStudents()
    students.forEach((student) => {
        console.log({
            name:student.name,
            grade:student.grade
        });
    })
}

module.exports = {
    addStudent,
    removeStudent,
    readStudent,
    listStudent
}