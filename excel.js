const ExportModule = {
    init() {
        this.bindEvents();
    },

    exportToExcel() {
        const transactions = TransactionModule.transactions;
        const data = transactions.map(t => ({
            類型: t.type,
            分類: t.category,
            金額: t.type === "支出" ? Math.abs(t.amount) : t.amount,
            日期: t.date,
            地點: t.location,
            標籤: t.tags ? t.tags.join(', ') : '',
            描述: t.description
        }));
        const ws = XLSX.utils.json_to_sheet(data);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, '記帳紀錄');
        XLSX.writeFile(wb, 'NTNU_Money_Transactions.xlsx');
    },

    bindEvents() {
        document.getElementById('exportBtn').addEventListener('click', () => this.exportToExcel());
    }
};