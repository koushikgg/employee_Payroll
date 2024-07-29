
const cancel = document.getElementById('cancel-button');
cancel.addEventListener('click', () => {
    window.open('http://127.0.0.1:5500/Dashboard.html');
});

const home = document.getElementById('home-button');
home.addEventListener('click', () => {
    window.open('http://127.0.0.1:5500/Dashboard.html');
});

async function postData(url, data) {
    try {
        const response = await fetch(url, {
            method: 'POST', // Specify the HTTP method
            headers: {
                'Content-Type': 'application/json', // Specify content type
            },
            body: JSON.stringify(data), // Convert the data object to a JSON string
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const responseData = await response.json(); // Parse JSON response
        return responseData;
    } catch (error) {
        console.error('Error posting data:', error);
        throw error;
    }
}

async function updateData(url, data) {
    try {
        const response = await fetch(url, {
            method: 'PUT', // Use PUT for updating data
            headers: {
                'Content-Type': 'application/json', // Specify content type
            },
            body: JSON.stringify(data), // Convert the data object to a JSON string
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const responseData = await response.json(); // Parse JSON response
        return responseData;
    } catch (error) {
        console.error('Error updating data:', error);
        throw error;
    }
}


// let empNotes = document.getElementById('note')
let errorName = document.getElementById('error-display');

function checkCharacters(input) {
    var regex = /^[a-zA-Z]+$/;
    return regex.test(input)
}


document.addEventListener('DOMContentLoaded', () => {
    var editEmpId = 0;
    let empName = document.getElementById('input-name')
    let empProfile = document.querySelector("input[name='profile']:checked")
    let empGender = document.querySelector("input[name='gender']:checked")
    let empDepartment = Array.from(document.querySelectorAll("input[name='dep']:checked")).map(item => item.value)
    let empSalary = document.getElementById("salary")
    let empDay = document.getElementById("day")
    let empMonth = document.getElementById("month")
    let empYear = document.getElementById("year")
    let empNotes = document.getElementById('note')

    let editData = JSON.parse(localStorage.getItem('editFile'));
    console.log(editData);
    if (editData) {
        editData.forEach(empToEdit => {
            console.log(empToEdit);
            empName.value = empToEdit.name

            let refEmpProfile = document.querySelectorAll(".profile-photo")
            refEmpProfile.forEach(radios => {
                if (radios.value == empToEdit.profile) {
                    radios.checked = true;
                }
            })

            let refEmpGender = document.querySelectorAll(".genderValue")
            refEmpGender.forEach(radios => {
                if (radios.value == empToEdit.gender) {
                    radios.checked = true;
                }
            })

            let refEmpDep = document.querySelectorAll(".depValue")
            console.log(refEmpDep);
            refEmpDep.forEach(refDep => {
                for (let dept of empToEdit.department) {
                    if (refDep.value == dept) {
                        refDep.checked = true;
                    }
                }
            })

            empSalary.value = empToEdit.salary;
            empDay.value = empToEdit.day;
            empMonth.value = empToEdit.month;
            empYear.value = empToEdit.year;
            empNotes.value = empToEdit.notes
            editEmpId = empToEdit.id
            console.log(editEmpId);
        })
        localStorage.removeItem('editFile');
    };

    function recallValue() {
        return editEmpId
    }

    const submit = document.getElementById('btn1');
    submit.addEventListener('click', (submision) => {
        submision.preventDefault();
        // console.log(empName.value);
        var idCheck = recallValue();

        let empName = document.getElementById('input-name')
        let empProfile = document.querySelector("input[name='profile']:checked")
        let empGender = document.querySelector("input[name='gender']:checked")
        let empDepartment = Array.from(document.querySelectorAll("input[name='dep']:checked")).map(item => item.value)
        let empSalary = document.getElementById("salary")
        let empDay = document.getElementById("day")
        let empMonth = document.getElementById("month")
        let empYear = document.getElementById("year")
        let empNotes = document.getElementById('note')

        if (!checkCharacters(empName.value)) {
            errorName.style.visibility = "visible";
            setTimeout(() => {
                errorName.style.visibility = "hidden";
            }, 4000);
            return
        }
        // console.log(empProfile)
        // console.log(empSalary.value);
        if (!empProfile?.value) {
            alert('Please Select the Profile');
            return
        }
        // console.log(empGender.value);
        if (!(empGender)) {
            alert('Please Select the Gender');
            return
        }
        // console.log(empDepartment)
        if (empDepartment.length == 0) {
            alert('Please Select the Department');
            return
        }
        // console.log(empSalary);
        if (!(empSalary.value)) {
            alert('Please Select the Salary');
            return
        }
        // console.log(empDay.value);
        if (!(empDay.value)) {
            alert('Please Select the Start Date day');
            return
        }
        if (!(empMonth.value)) {
            alert('Please Select the Start Date Month');
            return
        }
        if (!(empYear.value)) {
            alert('Please Select the Start Date Year');
            return
        }
        let storageOfData = JSON.parse(localStorage.getItem('employeeData')) || [];
        let condition = true;
        storageOfData = storageOfData.map(newitem => {
            console.log(idCheck);
            if (newitem.id == idCheck) {
                condition = false
                console.log(newitem.id)
                let newData = {
                    name: empName.value,
                    profile: empProfile.value,
                    gender: empGender.value,
                    department: empDepartment,
                    salary: empSalary.value,
                    day: empDay.value,
                    month: empMonth.value,
                    year: empYear.value,
                    id: `${idCheck}`,
                    startDate: empDay.value + " " + empMonth.value + " " + empYear.value,
                    notes: empNotes.value
                }
                return newData
            }
            // form.reset();
            return newitem
        })


        if (condition) {
            let count = JSON.parse(localStorage.getItem('count')) || 0;
            count += 1;
            let data = {
                name: empName.value,
                profile: empProfile.value,
                gender: empGender.value,
                department: empDepartment,
                salary: empSalary.value,
                day: empDay.value,
                month: empMonth.value,
                year: empYear.value,
                id: `${count}`,
                startDate: empDay.value + " " + empMonth.value + " " + empYear.value,
                notes: empNotes.value
            }
            localStorage.setItem('count', JSON.stringify(count));
            console.log('added new');
            storageOfData.push(data);
            postData('http://localhost:3000/profiles', data)
        }
        // inputcheck()
        if (idCheck) {
            let updatedData = {
                id: idCheck,
                name: empName.value,
                profile: empProfile.value,
                gender: empGender.value,
                department: empDepartment,
                salary: empSalary.value,
                day: empDay.value,
                month: empMonth.value,
                year: empYear.value,
                startDate: empDay.value + " " + empMonth.value + " " + empYear.value,
                notes: empNotes.value
            }
            updateData(`http://localhost:3000/profiles/${idCheck}`, updatedData)
            localStorage.removeItem('editFile');
        }
        localStorage.setItem("employeeData", JSON.stringify(storageOfData));
        window.open('http://127.0.0.1:5500/Dashboard.html');
    })

    reset = document.getElementById('btn2')
    reset.addEventListener('click', () => {
        formReset.reset();
    })
});