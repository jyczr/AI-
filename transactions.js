const TransactionModule = {
    transactions: [],
    totalIncome: 0,
    totalExpense: 0,

    init() {
        this.load();
        this.updateTable();
        this.updateTotals();
        this.bindEvents();
    },

    load() {
        if (currentUser) {
            this.transactions = loadFromLocalStorage(`transactions_${currentUser.username}`, []);
        }
    },

    save() {
        if (currentUser) {
            saveToLocalStorage(`transactions_${currentUser.username}`, this.transactions);
        }
    },

    add() {
        validateForm(
            [
                ['amount', '金額'],
                ['date', '日期']
            ],
            () => {
                const transaction = {
                    type: document.getElementById('type').value,
                    amount: document.getElementById('type').value === "支出"
                        ? -Math.abs(parseFloat(document.getElementById('amount').value))
                        : Math.abs(parseFloat(document.getElementById('amount').value)),
                    date: document.getElementById('date').value,
                    location: document.getElementById('location').value,
                    category: document.getElementById('category').value,
                    tags: Array.from(document.getElementById('tags').selectedOptions).map(opt => opt.value),
                    description: document.getElementById('description').value
                };
                this.transactions.push(transaction);
                this.transactions.sort((a, b) => new Date(a.date) - new Date(b.date));
                this.save();
                this.updateTable();
                this.updateTotals();
                document.getElementById('amount').value = '';
                document.getElementById('date').value = '';
                document.getElementById('location').value = '';
                document.getElementById('description').value = '';
            }
        );
    },

    updateTable() {
        updateTable('transactionList', this.transactions, (t, index) => {
            const row = document.createElement('tr');
            const displayAmount = t.type === "支出" ? Math.abs(t.amount) : t.amount;
            row.innerHTML = `
                <td><input type="checkbox" class="delete-checkbox" data-index="${index}"></td>
                <td>${t.type}</td>
                <td>${t.category}</td>
                <td>${displayAmount}</td>
                <td>${t.date}</td>
                <td>${t.location}</td>
                <td>${t.tags ? t.tags.join(', ') : ''}</td>
                <td>${t.description}</td>
                <td><span class="edit-btn" onclick="TransactionModule.edit(${index})">編輯</span></td>
            `;
            return row;
        });
    },

    updateTotals() {
        this.totalIncome = this.transactions
            .filter(t => t.type === "收入")
            .reduce((sum, t) => sum + Math.abs(t.amount), 0);
        this.totalExpense = this.transactions
            .filter(t => t.type === "支出")
            .reduce((sum, t) => sum + Math.abs(t.amount), 0);
        document.getElementById('totalIncome').textContent = this.totalIncome;
        document.getElementById('totalExpense').textContent = this.totalExpense;
    },

    edit(index) {
        const transaction = this.transactions[index];
        document.getElementById('editIndex').value = index;
        document.getElementById('editType').value = transaction.type;
        document.getElementById('editAmount').value = Math.abs(transaction.amount);
        document.getElementById('editDate').value = transaction.date;
        document.getElementById('editLocation').value = transaction.location;
        document.getElementById('editCategory').value = transaction.category;
        document.getElementById('editDescription').value = transaction.description;
        CategoryModule.updateTagOptions('editTags', transaction.tags);
        document.getElementById('editModal').style.display = 'block';
    },

    saveEdit() {
        validateForm(
            [
                ['editAmount', '金額'],
                ['editDate', '日期']
            ],
            () => {
                const index = parseInt(document.getElementById('editIndex').value);
                this.transactions[index] = {
                    type: document.getElementById('editType').value,
                    amount: document.getElementById('editType').value === "支出"
                        ? -Math.abs(parseFloat(document.getElementById('editAmount').value))
                        : Math.abs(parseFloat(document.getElementById('editAmount').value)),
                    date: document.getElementById('editDate').value,
                    location: document.getElementById('editLocation').value,
                    category: document.getElementById('editCategory').value,
                    tags: Array.from(document.getElementById('editTags').selectedOptions).map(opt => opt.value),
                    description: document.getElementById('editDescription').value
                };
                this.transactions.sort((a, b) => new Date(a.date) - new Date(b.date));
                this.save();
                this.updateTable();
                this.updateTotals();
                document.getElementById('editModal').style.display = 'none';
            }
        );
    },

    deleteSelected() {
        const checkboxes = document.querySelectorAll('.delete-checkbox:checked');
        const indexes = Array.from(checkboxes).map(cb => parseInt(cb.dataset.index)).sort((a, b) => b - a);
        indexes.forEach(index => this.transactions.splice(index, 1));
        this.save();
        this.updateTable();
        this.updateTotals();
    },

    bindEvents() {
        document.getElementById('addTransactionBtn').addEventListener('click', () => this.add());
        document.getElementById('deleteSelectedBtn').addEventListener('click', () => this.deleteSelected());
        document.getElementById('saveEditBtn').addEventListener('click', () => this.saveEdit());
        document.getElementById('selectAll').addEventListener('change', (e) => {
            document.querySelectorAll('.delete-checkbox').forEach(cb => cb.checked = e.target.checked);
        });
        document.getElementById('recordBtn').addEventListener('click', () => switchContent('recordSection'));
        document.querySelector('#editModal .close').addEventListener('click', () => {
            document.getElementById('editModal').style.display = 'none';
        });
    }
};