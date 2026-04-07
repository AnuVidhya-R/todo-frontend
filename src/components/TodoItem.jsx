import { forwardRef, useState } from 'react';
import { MdCheck, MdDelete, MdEdit, MdDragIndicator, MdSave, MdClose } from 'react-icons/md';

const TodoItem = forwardRef(({
  task,
  toggleComplete,
  deleteTask,
  editTask,
  isDragging,
  dragHandleProps,
  ...props
}, ref) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(task.text);

  const handleSave = () => {
    if (editText.trim() && editText !== task.text) {
      editTask(task.id, editText.trim());
    } else {
      // Revert if empty
      setEditText(task.text);
    }
    setIsEditing(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') handleSave();
    if (e.key === 'Escape') {
      setEditText(task.text);
      setIsEditing(false);
    }
  };

  const formattedDate = task.date
    ? new Date(task.date).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
      })
    : null;

  return (
    <li
      ref={ref}
      className={`todo-item ${isDragging ? 'dragging' : ''}`}
      {...props}
    >
      <div className="todo-content">
        {/* Drag Handle */}
        <div className="drag-handle" {...dragHandleProps}>
          <MdDragIndicator size={24} />
        </div>

        {/* Checkbox */}
        <div
          className={`checkbox-container ${task.completed ? 'checked' : ''}`}
          onClick={() => toggleComplete(task.id)}
        >
          {task.completed && <MdCheck size={18} />}
        </div>

        {/* Task Text & Date */}
        <div className="task-info">
          {isEditing ? (
            <input
              type="text"
              className="edit-input"
              value={editText}
              onChange={(e) => setEditText(e.target.value)}
              onBlur={handleSave}
              onKeyDown={handleKeyDown}
              autoFocus
            />
          ) : (
            <span className={`task-text ${task.completed ? 'completed' : ''}`}>
              {task.text}
            </span>
          )}
          {formattedDate && !isEditing && (
            <span className="task-date">📅 {formattedDate}</span>
          )}
        </div>
      </div>

      {/* Actions */}
      <div className="item-actions">
        {isEditing ? (
          <>
            <button className="action-btn edit-btn" onClick={handleSave} title="Save">
               <MdSave />
            </button>
            <button
              className="action-btn delete-btn"
              onClick={() => {
                setEditText(task.text);
                setIsEditing(false);
              }}
              title="Cancel"
            >
              <MdClose />
            </button>
          </>
        ) : (
          <>
            <button
              className="action-btn edit-btn"
              onClick={() => setIsEditing(true)}
              title="Edit"
            >
              <MdEdit />
            </button>
            <button
              className="action-btn delete-btn"
              onClick={() => deleteTask(task.id)}
              title="Delete"
            >
              <MdDelete />
            </button>
          </>
        )}
      </div>
    </li>
  );
});

TodoItem.displayName = 'TodoItem';

export default TodoItem;
