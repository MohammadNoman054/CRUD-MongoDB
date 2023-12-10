async function addEmployee() {
    const id = document.getElementById('id').value;
    const name = document.getElementById('name').value;
    const role = document.getElementById('role').value;
    const salary = document.getElementById('salary').value;
    if (id === '' || name === '' || role === '' || salary === '') {
        alert('Empty Field!');
    } else {
        const response = await fetch('http://localhost:3000/api/employees', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ id, name, role, salary }),
        });

        if (response.ok) {
            clearForm();
            loadEmployees();
        } else {
            alert('Failed to add employee');
        }
    }
}
async function deleteEmployee(id) {
    const response = await fetch(`http://localhost:3000/api/employees/${id}`, {
        method: 'DELETE',
    });

    if (response.ok) {
        clearForm();
        loadEmployees();
    } else {
        alert('Failed to delete employee');
    }
}

function editEmployee(id, name, role, salary) {
    document.getElementById('id').value = id;
    document.getElementById('name').value = name;
    document.getElementById('role').value = role;
    document.getElementById('salary').value = salary;

    document.getElementById('saveBtn').style.display = 'inline-block';
}


async function saveEmployee() {
    const id = document.getElementById('id').value;
    const name = document.getElementById('name').value;
    const role = document.getElementById('role').value;
    const salary = document.getElementById('salary').value;

    const response = await fetch(`http://localhost:3000/api/employees/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id, name, role, salary }),
    });

    if (response.ok) {
        loadEmployees();
    } else {
        alert('Failed to update employee');
    }
    document.getElementById('saveBtn').style.display = 'none';
    clearForm();
}


function clearForm() {
    document.getElementById('id').value = '';
    document.getElementById('name').value = '';
    document.getElementById('role').value = '';
    document.getElementById('salary').value = '';
}

async function loadEmployees() {
    const response = await fetch('http://localhost:3000/api/employees');
    const employees = await response.json();

    const tableBody = document.getElementById('employeeList');
    tableBody.innerHTML = '';

    employees.forEach(employee => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${employee.id}</td>
            <td>${employee.name}</td>
            <td>${employee.role}</td>
            <td>${employee.salary}</td>
            <td>
                <button onclick="editEmployee('${employee.id}', '${employee.name}', '${employee.role}', '${employee.salary}')">Edit</button>
                <button onclick="deleteEmployee('${employee.id}')">Delete</button>
            </td>
        `;
        tableBody.appendChild(row);
    });
}

loadEmployees();