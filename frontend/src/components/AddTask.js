import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { createTask, updateTask, fetchTasks } from '../store/slices/taskSlice';
import { fetchTaskStats } from '../store/slices/taskSlice';
import Sidebar from './Sidebar';
import Header from './Header';

const AddTask = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const { user } = useSelector((state) => state.auth);
  const { tasks } = useSelector((state) => state.tasks);
  const [activeTab, setActiveTab] = useState('tasks');

  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch]);

  const handleNavClick = (tabId) => {
    setActiveTab(tabId);
    if (tabId !== 'tasks') {
      navigate('/dashboard');
    }
  };

  const editingTask = id ? tasks.find((t) => t.id === parseInt(id)) : null;

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    status: 'Open',
    priority: 'None',
    startDate: new Date().toISOString().split('T')[0],
    endDate: new Date().toISOString().split('T')[0],   
    ownerId: user?.id,
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (editingTask) {
      setFormData({
        title: editingTask.title,
        description: editingTask.description || '',
        status: editingTask.status,
        priority: editingTask.priority || 'None',
        startDate: editingTask.startDate
          ? new Date(editingTask.startDate).toISOString().split('T')[0]
          : new Date().toISOString().split('T')[0],
        endDate: editingTask.endDate
          ? new Date(editingTask.endDate).toISOString().split('T')[0]
          : new Date().toISOString().split('T')[0],
        ownerId: editingTask.ownerId || user?.id,
      });
    }
  }, [editingTask, user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
      
    });
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: '',
      });
    }
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.title.trim()) {
      newErrors.title = 'Title is required';
    } else if (formData.title.trim().length < 3) {
      newErrors.title = 'Title must be at least 3 characters';
    }

    

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) {
      return;
    }

    try {
      if (editingTask) {
        await dispatch(updateTask({ id: editingTask.id, taskData: formData })).unwrap();
      } else {
        await dispatch(createTask(formData)).unwrap();
      }
      dispatch(fetchTasks());
      dispatch(fetchTaskStats());
      navigate('/dashboard');
    } catch (error) {
      setErrors({ submit: error || 'Failed to save task' });
    }
  };

  return (
    <div className="app-layout">
      <Sidebar onNavClick={handleNavClick} activeTab={activeTab} />
      <div className="main-content">
        <Header activeTab={activeTab} onTabChange={setActiveTab} />
        <div className="content-area">
          <div className="page-header">
            <h2>{editingTask ? 'Edit Task' : 'Add New Task'}</h2>
            <button className="btn btn-secondary" onClick={() => navigate('/dashboard')}>
              Cancel
            </button>
          </div>

          <div className="card" style={{ maxWidth: '800px', margin: '20px auto' }}>
            {errors.submit && (
              <div className="error-message" style={{ marginBottom: '15px' }}>
                {errors.submit}
              </div>
            )}

            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Task Title *</label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="Enter task title"
                />
                {errors.title && <div className="error-message">{errors.title}</div>}
              </div>

              <div className="form-group">
                <label>Description</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Enter task description"
                  rows="4"
                  style={{ width: '100%', padding: '10px', border: '1px solid #ddd', borderRadius: '5px', fontFamily: 'inherit', fontSize: '16px' }}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                <div className="form-group">
                  <label>Status</label>
                  <select name="status" value={formData.status} onChange={handleChange}>               
                    <option value="In Progress">In Progress</option>
                    <option value="Completed">Completed</option>                                      
                    <option value="Todo">Todo</option>
                  </select>
                </div>

                <div className="form-group">
                  <label>Priority</label>
                  <select name="priority" value={formData.priority} onChange={handleChange}>
                    <option value="None">None</option>
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                  </select>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                <div className="form-group">
                  <label>Start Date</label>
                  <input
                    type="date"
                    name="startDate"
                    value={formData.startDate}
                    onChange={handleChange}
                  />
                </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                <div className="form-group">
                  <label>End Date</label>
                  <input
                    type="date"
                    name="endDate"
                    value={formData.endDate}
                    onChange={handleChange}
                  />
                </div>
              </div>
                
              </div>

              <div style={{ display: 'flex', gap: '10px', marginTop: '20px' }}>
                <button type="submit" className="btn btn-primary">
                  {editingTask ? 'Update Task' : 'Create Task'}
                </button>
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => navigate('/dashboard')}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddTask;

