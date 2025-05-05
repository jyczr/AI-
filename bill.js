const BillModule = {
    bills: [],

    init() {
        this.load();
        this.updateTable();
        this.bindEvents();
        this.checkReminders();
    },

    load() {
        if (currentUser) {
            this.bills = loadFromLocalStorage(`bills_${currentUser.username}`, []);
        }
    },

    save() {
        if (currentUser) {
            saveToLocalStorage(`bills_${currentUser.username}`, this.bills);
        }
    },

    add() {
        validateForm(
            [
                ['billName', '帳單名稱'],
                ['billAmount', '金額'],
                ['billDueDate', '到期日期']
            ],
            () => {
                this.bills.push({
                    name: document.getElementById('billName').value,
                    amount: parseFloat(document.getElementById('billAmount').value),
                    dueDate: document.getElementById('billDueDate').value
                });
                this.bills.sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate));
                this.save();
                this.updateTable();
                document.getElementById('billReminderModal').style.display = 'none';
                document.getElementById('billName').value = '';
                document.getElementById('billAmount').value = '';
                document.getElementById('billDueDate').value = '';
            }
        );
    },

    updateTable() {
        updateTable('billList', this.bills, (bill, index) => {
            const dueDate = new Date(bill.dueDate);
            const today = new Date();
            today.setHours(0, 0, 0, 0);
            const daysUntilDue = Math.ceil((dueDate - today) / (1000 * 60 * 60 * 24));
            let status = daysUntilDue < 0 ? '已過期' : `還有 ${daysUntilDue} 天`;
            if (daysUntilDue < 0 || daysUntilDue <= 3) status = `<span class="warning">${status}</span>`;
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${bill.name}</td>
                <td>${bill.amount}</td>
                <td>${bill.dueDate}</td>
                <td>${status}</td>
                <td>
                    <span class="edit-btn" onclick="BillModule.edit(${index})">編輯</span> |
                    <span class="edit-btn" onclick="BillModule.delete(${index})">刪除</span>
                </td>
            `;
            return row;
        });
    },

    edit(index) {
        const bill = this.bills[index];
        document.getElementById('editBillIndex').value = index;
        document.getElementById('editBillName').value = bill.name;
        document.getElementById('editBillAmount').value = bill.amount;
        document.getElementById('editBillDueDate').value = bill.dueDate;
        document.getElementById('editBillModal').style.display = 'block';
    },

    saveEdit() {
        validateForm(
            [
                ['editBillName', '帳單名稱'],
                ['editBillAmount', '金額'],
                ['editBillDueDate', '到期日期']
            ],
            () => {
                const index = parseInt(document.getElementById('editBillIndex').value);
                this.bills[index] = {
                    name: document.getElementById('editBillName').value,
                    amount: parseFloat(document.getElementById('editBillAmount').value),
                    dueDate: document.getElementById('editBillDueDate').value
                };
                this.bills.sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate));
                this.save();
                this.updateTable();
                document.getElementById('editBillModal').style.display = 'none';
            }
        );
    },

    delete(index) {
        if (confirm(`確定要刪除帳單「${this.bills[index].name}」嗎？`)) {
            this.bills.splice(index, 1);
            this.save();
            this.updateTable();
        }
    },

    checkReminders() {
        this.bills.forEach(bill => {
            const dueDate = new Date(bill.dueDate);
            const today = new Date();
            today.setHours(0, 0, 0, 0);
            const daysUntilDue = Math.ceil((dueDate - today) / (1000 * 60 * 60 * 24));
            if (daysUntilDue <= 3 && daysUntilDue >= 0) {
                alert(`提醒：帳單「${bill.name}」即將到期（${daysUntilDue} 天）！`);
            }
        });
    },

    bindEvents() {
        document.getElementById('billReminderBtn').addEventListener('click', () => switchContent('billReminderSection'));
        document.getElementById('addBillBtn').addEventListener('click', () => {
            document.getElementById('billReminderModal').style.display = 'block';
        });
        document.getElementById('saveBillBtn').addEventListener('click', () => this.add());
        document.getElementById('saveEditBillBtn').addEventListener('click', () => this.saveEdit());
        document.querySelector('#billReminderModal .close').addEventListener('click', () => {
            document.getElementById('billReminderModal').style.display = 'none';
        });
        document.querySelector('#editBillModal .close').addEventListener('click', () => {
            document.getElementById('editBillModal').style.display = 'none';
        });
    }
};