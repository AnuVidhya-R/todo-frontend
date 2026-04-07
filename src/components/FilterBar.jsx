export default function FilterBar({ filter, setFilter, taskCount }) {
  const filters = ['All', 'Pending', 'Completed'];

  return (
    <div className="filters">
      <div className="filter-buttons">
        {filters.map((f) => (
          <button
            key={f}
            className={`filter-btn ${filter === f ? 'active' : ''}`}
            onClick={() => setFilter(f)}
          >
            {f}
          </button>
        ))}
      </div>
      <div className="task-count">
        {taskCount} task{taskCount !== 1 ? 's' : ''}
      </div>
    </div>
  );
}
