import { useState, useMemo, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateTask, deleteTask, fetchTasks } from '../store/slices/taskSlice';
import { fetchTaskStats } from '../store/slices/taskSlice';
import { toast } from 'react-toastify';

const TaskTable = ({ tasks, loading, onEdit, onUpdate }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const [selectedTasks, setSelectedTasks] = useState([]);
  const [contextMenu, setContextMenu] = useState(null);
  const [priorityMenu, setPriorityMenu] = useState(null);
  
  // Search and filter states
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [priorityFilter, setPriorityFilter] = useState('All');
  
  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  // Filter and search tasks
  const filteredTasks = useMemo(() => {
    let filtered = [...tasks];

    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(task => 
        task.title?.toLowerCase().includes(query) ||
        task.description?.toLowerCase().includes(query) ||
        task.id.toString().includes(query)
      );
    }

    // Status filter
    if (statusFilter !== 'All') {
      filtered = filtered.filter(task => task.status === statusFilter);
    }

    // Priority filter
    if (priorityFilter !== 'All') {
      filtered = filtered.filter(task => task.priority === priorityFilter);
    }

    return filtered;
  }, [tasks, searchQuery, statusFilter, priorityFilter]);

  // Pagination calculations
  const totalPages = Math.ceil(filteredTasks.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedTasks = filteredTasks.slice(startIndex, endIndex);

  // Reset to first page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, statusFilter, priorityFilter]);


  const handleStatusChange = (task, newStatus) => {
    dispatch(updateTask({ id: task.id, taskData: { status: newStatus } })).then(() => {
      toast.success('Task status updated successfully.');
      dispatch(fetchTasks());
      dispatch(fetchTaskStats());
    }).catch(() => {
      toast.error('Failed to update task status.');
    });
  };

  const handlePriorityChange = (task, newPriority) => {
    dispatch(updateTask({ id: task.id, taskData: { priority: newPriority } })).then(() => {
      toast.success('Task priority updated successfully.');
      dispatch(fetchTasks());
      dispatch(fetchTaskStats());
    }).catch(() => {
      toast.error('Failed to update task priority.');
    })
    setPriorityMenu(null);
  };

  const handleDelete = (taskId) => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      dispatch(deleteTask(taskId)).then(() => {
        toast.success('Task deleted successfully.');
        dispatch(fetchTasks());
        dispatch(fetchTaskStats());
      }).catch(() => {
        toast.error('Failed to delete task.');
      });
    }
  };






  const handleEdit = (task) => {
    if (onEdit) {
      onEdit(task);
    }
  };

  const handleContextMenu = (e, task) => {
    e.preventDefault();
    setContextMenu({ x: e.clientX, y: e.clientY, task });
  };

  const getStatusColor = (status) => {
    const colors = {
      'In Progress': '#ffce56',
      'Completed': '#4bc0c0',
      'Todo': '#ff9f40',
    };
    return colors[status] || '#666';
  };

  const getPriorityIcon = (priority) => {
    return priority === 'None' ? '' : '!';
  };

  const getPriorityColor = (priority) => {
    const colors = {
      'None': '#999',
      'Low': '#4bc0c0',
      'Medium': '#ffce56',
      'High': '#ff6384',
    };
    return colors[priority] || '#999';
  };

  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: '2-digit',
      day: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const truncateText = (text, maxLength = 50) => {
    if (!text) return '';
    return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
  };

  if (loading && tasks.length === 0) {
    return (
      <div className="loading">
        <div className="spinner"></div>
        <p>Loading tasks...</p>
      </div>
    );
  }

  return (
    <div className="task-table-container">
      {contextMenu && (
        <div
          className="context-menu"
          style={{ left: contextMenu.x, top: contextMenu.y }}
          onMouseLeave={() => setContextMenu(null)}
        >
      
          <div className="context-menu-item delete" onClick={() => { handleDelete(contextMenu.task.id); setContextMenu(null); }}>
            Delete
          </div>
        </div>
      )}

      {/* Search and Filters */}
      <div className="table-filters">
        <div className="search-box">
          <input
            type="text"
            placeholder="Search tasks by title, description, or ID..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="search-input"
          />
          <span className="search-icon">🔍</span>
        </div>
        <div className="filter-group">
          <select
            className="filter-select"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="All">All Status</option>        
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
            <option value="Todo">Todo</option>
          </select>
          <select
            className="filter-select"
            value={priorityFilter}
            onChange={(e) => setPriorityFilter(e.target.value)}
          >
            <option value="All">All Priority</option>
            <option value="None">None</option>
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
          <button
            className="btn-clear-filters"
            onClick={() => {
              setSearchQuery('');
              setStatusFilter('All');
              setPriorityFilter('All');
            }}
          >
            Clear Filters
          </button>
        </div>
      </div>

      <div className="table-controls">
          <div className="items-per-page">
            <label>Show:</label>
            <select
              value={itemsPerPage}
              onChange={(e) => {
                setItemsPerPage(Number(e.target.value));
                setCurrentPage(1);
              }}
              className="control-select"
            >
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="25">25</option>
              <option value="50">50</option>
            </select>
          </div>
      </div>

      {/* Results count */}
      <div className="results-info">
        Showing {startIndex + 1}-{Math.min(endIndex, filteredTasks.length)} of {filteredTasks.length} tasks
        {filteredTasks.length !== tasks.length && ` (filtered from ${tasks.length} total)`}
      </div>

      <table className="task-table">
        <thead>
          <tr>
            
            <th>#</th>
            <th>Task</th>
            <th>Description</th>
            <th>Owner</th>
            <th>Status</th>
            <th>Start Date</th>
            <th>End Date</th>
            <th>Priority</th>            
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {paginatedTasks.length === 0 ? (
            <tr>
              <td colSpan="10" style={{ textAlign: 'center', padding: '40px', color: '#666' }}>
                {searchQuery || statusFilter !== 'All' || priorityFilter !== 'All' 
                  ? 'No tasks match your filters. Try adjusting your search criteria.'
                  : 'No tasks found. Create your first task!'}
              </td>
            </tr>
          ) : (
            paginatedTasks.map((task) => (
              <tr
                key={task.id}
                onContextMenu={(e) => handleContextMenu(e, task)}
                className={selectedTasks.includes(task.id) ? 'selected' : ''}
              >
                
                <td>PR-{task.id}</td>
                <td className="task-title">{task.title}</td>
                <td className="task-description" title={task.description || ''}>
                  {truncateText(task.description || 'No description')}
                </td>
                <td>
                  <div className="owner-cell">
                    <div className="owner-avatar">
                      {task.owner?.name?.charAt(0).toUpperCase() || user?.name?.charAt(0).toUpperCase()}
                    </div>
                    <span>{task.owner?.name || 'Unassigned'}</span>
                  </div>
                </td>
                <td>
                  <select
                    value={task.status}
                    onChange={(e) => handleStatusChange(task, e.target.value)}
                    className="status-select"
                    style={{ borderColor: getStatusColor(task.status) }}
                  >                    
                    <option value="Todo">Todo</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Completed">Completed</option>                  
                  </select>
                </td>
                <td>{formatDate(task.startDate || task.createdAt)}</td>
                <td>{task.endDate? formatDate(task.endDate): task.status === "Completed"? formatDate(task.updatedAt): "-"}</td>
                <td>
                  <div className="priority-cell" onClick={(e) => {
                    e.stopPropagation();
                    setPriorityMenu(priorityMenu === task.id ? null : task.id);
                  }}>
                    <span className="priority-icon" style={{ color: getPriorityColor(task.priority) }}>
                      {getPriorityIcon(task.priority)}
                    </span>
                    <span>{task.priority}</span>
                    {priorityMenu === task.id && (
                      <div className="priority-menu" onMouseLeave={() => setPriorityMenu(null)}>
                        <div onClick={() => handlePriorityChange(task, 'None')}>! None</div>
                        <div onClick={() => handlePriorityChange(task, 'Low')}>! Low</div>
                        <div onClick={() => handlePriorityChange(task, 'Medium')}>! Medium</div>
                        <div onClick={() => handlePriorityChange(task, 'High')}>! High</div>
                      </div>
                    )}
                  </div>
                </td>
               
                <td>
                  <div className="task-actions">
                    <button
                      className="btn-action edit"
                      onClick={(e) => { e.preventDefault(); handleEdit(task)}}
                      title="Edit Task"
                    >
                      ✏️
                    </button>
                    <button
                      className="btn-action delete"
                      onClick={(e) => {
                        e.preventDefault();
                        handleDelete(task.id)
                      }}
                      title="Delete Task"
                    >
                      🗑️
                    </button>
                  </div>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="pagination">
          <button
            className="pagination-btn"
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            Previous
          </button>
          <div className="pagination-info">
            Page {currentPage} of {totalPages}
          </div>
          <div className="pagination-numbers">
            {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
              let pageNum;
              if (totalPages <= 5) {
                pageNum = i + 1;
              } else if (currentPage <= 3) {
                pageNum = i + 1;
              } else if (currentPage >= totalPages - 2) {
                pageNum = totalPages - 4 + i;
              } else {
                pageNum = currentPage - 2 + i;
              }
              return (
                <button
                  key={pageNum}
                  className={`pagination-number ${currentPage === pageNum ? 'active' : ''}`}
                  onClick={() => handlePageChange(pageNum)}
                >
                  {pageNum}
                </button>
              );
            })}
          </div>
          <button
            className="pagination-btn"
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default TaskTable;
