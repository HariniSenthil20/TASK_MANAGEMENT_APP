const express = require('express');
const router = express.Router();
const {
  getTasks,
  getTask,
  createTask,
  updateTask,
  deleteTask,
  getTaskStats,
} = require('../controllers/taskController');
const { protect } = require('../middleware/auth');

// All routes are protected
router.use(protect);

router.route('/').get(getTasks).post(createTask);
router.route('/stats').get(getTaskStats);
router.route('/:id').get(getTask).put(updateTask);
router.route('/deleteTask/:id').put(deleteTask);

module.exports = router;

