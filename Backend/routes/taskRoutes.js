const express = require('express');
const { 
  createTask, 
  getAllTasks, 
  getTasksAssignedToUser, 
  getTasksCreatedByUser, 
  updateTaskStatus, 
  deleteTask 
} = require('../controllers/taskController');
const protect = require('../middlewares/authMiddleware');

const router = express.Router();

router.post('/create', protect, createTask);
router.get('/all', protect, getAllTasks);
router.get('/assigned-to/:userId', protect, getTasksAssignedToUser);
router.get('/assigned-by/:userId', protect, getTasksCreatedByUser);
router.put('/update/:id', protect, updateTaskStatus);
router.delete('/delete/:id', protect, deleteTask);
router.get('/assigned-by-user', protect, getTasksCreatedByUser);
router.get('/assigned-to-user', protect, getTasksAssignedToUser);

module.exports = router;
