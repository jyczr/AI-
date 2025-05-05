const CategoryModule = {
    customCategories: ['餐飲', '交通', '娛樂', '購物', '其他'],
    customTags: [],

    init() {
        this.load();
        this.updateCategoryOptions();
        this.updateTagOptions();
        this.updateLists();
        this.bindEvents();
    },

    load() {
        if (currentUser) {
            this.customCategories = loadFromLocalStorage(`categories_${currentUser.username}`, this.customCategories);
            this.customTags = loadFromLocalStorage(`tags_${currentUser.username}`, []);
        }
    },

    save() {
        if (currentUser) {
            saveToLocalStorage(`categories_${currentUser.username}`, this.customCategories);
            saveToLocalStorage(`tags_${currentUser.username}`, this.customTags);
        }
    },

    updateCategoryOptions(selectId = 'category') {
        const select = document.getElementById(selectId);
        select.innerHTML = this.customCategories.map(cat => `<option value="${cat}">${cat}</option>`).join('');
    },

    updateTagOptions(selectId = 'tags', selectedTags = []) {
        const select = document.getElementById(selectId);
        select.innerHTML = this.customTags.map(tag => 
            `<option value="${tag}" ${selectedTags.includes(tag) ? 'selected' : ''}>${tag}</option>`
        ).join('');
    },

    updateLists() {
        const categoryList = document.getElementById('categoryList');
        const tagList = document.getElementById('tagList');
        categoryList.innerHTML = this.customCategories.map((cat, index) => 
            `<li>${cat} <span class="edit-btn" onclick="CategoryModule.deleteCategory(${index})">刪除</span></li>`
        ).join('');
        tagList.innerHTML = this.customTags.map((tag, index) => 
            `<li>${tag} <span class="edit-btn" onclick="CategoryModule.deleteTag(${index})">刪除</span></li>`
        ).join('');
    },

    addCategory() {
        const newCategory = document.getElementById('newCategory').value.trim();
        if (!newCategory) {
            alert('請輸入分類名稱！');
            return;
        }
        if (this.customCategories.includes(newCategory)) {
            alert('此分類已存在！');
            return;
        }
        this.customCategories.push(newCategory);
        this.save();
        this.updateCategoryOptions();
        this.updateCategoryOptions('editCategory');
        this.updateLists();
        document.getElementById('newCategory').value = '';
    },

    deleteCategory(index) {
        if (confirm(`確定要刪除分類「${this.customCategories[index]}」嗎？`)) {
            this.customCategories.splice(index, 1);
            this.save();
            this.updateCategoryOptions();
            this.updateCategoryOptions('editCategory');
            this.updateLists();
        }
    },

    addTag() {
        const newTag = document.getElementById('newTag').value.trim();
        if (!newTag) {
            alert('請輸入標籤名稱！');
            return;
        }
        if (this.customTags.includes(newTag)) {
            alert('此標籤已存在！');
            return;
        }
        this.customTags.push(newTag);
        this.save();
        this.updateTagOptions();
        this.updateTagOptions('editTags');
        this.updateLists();
        document.getElementById('newTag').value = '';
    },

    deleteTag(index) {
        if (confirm(`確定要刪除標籤「${this.customTags[index]}」嗎？`)) {
            this.customTags.splice(index, 1);
            this.save();
            this.updateTagOptions();
            this.updateTagOptions('editTags');
            this.updateLists();
        }
    },

    bindEvents() {
        document.getElementById('categoryTagBtn').addEventListener('click', () => switchContent('categoryTagSection'));
        document.getElementById('addCategoryBtn').addEventListener('click', () => this.addCategory());
        document.getElementById('addTagBtn').addEventListener('click', () => this.addTag());
    }
};