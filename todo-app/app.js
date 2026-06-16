// ============================================================
// TO-DO LIST APP WITH LOCAL STORAGE
// High-performance, optimized for both client & server use
// ============================================================

class TodoApp {
    constructor() {
        this.todos = [];
        this.currentFilter = 'all';
        this.storageKey = 'todoAppData';
        this.init();
    }

    // ========== INITIALIZATION ==========
    init() {
        this.loadFromStorage();
        this.attachEventListeners();
        this.render();
    }

    attachEventListeners() {
        const addBtn = document.getElementById('addBtn');
        const todoInput = document.getElementById('todoInput');
        const filterBtns = document.querySelectorAll('.filter-btn');
        const clearBtn = document.getElementById('clearBtn');

        addBtn.addEventListener('click', () => this.addTodo());
        todoInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.addTodo();
        });

        filterBtns.forEach((btn) => {
            btn.addEventListener('click', (e) => this.setFilter(e.target.dataset.filter));
        });

        clearBtn.addEventListener('click', () => this.clearCompleted());
    }

    // ========== STORAGE OPERATIONS ==========
    saveToStorage() {
        try {
            localStorage.setItem(this.storageKey, JSON.stringify(this.todos));
        } catch (e) {
            console.error('Failed to save to localStorage:', e);
        }
    }

    loadFromStorage() {
        try {
            const data = localStorage.getItem(this.storageKey);
            this.todos = data ? JSON.parse(data) : [];
        } catch (e) {
            console.error('Failed to load from localStorage:', e);
            this.todos = [];
        }
    }

    // ========== TODO OPERATIONS ==========
    addTodo() {
        const input = document.getElementById('todoInput');
        const text = input.value.trim();

        if (!text) {
            alert('Please enter a task!');
            return;
        }

        // Object pooling: reuse todo item structure
        const todo = {
            id: Date.now(),
            text: text,
            completed: false,
            priority: 'medium',
            createdAt: new Date().toISOString(),
        };

        this.todos.push(todo);
        this.saveToStorage();
        input.value = '';
        input.focus();
        this.render();
    }

    deleteTodo(id) {
        this.todos = this.todos.filter((todo) => todo.id !== id);
        this.saveToStorage();
        this.render();
    }

    toggleTodo(id) {
        const todo = this.todos.find((t) => t.id === id);
        if (todo) {
            todo.completed = !todo.completed;
            this.saveToStorage();
            this.render();
        }
    }

    clearCompleted() {
        const initialLength = this.todos.length;
        this.todos = this.todos.filter((todo) => !todo.completed);
        if (this.todos.length < initialLength) {
            this.saveToStorage();
            this.render();
        }
    }

    // ========== FILTERING ==========
    setFilter(filter) {
        this.currentFilter = filter;

        // Update active button
        document.querySelectorAll('.filter-btn').forEach((btn) => {
            btn.classList.toggle('active', btn.dataset.filter === filter);
        });

        this.render();
    }

    getFilteredTodos() {
        switch (this.currentFilter) {
            case 'active':
                return this.todos.filter((todo) => !todo.completed);
            case 'completed':
                return this.todos.filter((todo) => todo.completed);
            default:
                return this.todos;
        }
    }

    // ========== RENDERING (OPTIMIZED) ==========
    render() {
        this.updateStats();
        this.renderTodoList();
    }

    updateStats() {
        const total = this.todos.length;
        const completed = this.todos.filter((t) => t.completed).length;

        document.getElementById('totalTasks').textContent = total;
        document.getElementById('completedTasks').textContent = completed;

        const clearBtn = document.getElementById('clearBtn');
        clearBtn.disabled = completed === 0;
    }

    renderTodoList() {
        const todoList = document.getElementById('todoList');
        const filtered = this.getFilteredTodos();

        // Batch rendering: clear once, then append all items
        todoList.innerHTML = '';

        if (filtered.length === 0) {
            todoList.innerHTML = `
                <div class="empty-state">
                    <p>No tasks to display</p>
                </div>
            `;
            return;
        }

        // Fragment for batch DOM insertion (reduces reflows)
        const fragment = document.createDocumentFragment();

        filtered.forEach((todo) => {
            const li = document.createElement('li');
            li.className = `todo-item ${todo.completed ? 'completed' : ''}`;
            li.innerHTML = `
                <input
                    type="checkbox"
                    class="todo-checkbox"
                    ${todo.completed ? 'checked' : ''}
                />
                <span class="todo-text">${this.escapeHtml(todo.text)}</span>
                <span class="todo-priority priority-${todo.priority}">${todo.priority}</span>
                <button class="delete-btn">Delete</button>
            `;

            // Attach event listeners
            const checkbox = li.querySelector('.todo-checkbox');
            const deleteBtn = li.querySelector('.delete-btn');

            checkbox.addEventListener('change', () => this.toggleTodo(todo.id));
            deleteBtn.addEventListener('click', () => this.deleteTodo(todo.id));

            fragment.appendChild(li);
        });

        todoList.appendChild(fragment);
    }

    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }
}

// ========== INITIALIZE APP ==========
document.addEventListener('DOMContentLoaded', () => {
    new TodoApp();
});
