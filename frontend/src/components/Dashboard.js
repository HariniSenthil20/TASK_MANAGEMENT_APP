import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  fetchTasks,
  fetchTaskStats,
  updateTask,
  deleteTask,
} from '../store/slices/taskSlice';
import Sidebar from './Sidebar';
import Header from './Header';
import TaskTable from './TaskTable';
import TaskStats from './TaskStats';

const Dashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const { tasks, stats, loading } = useSelector((state) => state.tasks);
  const [activeTab, setActiveTab] = useState('tasks');

  const handleNavClick = (tabId) => {
    setActiveTab(tabId);
  };

  useEffect(() => {
    dispatch(fetchTasks());
    dispatch(fetchTaskStats());
  }, [dispatch]);

  // Refresh tasks when returning from edit page
  useEffect(() => {
    const handleFocus = () => {
      dispatch(fetchTasks());
      dispatch(fetchTaskStats());
    };
    window.addEventListener('focus', handleFocus);
    return () => window.removeEventListener('focus', handleFocus);
  }, [dispatch]);

  const handleEditTask = (task) => {
    navigate(`/tasks/edit/${task.id}`);
  };

  const handleUpdateTask = (id, taskData) => {
    dispatch(updateTask({ id, taskData })).then(() => {
      dispatch(fetchTasks());
      dispatch(fetchTaskStats());
    });
  };

  const handleDeleteTask = (id) => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      dispatch(deleteTask(id)).then(() => {
        dispatch(fetchTasks());
        dispatch(fetchTaskStats());
      });
    }
  };

  return (
    <div className="app-layout">
      <Sidebar onNavClick={handleNavClick} activeTab={activeTab} />
      <div className="main-content">
        <Header activeTab={activeTab} onTabChange={setActiveTab} />
        <div className="content-area">
          {activeTab === 'dashboard' && (
            <div>
              <div className="page-header">
                <h2>Dashboard</h2>
              </div>
              <TaskStats stats={stats} loading={loading} />
            </div>
          )}

          {activeTab === 'tasks' && (
            <div>
              <div className="page-header">
                <h2>Tasks</h2>
                <button
                  className="btn btn-primary"
                  onClick={() => navigate('/tasks/new')}
                >
                  + Add Task
                </button>
              </div>
              <TaskTable
                tasks={tasks}
                loading={loading}
                onEdit={handleEditTask}
                onUpdate={handleUpdateTask}
                onDelete={handleDeleteTask}
              />
            </div>
          )}

          {activeTab === 'feed' && (
            <div className="card">
              <h2>Activity Feed</h2>
              <div className="feed-container">
                {tasks.length > 0 ? (
                  tasks.slice(0, 5).map((task) => (
                    <div key={task.id} className="feed-item">
                      <div className="feed-avatar">{user?.name?.charAt(0).toUpperCase()}</div>
                      <div className="feed-content">
                        <div className="feed-text">
                          <strong>{user?.name}</strong> created task <strong>{task.title}</strong>
                        </div>
                        <div className="feed-time">
                          {new Date(task.createdAt).toLocaleString()}
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <p>No activity to display</p>
                )}
              </div>
            </div>
          )}

          {activeTab === 'calendar' && (
            <div className="card">
              <h2>Calendar</h2>
              <div className="calendar-container">
                <div className="calendar-view">
                  <p style={{ color: '#666', textAlign: 'center', padding: '40px' }}>
                    Calendar view coming soon. Your tasks with start dates will appear here.
                  </p>
                  {tasks.filter(t => t.startDate).length > 0 && (
                    <div className="upcoming-tasks">
                      <h3>Upcoming Tasks</h3>
                      {tasks
                        .filter(t => t.startDate && new Date(t.startDate) >= new Date())
                        .sort((a, b) => new Date(a.startDate) - new Date(b.startDate))
                        .slice(0, 5)
                        .map(task => (
                          <div key={task.id} className="calendar-task">
                            <div className="calendar-date">
                              {new Date(task.startDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                            </div>
                            <div className="calendar-task-info">
                              <strong>{task.title}</strong>
                              <span className="calendar-status">{task.status}</span>
                            </div>
                          </div>
                        ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}         
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
