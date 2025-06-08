const express = require('express');
const router = express.Router();

const {
  CreateSubUseCase,
  UpdateSubUseCase,
  DeleteSubUseCase,
  getSubsByUserIdUseCase,
} = require('../../useCases/Subscription/index'); // Adjust path if needed

// Create Subscription
router.post('/', async (req, res) => {
  try {
    const sub = await CreateSubUseCase.execute(req.body);
    res.status(201).json(sub);
  } catch (err) {
    res.status(500).json({ message: 'Failed to create subscription', error: err.message });
  }
});

// Update Subscription
router.put('/:subsId', async (req, res) => {
  try {
    const { subsId } = req.params;
    const updated = await UpdateSubUseCase.execute(subsId, req.body);
    if (!updated) return res.status(404).json({ message: 'Subscription not found' });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: 'Failed to update subscription', error: err.message });
  }
});

// Delete Subscription
router.delete('/:subsId', async (req, res) => {
  try {
    const { subsId } = req.params;
    const deleted = await DeleteSubUseCase.execute(subsId);
    if (!deleted) return res.status(404).json({ message: 'Subscription not found' });
    res.json({ message: 'Subscription deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to delete subscription', error: err.message });
  }
});

// Get Subscriptions by User ID
router.get('/user/:userId', async (req, res) => {
  try {
    const userId = parseInt(req.params.userId);
    const subs = await getSubsByUserIdUseCase.execute(userId);
    res.json(subs);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch subscriptions', error: err.message });
  }
});

module.exports = router;
