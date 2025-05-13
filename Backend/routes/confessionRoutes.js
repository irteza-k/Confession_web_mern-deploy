const express = require('express');
const router = express.Router();
const {
  postConfession,
  getConfessions,
  getConfession,
  updateConfession,
  deleteConfession,
  getUserConfessions,
  reactToConfession,
  commentOnConfession
} = require('../controllers/confessionController');
const { protect, admin } = require('../middleware/authMiddleware');

// Public routes
router.get('/', getConfessions);
router.get('/:id', getConfession);

// Protected routes
router.post('/', protect, postConfession);
router.get('/user/confessions', protect, getUserConfessions);
router.put('/:id', protect, updateConfession);
router.delete('/:id', protect, deleteConfession);
router.post('/:id/react', protect, reactToConfession);
router.post('/:id/comment', protect, commentOnConfession);

// Admin routes
router.delete('/admin/:id', protect, admin, deleteConfession);
router.put('/admin/:id', protect, admin, updateConfession);

module.exports = router;
