import { Doughnut, Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
} from 'chart.js';

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  Title
);

const TaskStats = ({ stats, loading }) => {
  if (loading) {
    return (
      <div className="card">
        <div className="loading">
          <div className="spinner"></div>
        </div>
      </div>
    );
  }

  const doughnutData = {
    labels: ['Todo', 'In Progress', 'Completed'],
    datasets: [
      {
        label: 'Tasks',
        data: [stats.todo, stats.inProgress, stats.completed],
        backgroundColor: [
          'rgba(255, 99, 132, 0.6)',
          'rgba(54, 162, 235, 0.6)',
          'rgba(75, 192, 192, 0.6)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(75, 192, 192, 1)',
        ],
        borderWidth: 2,
      },
    ],
  };

  const barData = {
    labels: ['Todo', 'In Progress', 'Completed'],
    datasets: [
      {
        label: 'Number of Tasks',
        data: [stats.todo, stats.inProgress, stats.completed],
        backgroundColor: [
          'rgba(255, 99, 132, 0.6)',
          'rgba(54, 162, 235, 0.6)',
          'rgba(75, 192, 192, 0.6)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(75, 192, 192, 1)',
        ],
        borderWidth: 2,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Task Statistics',
      },
    },
  };

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '20px' }}>
      <div className="card">
        <h3 style={{ marginBottom: '20px' }}>Task Distribution</h3>
        <Doughnut data={doughnutData} options={options} />
      </div>
      <div className="card">
        <h3 style={{ marginBottom: '20px' }}>Task Status Bar Chart</h3>
        <Bar data={barData} options={options} />
      </div>
      <div className="card" style={{ gridColumn: '1 / -1' }}>
        <h3 style={{ marginBottom: '20px' }}>Summary</h3>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: '20px',
            textAlign: 'center',
          }}
        >
          <div>
            <h4 style={{ color: '#666' }}>Total Tasks</h4>
            <p style={{ fontSize: '32px', fontWeight: 'bold', color: '#333' }}>
              {stats.total}
            </p>
          </div>
          <div>
            <h4 style={{ color: '#ff6384' }}>Todo</h4>
            <p style={{ fontSize: '32px', fontWeight: 'bold', color: '#ff6384' }}>
              {stats.todo}
            </p>
          </div>
          <div>
            <h4 style={{ color: '#36a2eb' }}>In Progress</h4>
            <p style={{ fontSize: '32px', fontWeight: 'bold', color: '#36a2eb' }}>
              {stats.inProgress}
            </p>
          </div>
          <div>
            <h4 style={{ color: '#4bc0c0' }}>Completed</h4>
            <p style={{ fontSize: '32px', fontWeight: 'bold', color: '#4bc0c0' }}>
              {stats.completed}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskStats;

