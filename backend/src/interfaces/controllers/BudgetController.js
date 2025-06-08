const express = require('express');
const router = express.Router();

const {
  GetUserByIdUseCase,
  CreateBudgetUseCase,
  UpdateBudgetUseCase,
  DeleteBudgetUseCase,
  GetBudgetByIdUseCase
} = require('../../useCases/Budget/index'); // Adjust path if needed

// Get all budgets for the current user
router.get('/user/:userId', async (req, res) => {
  try {
    const bgs = await GetUserByIdUseCase.execute(req.params.userId);
    res.status(200).json(bgs);
  } catch (error) {
    console.error("Error fetching budgets by user:", error);
    res.status(500).json({ error: "Failed to fetch budgets" });
  }
});

// Get budget by ID
router.get('/:id', async (req, res) => {
  try {
    const bg = await GetBudgetByIdUseCase.execute(req.params.id);
    res.status(200).json(bg);
  } catch (err) {
    console.error("Error fetching budget:", err);
    res.status(404).json({ error: err.message });
  }
});

// Create a new budget
router.post('/', async (req, res) => {
  try {
    const bg = await CreateBudgetUseCase.execute(req.body);
    res.status(201).json(bg);
  } catch (error) {
    res.status(500).json({ error: "Failed to create budget" });
  }
});

// Update a budget
router.put('/:id', async (req, res) => {
  try {
    const bg = await UpdateBudgetUseCase.execute(req.params.id, req.body);
    res.status(200).json(bg);
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
});

// Delete a budget
router.delete('/:id', async (req, res) => {
  try {
    await DeleteBudgetUseCase.execute(req.params.id);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: "Failed to delete budget" });
  }
});

module.exports = router;
