import { useState } from 'react';
import { MdAdd } from 'react-icons/md';

export default function TodoForm({ addTask }) {
  const [text, setText] = useState('');
  const [date, setDate] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!text.trim()) return;
    addTask(text, date);
    setText('');
    setDate('');
  };

  return (
    <form className="todo-form" onSubmit={handleSubmit}>
      <div className="input-group">
        <input
          type="text"
          placeholder="What needs to be done?"
          value={text}
          onChange={(e) => setText(e.target.value)}
          autoFocus
        />
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          title="Optional Due Date"
        />
        <button type="submit" className="btn btn-primary" disabled={!text.trim()}>
          <MdAdd size={24} /> Add Task
        </button>
      </div>
    </form>
  );
}
