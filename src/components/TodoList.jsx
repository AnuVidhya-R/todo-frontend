import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import { MdFormatListBulleted } from 'react-icons/md';
import TodoItem from './TodoItem';

export default function TodoList({ tasks, toggleComplete, deleteTask, editTask, onDragEnd }) {
  if (tasks.length === 0) {
    return (
      <div className="empty-state">
        <MdFormatListBulleted />
        <p>No tasks found. Add a task above to get started!</p>
      </div>
    );
  }

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="todo-list">
        {(provided) => (
          <ul
            className="todo-list"
            {...provided.droppableProps}
            ref={provided.innerRef}
          >
            {tasks.map((task, index) => (
              <Draggable key={task.id} draggableId={task.id} index={index}>
                {(provided, snapshot) => (
                  <TodoItem
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    dragHandleProps={provided.dragHandleProps}
                    isDragging={snapshot.isDragging}
                    style={provided.draggableProps.style}
                    task={task}
                    toggleComplete={toggleComplete}
                    deleteTask={deleteTask}
                    editTask={editTask}
                  />
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </ul>
        )}
      </Droppable>
    </DragDropContext>
  );
}
