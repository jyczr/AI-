const AnalysisModule = {
    init() {
        this.bindEvents();
    },

    analyze() {
        const transactions = TransactionModule.transactions;
        const categories = CategoryModule.customCategories;
        const categorySpending = categories.reduce((acc, cat) => {
            acc[cat] = transactions
                .filter(t => t.type === "支出" && t.category === cat)
                .reduce((sum, t) => sum + Math.abs(t.amount), 0);
            return acc;
        }, {});
        let result = '<h3>消費分析結果</h3>';
        result += '<ul>';
        for (const [cat, amount] of Object.entries(categorySpending)) {
            if (amount > 0) {
                result += `<li>${cat}: ${amount} 元</li>`;
            }
        }
        result += '</ul>';
        document.getElementById('analysisResult').innerHTML = result;
    },

    bindEvents() {
        document.getElementById('analysisBtn').addEventListener('click', () => {
            switchContent('analysisSection');
            this.analyze();
        });
    }
};