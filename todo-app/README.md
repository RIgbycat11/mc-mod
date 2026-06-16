# To-Do List Application

A modern, optimized to-do list application with **local storage** persistence, filtering, and statistics.

## Features

✅ **Add & Delete Tasks** - Create new tasks and remove completed ones  
✅ **Local Storage** - Tasks persist across browser sessions  
✅ **Filter Options** - View All, Active, or Completed tasks  
✅ **Task Statistics** - Track total and completed tasks  
✅ **Priority Levels** - Organize by High, Medium, Low priority  
✅ **Responsive Design** - Works on desktop, tablet, and mobile  
✅ **HTML Escaping** - Prevents XSS attacks  
✅ **Performance Optimized** - Batch DOM rendering with DocumentFragment  

## Usage

### Local Development

1. Open `index.html` in your browser
2. Add tasks by typing and pressing Enter or clicking "Add Task"
3. Check tasks as complete
4. Filter by status (All, Active, Completed)
5. Clear all completed tasks at once

**Tasks are automatically saved to browser's localStorage**

### Tech Stack

- **HTML5** - Semantic markup
- **CSS3** - Modern gradient styling, flexbox layout
- **Vanilla JavaScript** - No dependencies, class-based architecture
- **localStorage API** - Browser persistence

## Performance Optimizations

### 1. Batch DOM Rendering
```javascript
const fragment = document.createDocumentFragment();
// Add items to fragment
todoList.appendChild(fragment); // Single reflow
```

### 2. Object Pooling
- Reuse todo item structure to minimize allocations

### 3. Event Delegation
- Attach listeners to container rather than individual items (where applicable)

### 4. HTML Escaping
- Prevents XSS attacks and rendering issues

### 5. Efficient Filtering
- Filter on read instead of maintaining duplicate lists

## Architecture

### TodoApp Class
```
TodoApp
├── init() - Initialize app and attach listeners
├── Storage Operations
│   ├── saveToStorage()
│   └── loadFromStorage()
├── Todo Operations
│   ├── addTodo()
│   ├── deleteTodo(id)
│   ├── toggleTodo(id)
│   └── clearCompleted()
├── Filtering
│   ├── setFilter(filter)
│   └── getFilteredTodos()
└── Rendering
    ├── render()
    ├── updateStats()
    ├── renderTodoList()
    └── escapeHtml(text)
```

## Data Structure

```javascript
{
  id: 1718544000000,        // Timestamp-based unique ID
  text: "Buy groceries",    // Task description
  completed: false,         // Completion status
  priority: "medium",       // "high" | "medium" | "low"
  createdAt: "2024-..."    // ISO 8601 timestamp
}
```

## Browser Compatibility

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Mobile browsers (iOS Safari, Chrome Mobile)

## LocalStorage Quota

Most browsers allocate **5-10MB** per domain for localStorage.

With average task size ~200 bytes, you can store ~25,000-50,000 tasks.

## File Structure

```
todo-app/
├── index.html      # HTML structure
├── styles.css      # Styling (responsive, gradient)
├── app.js          # JavaScript logic (optimized)
└── README.md       # This file
```

## Future Enhancements

- [ ] Drag-and-drop to reorder tasks
- [ ] Task categories/projects
- [ ] Due dates and reminders
- [ ] Dark mode toggle
- [ ] Export to JSON/CSV
- [ ] Cloud sync (Firebase)
- [ ] Offline service worker

## License

MIT
