const express = require('express');
const router = express.Router();

const {
  CreateDueUseCase,
  UpdateDueUseCase,
  DeleteDueUseCase,
  GetDuesByUserIdUseCase,
} = require('../../useCases/Due/index'); // Adjust the path if needed

// Create Due
router.post('/', async (req, res) => {
  try {
    const due = await CreateDueUseCase.execute(req.body);
    res.status(201).json(due);
  } catch (err) {
    res.status(500).json({ message: 'Failed to create due', error: err.message });
  }
});

// Update Due
router.put('/:duesId', async (req, res) => {
  try {
    const { duesId } = req.params;
    const updated = await UpdateDueUseCase.execute(duesId, req.body);
    if (!updated) return res.status(404).json({ message: 'Due not found' });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: 'Failed to update due', error: err.message });
  }
});

// Delete Due
router.delete('/:duesId', async (req, res) => {
  try {
    const { duesId } = req.params;
    const deleted = await DeleteDueUseCase.execute(duesId);
    if (!deleted) return res.status(404).json({ message: 'Due not found' });
    res.json({ message: 'Due deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to delete due', error: err.message });
  }
});

// Get Dues by User ID
router.get('/user/:userId', async (req, res) => {
  try {
    const userId = parseInt(req.params.userId);
    const dues = await GetDuesByUserIdUseCase.execute(userId);
    res.json(dues);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch dues', error: err.message });
  }
});

module.exports = router;
