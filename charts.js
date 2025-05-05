const ChartModule = {
    spendingPieChart: null,
    incomeExpensePieChart: null,

    init() {
        this.bindEvents();
    },

    openModal() {
        document.getElementById('chartAnalysisModal').style.display = 'block';
        this.updateCharts();
    },

    updateCharts() {
        const transactions = TransactionModule.transactions;
        const categories = CategoryModule.customCategories;

        const categorySpending = categories.reduce((acc, cat) => {
            acc[cat] = transactions
                .filter(t => t.type === "支出" && t.category === cat)
                .reduce((sum, t) => sum + Math.abs(t.amount), 0);
            return acc;
        }, {});
        const spendingData = {
            labels: Object.keys(categorySpending).filter(cat => categorySpending[cat] > 0),
            datasets: [{
                data: Object.values(categorySpending).filter(amount => amount > 0),
                backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF']
            }]
        };
        if (this.spendingPieChart) {
            this.spendingPieChart.destroy();
        }
        this.spendingPieChart = new Chart(document.getElementById('spendingPieChart'), {
            type: 'pie',
            data: spendingData,
            options: { title: { display: true, text: '消費分類' } }
        });

        const income = transactions
            .filter(t => t.type === "收入")
            .reduce((sum, t) => sum + Math.abs(t.amount), 0);
        const expense = transactions
            .filter(t => t.type === "支出")
            .reduce((sum, t) => sum + Math.abs(t.amount), 0);
        const incomeExpenseData = {
            labels: ['收入', '支出'],
            datasets: [{
                data: [income, expense],
                backgroundColor: ['#36A2EB', '#FF6384']
            }]
        };
        if (this.incomeExpensePieChart) {
            this.incomeExpensePieChart.destroy();
        }
        this.incomeExpensePieChart = new Chart(document.getElementById('incomeExpensePieChart'), {
            type: 'pie',
            data: incomeExpenseData,
            options: { title: { display: true, text: '收支概況' } }
        });
    },

    bindEvents() {
        document.getElementById('analysisBtn').addEventListener('click', () => this.openModal());
        document.querySelector('#chartAnalysisModal .close').addEventListener('click', () => {
            document.getElementById('chartAnalysisModal').style.display = 'none';
        });
    }
};const ChartModule = {
    spendingPieChart: null,
    incomeExpensePieChart: null,

    init() {
        this.bindEvents();
    },

    openModal() {
        document.getElementById('chartAnalysisModal').style.display = 'block';
        this.updateCharts();
    },

    updateCharts() {
        const transactions = TransactionModule.transactions;
        const categories = CategoryModule.customCategories;

        const categorySpending = categories.reduce((acc, cat) => {
            acc[cat] = transactions
                .filter(t => t.type === "支出" && t.category === cat)
                .reduce((sum, t) => sum + Math.abs(t.amount), 0);
            return acc;
        }, {});
        const spendingData = {
            labels: Object.keys(categorySpending).filter(cat => categorySpending[cat] > 0),
            datasets: [{
                data: Object.values(categorySpending).filter(amount => amount > 0),
                backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF']
            }]
        };
        if (this.spendingPieChart) {
            this.spendingPieChart.destroy();
        }
        this.spendingPieChart = new Chart(document.getElementById('spendingPieChart'), {
            type: 'pie',
            data: spendingData,
            options: { title: { display: true, text: '消費分類' } }
        });

        const income = transactions
            .filter(t => t.type === "收入")
            .reduce((sum, t) => sum + Math.abs(t.amount), 0);
        const expense = transactions
            .filter(t => t.type === "支出")
            .reduce((sum, t) => sum + Math.abs(t.amount), 0);
        const incomeExpenseData = {
            labels: ['收入', '支出'],
            datasets: [{
                data: [income, expense],
                backgroundColor: ['#36A2EB', '#FF6384']
            }]
        };
        if (this.incomeExpensePieChart) {
            this.incomeExpensePieChart.destroy();
        }
        this.incomeExpensePieChart = new Chart(document.getElementById('incomeExpensePieChart'), {
            type: 'pie',
            data: incomeExpenseData,
            options: { title: { display: true, text: '收支概況' } }
        });
    },

    bindEvents() {
        document.getElementById('analysisBtn').addEventListener('click', () => this.openModal());
        document.querySelector('#chartAnalysisModal .close').addEventListener('click', () => {
            document.getElementById('chartAnalysisModal').style.display = 'none';
        });
    }
};