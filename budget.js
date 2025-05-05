const BudgetModule = {
    monthlyBudget: null,

    init() {
        this.load();
        this.updateDisplay();
        this.bindEvents();
    },

    load() {
        if (currentUser) {
            this.monthlyBudget = loadFromLocalStorage(`budget_${currentUser.username}`, null);
        }
    },

    save() {
        if (currentUser) {
            saveToLocalStorage(`budget_${currentUser.username}`, this.monthlyBudget);
        }
    },

    setBudget() {
        validateForm(
            [['budgetAmount', '預算金額']],
            () => {
                this.monthlyBudget = parseFloat(document.getElementById('budgetAmount').value);
                this.save();
                this.updateDisplay();
                document.getElementById('budgetModal').style.display = 'none';
            }
        );
    },

    cancelBudget() {
        if (confirm('確定要取消本月預算嗎？')) {
            this.monthlyBudget = null;
            this.save();
            this.updateDisplay();
        }
    },

    updateDisplay() {
        document.getElementById('monthlyBudget').textContent = this.monthlyBudget ? this.monthlyBudget : '未設定';
        const expense = this.getCurrentMonthExpense();
        document.getElementById('currentMonthExpense').textContent = expense;
        this.checkWarning(expense);
    },

    getCurrentMonthExpense() {
        const now = new Date();
        const currentMonth = now.getMonth();
        const currentYear = now.getFullYear();
        return TransactionModule.transactions
            .filter(t => t.type === "支出" && new Date(t.date).getMonth() === currentMonth && new Date(t.date).getFullYear() === currentYear)
            .reduce((sum, t) => sum + Math.abs(t.amount), 0);
    },

    checkWarning(expense) {
        if (this.monthlyBudget && expense > this.monthlyBudget) {
            alert('警告：本月支出已超過預算！');
        }
    },

    bindEvents() {
        document.getElementById('budgetBtn').addEventListener('click', () => switchContent('budgetSection'));
        document.getElementById('setBudgetBtn').addEventListener('click', () => {
            document.getElementById('budgetModal').style.display = 'block';
        });
        document.getElementById('saveBudgetBtn').addEventListener('click', () => this.setBudget());
        document.getElementById('cancelBudgetBtn').addEventListener('click', () => this.cancelBudget());
        document.querySelector('#budgetModal .close').addEventListener('click', () => {
            document.getElementById('budgetModal').style.display = 'none';
        });
    }
};