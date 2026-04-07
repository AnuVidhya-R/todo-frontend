import { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { MdDarkMode, MdLightMode, MdLogout } from 'react-icons/md';

import { useLocalStorage } from './hooks/useLocalStorage';
import Login from './components/Login';
import Register from './components/Register';
import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';
import FilterBar from './components/FilterBar';

function App() {
  // Global State
  const [tasks, setTasks] = useLocalStorage('todo-tasks', []);
  const [filter, setFilter] = useState('All');
  const [isDarkMode, setIsDarkMode] = useLocalStorage('todo-theme-dark', false);
  const [authView, setAuthView] = useLocalStorage('todo-auth-view', 'login'); // 'login', 'register', 'app'
  const [currentUser, setCurrentUser] = useLocalStorage('todo-current-user', null);

  // Apply dark mode class to body based on state
  useEffect(() => {
    if (isDarkMode) {
      document.body.classList.add('dark');
    } else {
      document.body.classList.remove('dark');
    }
  }, [isDarkMode]);

  const handleLogin = (username) => {
    setCurrentUser(username);
    setAuthView('app');
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setAuthView('login');
  };

  const handleRegister = (username) => {
    setCurrentUser(username);
    setAuthView('app'); // Auto login
  };

  const addTask = (text, date) => {
    const newTask = {
      id: uuidv4(),
      text,
      date: date || null,
      completed: false,
      createdAt: new Date().toISOString(),
    };
    setTasks([newTask, ...tasks]);
  };

  const toggleComplete = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const editTask = (id, newText) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, text: newText } : task
      )
    );
  };

  // Handle Drag & Drop reordering
  const onDragEnd = (result) => {
    if (!result.destination) return; // dropped outside a valid droppable
    if (result.destination.index === result.source.index) return; // didn't move

    // Note: If we are filtering, drag-and-drop might be weird because visual index != absolute index.
    // To prevent issues, only apply reorder when 'All' is selected.
    if (filter !== 'All') return;

    const reorderedTasks = Array.from(tasks);
    const [movedTask] = reorderedTasks.splice(result.source.index, 1);
    reorderedTasks.splice(result.destination.index, 0, movedTask);

    setTasks(reorderedTasks);
  };

  // Filter tasks
  const filteredTasks = tasks.filter((task) => {
    if (filter === 'Pending') return !task.completed;
    if (filter === 'Completed') return task.completed;
    return true; // All
  });

  if (authView === 'login') {
    return (
      <div style={{ width: '100%', maxWidth: '600px' }}>
        <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '1rem' }}>
          <button
            className="theme-toggle"
            onClick={() => setIsDarkMode(!isDarkMode)}
            title="Toggle Dark Mode"
            style={{ background: 'var(--container-bg)', border: '1px solid var(--border-color)', boxShadow: 'var(--shadow-sm)' }}
          >
            {isDarkMode ? <MdLightMode /> : <MdDarkMode />}
          </button>
        </div>
        <Login 
          onLogin={handleLogin} 
          onNavigateToRegister={() => setAuthView('register')}
        />
      </div>
    );
  }

  if (authView === 'register') {
    return (
      <div style={{ width: '100%', maxWidth: '600px' }}>
        <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '1rem' }}>
          <button
            className="theme-toggle"
            onClick={() => setIsDarkMode(!isDarkMode)}
            title="Toggle Dark Mode"
            style={{ background: 'var(--container-bg)', border: '1px solid var(--border-color)', boxShadow: 'var(--shadow-sm)' }}
          >
            {isDarkMode ? <MdLightMode /> : <MdDarkMode />}
          </button>
        </div>
        <Register 
          onRegister={handleRegister} 
          onNavigateToLogin={() => setAuthView('login')}
        />
      </div>
    );
  }

  return (
    <div className="todo-container">
      <header>
        <h1>My To-Do List</h1>
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <button
            className="theme-toggle"
            onClick={() => setIsDarkMode(!isDarkMode)}
            title="Toggle Dark Mode"
          >
            {isDarkMode ? <MdLightMode /> : <MdDarkMode />}
          </button>
          <button
            className="action-btn delete-btn"
            style={{ background: 'var(--item-bg)', border: '1px solid var(--border-color)' }}
            onClick={handleLogout}
            title="Logout"
          >
            <MdLogout />
          </button>
        </div>
      </header>

      <TodoForm addTask={addTask} />

      <FilterBar
        filter={filter}
        setFilter={setFilter}
        taskCount={filteredTasks.length}
      />

      {filter !== 'All' && tasks.length > 0 && (
        <div style={{ marginBottom: '1rem', fontSize: '0.85rem', color: 'var(--muted-text)', textAlign: 'center' }}>
          *Drag and drop is disabled while filtering. Switch to "All" to reorder tasks.
        </div>
      )}

      <TodoList
        tasks={filteredTasks}
        toggleComplete={toggleComplete}
        deleteTask={deleteTask}
        editTask={editTask}
        onDragEnd={onDragEnd}
      />
    </div>
  );
}

export default App;
