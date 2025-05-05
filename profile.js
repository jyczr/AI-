const ProfileModule = {
    init() {
        this.bindEvents();
    },

    openModal() {
        if (currentUser) {
            document.getElementById('profileUsername').value = currentUser.username;
            const users = loadFromLocalStorage('users', {});
            document.getElementById('profileEmail').value = users[currentUser.username].email || '';
            document.getElementById('profileModal').style.display = 'block';
        }
    },

    save() {
        if (currentUser) {
            const users = loadFromLocalStorage('users', {});
            users[currentUser.username].email = document.getElementById('profileEmail').value;
            saveToLocalStorage('users', users);
            document.getElementById('profileModal').style.display = 'none';
            alert('個人資訊已儲存！');
        }
    },

    bindEvents() {
        document.getElementById('profileBtn').addEventListener('click', () => this.openModal());
        document.getElementById('saveProfileBtn').addEventListener('click', () => this.save());
        document.querySelector('#profileModal .close').addEventListener('click', () => {
            document.getElementById('profileModal').style.display = 'none';
        });
    }
};