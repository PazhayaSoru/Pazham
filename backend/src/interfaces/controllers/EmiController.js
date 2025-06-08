const express = require('express');
const router = express.Router();

const {
  CreateEmiUseCase,
  UpdateEmiUseCase,
  DeleteEmiUseCase,
  GetEmiByUserIduseCase,
} = require('../../useCases/Emi/index'); // Adjust path if needed

// Create EMI
router.post('/', async (req, res) => {
  try {
    const emi = await CreateEmiUseCase.execute(req.body);
    res.status(201).json(emi);
  } catch (err) {
    res.status(500).json({ message: 'Failed to create EMI', error: err.message });
  }
});

// Update EMI
router.put('/:emiId', async (req, res) => {
  try {
    const updated = await UpdateEmiUseCase.execute(req.params.emiId, req.body);
    if (!updated) return res.status(404).json({ message: 'EMI not found' });
    res.status(200).json(updated);
  } catch (err) {
    res.status(500).json({ message: 'Failed to update EMI', error: err.message });
  }
});

// Delete EMI
router.delete('/:emiId', async (req, res) => {
  try {
    const deleted = await DeleteEmiUseCase.execute(req.params.emiId);
    if (!deleted) return res.status(404).json({ message: 'EMI not found' });
    res.json({ message: 'EMI deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to delete EMI', error: err.message });
  }
});

// Get EMI by User ID
router.get('/user/:userId', async (req, res) => {
  try {
    const userId = parseInt(req.params.userId);
    const emis = await GetEmiByUserIduseCase.execute(userId);
    res.status(200).json(emis);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch EMIs', error: err.message });
  }
});

module.exports = router;
