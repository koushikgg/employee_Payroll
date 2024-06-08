const addUser = document.getElementById('adduserpage');
console.log(addUser);
addUser.addEventListener('click', () => {
    window.open('http://127.0.0.1:5500/AddPage.html');
});

let table = document.querySelector('.main-dashborad-table-cnt');
let tbody = document.getElementById('table-body')
console.log(tbody)
let userNotFound = document.getElementById('message-display')

function createRow(element){
    newRow=`
                <td id="reading1-img"><img src="${element.profile}" alt=""></td>
                <td>${element.name}</td>
                <td>${element.gender}</td>
                <td id="reading1-dep">${element.department.map(value => `<p>${value}</p>`)}</td>
                <td><i class="fa fa-inr" aria-hidden="true"></i>${element.salary}</td>
                <td><p>${element.startDate}</p></td>
                <td id="reading1-actions">
                    <i id='btn1-action' class="fa fa-trash" aria-hidden="true" onclick="deleteOption('${element.name}')"></i>
                    <i id='btn1-action' class="fa fa-pencil" aria-hidden="true" onclick="updateOption('${element.name}')"></i>
                </td>`;
    return newRow
}

document.addEventListener('DOMContentLoaded', function () {

    let employeeData = JSON.parse(localStorage.getItem('employeeData'))
    let totalEmployees = 0;
    let table = document.getElementById('table')
    if (employeeData.length == 0) {
        table.style.display = "none"
        let message = document.createElement('p');
        message.innerHTML = `<p>No Employee Registered</p>`;
        document.getElementById('message-display').appendChild(message);
    } else {

        employeeData.map(element => {
            let newRow = document.createElement('tr');
            totalEmployees++;
            newRow.innerHTML = createRow(element);

            document.querySelector('#table-body').appendChild(newRow);
        });
        let totalemp = document.createElement('p');
        totalemp.innerHTML = `<p>(${totalEmployees})</p>`;
        document.getElementById('employee').appendChild(totalemp);
    }

    const search = document.getElementById('search-inp');
    search.addEventListener('keyup', () => {
        let searchValue = search.value;
        let filteredEmployee = employeeData.filter(user => {
            if (user.name.includes(searchValue)) {
                return user
            }
            if (user.gender.toLowerCase().includes(searchValue)) {
                return user
            }   
            for (let dept of user.department){
                if (dept.toLowerCase().includes(searchValue)){
                    return user;
                }
            }
        })
        if (filteredEmployee.length == 0) {
            table.style.visibility = 'hidden';
            userNotFound.innerHTML = 'User Not Found'
            userNotFound.style.display='block'
        }
        else {
            tbody.innerHTML = ``;
            userNotFound.style.display='none';
            table.style.visibility = 'visible';
            filteredEmployee.map(element => {
                let searchRow = document.createElement('tr');
                searchRow.innerHTML = createRow(element);

                document.querySelector('#table-body').appendChild(searchRow);
            })
        }


    })
    let cancel =  document.querySelector('.fa-times-circle');
    cancel.addEventListener('click',()=>{
        search.value='';
        table.style.visibility='visible';
        tbody.innerHTML=``;
        userNotFound.style.display='none'
        employeeData.map(element => {
            let newRow = document.createElement('tr');
            totalEmployees++;
            newRow.innerHTML = createRow(element);

            document.querySelector('#table-body').appendChild(newRow);
        });
    })

});

function deleteOption(name) {
    let employeeData = JSON.parse(localStorage.getItem('employeeData'))
    window.open('http://127.0.0.1:5500/Dashboard.html');
    updatedList = employeeData.filter(userData => userData.name != name)
    localStorage.removeItem('employeeData');
    localStorage.setItem('employeeData', JSON.stringify(updatedList))
}



function updateOption(name) {
    let employeeData = JSON.parse(localStorage.getItem('employeeData'))
    editData = employeeData.find(employee => employee.name == name);
    editStorage = []
    editStorage.push(editData)
    console.log(editStorage);
    localStorage.setItem('editFile', JSON.stringify(editStorage))
    // Form.reset();
    window.open('http://127.0.0.1:5500/AddPage.html');
}

