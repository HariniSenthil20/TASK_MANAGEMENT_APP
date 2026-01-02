import { useDispatch } from 'react-redux';
import { updateTask } from '../store/slices/taskSlice';
import { fetchTaskStats } from '../store/slices/taskSlice';

const TaskList = ({ tasks, loading, onEdit, onDelete, onUpdate }) => {
  const dispatch = useDispatch();

  const handleStatusChange = (task, newStatus) => {
    dispatch(updateTask({ id: task.id, taskData: { status: newStatus } })).then(() => {
      dispatch(fetchTaskStats());
    });
  };

  if (loading && tasks.length === 0) {
    return (
      <div className="loading">
        <div className="spinner"></div>
        <p>Loading tasks...</p>
      </div>
    );
  }

  if (tasks.length === 0) {
    return (
      <div style={{ textAlign: 'center', padding: '40px', color: '#666' }}>
        <p>No tasks found. Create your first task!</p>
      </div>
    );
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'Todo':
        return '#ff6384';
      case 'In Progress':
        return '#36a2eb';
      case 'Completed':
        return '#4bc0c0';
      default:
        return '#666';
    }
  };

  return (
    <div>
      {tasks.map((task) => (
        <div
          key={task.id}
          style={{
            padding: '15px',
            marginBottom: '10px',
            border: '1px solid #ddd',
            borderRadius: '5px',
            background: 'white',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <div style={{ flex: 1 }}>
            <h3 style={{ marginBottom: '5px' }}>{task.title}</h3>
            <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
              <span
                style={{
                  padding: '5px 10px',
                  borderRadius: '3px',
                  backgroundColor: getStatusColor(task.status),
                  color: 'white',
                  fontSize: '12px',
                  fontWeight: 'bold',
                }}
              >
                {task.status}
              </span>
              <span style={{ color: '#666', fontSize: '14px' }}>
                Created: {new Date(task.createdAt).toLocaleDateString()}
              </span>
            </div>
          </div>
          <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
            <select
              value={task.status}
              onChange={(e) => handleStatusChange(task, e.target.value)}
              style={{
                padding: '5px 10px',
                border: '1px solid #ddd',
                borderRadius: '3px',
              }}
            >
              <option value="Todo">Todo</option>
              <option value="In Progress">In Progress</option>
              <option value="Completed">Completed</option>
            </select>
            <button
              className="btn btn-secondary"
              onClick={() => onEdit(task)}
              style={{ padding: '5px 15px', fontSize: '14px' }}
            >
              Edit
            </button>
            <button
              className="btn btn-danger"
              onClick={() => onDelete(task.id)}
              style={{ padding: '5px 15px', fontSize: '14px' }}
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TaskList;

