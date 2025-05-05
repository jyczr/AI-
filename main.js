let currentUser = null;

function saveToLocalStorage(key, data) {
    localStorage.setItem(key, JSON.stringify(data));
}

function loadFromLocalStorage(key, defaultValue) {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : defaultValue;
}

function updateTable(tableBodyId, data, createRowCallback) {
    const tableBody = document.getElementById(tableBodyId);
    if (tableBody) {
        tableBody.innerHTML = '';
        data.forEach((item, index) => {
            const row = createRowCallback(item, index);
            tableBody.appendChild(row);
        });
    }
}

function validateForm(inputs, callback) {
    const missingFields = inputs.filter(([id, name]) => !document.getElementById(id).value);
    if (missingFields.length > 0) {
        alert(`請填寫：${missingFields.map(([, name]) => name).join(', ')}`);
        return false;
    }
    callback();
    return true;
}

function switchContent(sectionId) {
    document.querySelectorAll('.content-section').forEach(section => {
        section.classList.remove('active');
    });
    const section = document.getElementById(sectionId);
    if (section) {
        section.classList.add('active');
    }
}

document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('welcomeSection').style.display = 'block';
    LoginModule.init();
});