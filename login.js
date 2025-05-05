const LoginModule = {
    init() {
        this.checkLoginStatus();
        this.bindEvents();
    },

    checkLoginStatus() {
        currentUser = loadFromLocalStorage('currentUser', null);
        if (currentUser) {
            this.showUserInfo();
            document.getElementById('welcomeSection').style.display = 'none';
            document.getElementById('loginSection').style.display = 'none';
            document.getElementById('registerSection').style.display = 'none';
            document.getElementById('appSection').style.display = 'block';
            document.getElementById('userInfo').style.display = 'block';
            switchContent('recordSection');
            TransactionModule.init();
            ProfileModule.init();
            CategoryModule.init();
            BillModule.init();
            BudgetModule.init();
            GoalModule.init();
            AnalysisModule.init();
            ChartModule.init();
            ExportModule.init();
        } else {
            document.getElementById('welcomeSection').style.display = 'block';
            document.getElementById('appSection').style.display = 'none';
            document.getElementById('userInfo').style.display = 'none';
        }
    },

    showUserInfo() {
        document.getElementById('usernameDisplay').textContent = currentUser.username;
    },

    login() {
        const username = document.getElementById('loginUsername').value;
        const password = document.getElementById('loginPassword').value;
        const users = loadFromLocalStorage('users', {});
        if (users[username] && users[username].password === password) {
            currentUser = { username };
            saveToLocalStorage('currentUser', currentUser);
            this.checkLoginStatus();
        } else {
            alert('使用者名稱或密碼錯誤！');
        }
    },

    register() {
        const username = document.getElementById('registerUsername').value;
        const password = document.getElementById('registerPassword').value;
        if (!username || !password) {
            alert('請填寫使用者名稱和密碼！');
            return;
        }
        const users = loadFromLocalStorage('users', {});
        if (users[username]) {
            alert('此使用者名稱已存在！');
            return;
        }
        users[username] = { password, email: '' };
        saveToLocalStorage('users', users);
        currentUser = { username };
        saveToLocalStorage('currentUser', currentUser);
        this.checkLoginStatus();
    },

    logout() {
        currentUser = null;
        saveToLocalStorage('currentUser', null);
        this.checkLoginStatus();
    },

    bindEvents() {
        document.getElementById('enterSystemBtn').addEventListener('click', () => {
            document.getElementById('welcomeSection').style.display = 'none';
            document.getElementById('loginSection').style.display = 'block';
        });
        document.getElementById('showRegisterBtn').addEventListener('click', () => {
            document.getElementById('loginSection').style.display = 'none';
            document.getElementById('registerSection').style.display = 'block';
        });
        document.getElementById('showLoginBtn').addEventListener('click', () => {
            document.getElementById('registerSection').style.display = 'none';
            document.getElementById('loginSection').style.display = 'block';
        });
        document.getElementById('loginBtn').addEventListener('click', () => this.login());
        document.getElementById('registerBtn').addEventListener('click', () => this.register());
        document.getElementById('logoutBtn').addEventListener('click', () => this.logout());
    }
};