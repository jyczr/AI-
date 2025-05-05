const GoalModule = {
    goals: [],

    init() {
        this.load();
        this.updateTable();
        this.bindEvents();
        this.updateProgress();
    },

    load() {
        if (currentUser) {
            this.goals = loadFromLocalStorage(`goals_${currentUser.username}`, []);
        }
    },

    save() {
        if (currentUser) {
            saveToLocalStorage(`goals_${currentUser.username}`, this.goals);
        }
    },

    add() {
        validateForm(
            [
                ['goalName', '目標名稱'],
                ['goalAmount', '目標金額'],
                ['goalStartDate', '開始日期'],
                ['goalEndDate', '結束日期']
            ],
            () => {
                this.goals.push({
                    name: document.getElementById('goalName').value,
                    amount: parseFloat(document.getElementById('goalAmount').value),
                    startDate: document.getElementById('goalStartDate').value,
                    endDate: document.getElementById('goalEndDate').value,
                    progress: 0
                });
                this.save();
                this.updateTable();
                this.updateProgress();
                document.getElementById('goalModal').style.display = 'none';
                document.getElementById('goalName').value = '';
                document.getElementById('goalAmount').value = '';
                document.getElementById('goalStartDate').value = '';
                document.getElementById('goalEndDate').value = '';
            }
        );
    },

    updateTable() {
        updateTable('goalList', this.goals, (goal, index) => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${goal.name}</td>
                <td>${goal.amount}</td>
                <td>${goal.progress}</td>
                <td>${goal.startDate}</td>
                <td>${goal.endDate}</td>
                <td>
                    <span class="edit-btn" onclick="GoalModule.edit(${index})">編輯</span> |
                    <span class="edit-btn" onclick="GoalModule.delete(${index})">刪除</span>
                </td>
            `;
            return row;
        });
    },

    edit(index) {
        const goal = this.goals[index];
        document.getElementById('editGoalIndex').value = index;
        document.getElementById('editGoalName').value = goal.name;
        document.getElementById('editGoalAmount').value = goal.amount;
        document.getElementById('editGoalStartDate').value = goal.startDate;
        document.getElementById('editGoalEndDate').value = goal.endDate;
        document.getElementById('editGoalModal').style.display = 'block';
    },

    saveEdit() {
        validateForm(
            [
                ['editGoalName', '目標名稱'],
                ['editGoalAmount', '目標金額'],
                ['editGoalStartDate', '開始日期'],
                ['editGoalEndDate', '結束日期']
            ],
            () => {
                const index = parseInt(document.getElementById('editGoalIndex').value);
                this.goals[index] = {
                    name: document.getElementById('editGoalName').value,
                    amount: parseFloat(document.getElementById('editGoalAmount').value),
                    startDate: document.getElementById('editGoalStartDate').value,
                    endDate: document.getElementById('editGoalEndDate').value,
                    progress: this.goals[index].progress
                };
                this.save();
                this.updateTable();
                this.updateProgress();
                document.getElementById('editGoalModal').style.display = 'none';
            }
        );
    },

    delete(index) {
        if (confirm(`確定要刪除目標「${this.goals[index].name}」嗎？`)) {
            this.goals.splice(index, 1);
            this.save();
            this.updateTable();
        }
    },

    updateProgress() {
        this.goals.forEach(goal => {
            const startDate = new Date(goal.startDate);
            const endDate = new Date(goal.endDate);
            const transactions = TransactionModule.transactions.filter(t => 
                t.type === "收入" && new Date(t.date) >= startDate && new Date(t.date) <= endDate
            );
            goal.progress = transactions.reduce((sum, t) => sum + Math.abs(t.amount), 0);
        });
        this.save();
        this.updateTable();
    },

    bindEvents() {
        document.getElementById('goalBtn').addEventListener('click', () => switchContent('goalSection'));
        document.getElementById('addGoalBtn').addEventListener('click', () => {
            document.getElementById('goalModal').style.display = 'block';
        });
        document.getElementById('saveGoalBtn').addEventListener('click', () => this.add());
        document.getElementById('saveEditGoalBtn').addEventListener('click', () => this.saveEdit());
        document.querySelector('#goalModal .close').addEventListener('click', () => {
            document.getElementById('goalModal').style.display = 'none';
        });
        document.querySelector('#editGoalModal .close').addEventListener('click', () => {
            document.getElementById('editGoalModal').style.display = 'none';
        });
    }
};