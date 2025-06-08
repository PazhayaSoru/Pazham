const express = require('express');
const router = express.Router();

const {
  CreateTransactionUseCase,
  UpdateTransactionUseCase,
  DeleteTransactionUseCase,
  GetTransactionByIdUseCase,
  GetTransactionsByUserIdUseCase
} = require('../../useCases/Transaction/index'); // Adjust path if needed

// Get all transactions for the current user
router.get('/user/:userId', async (req, res) => {
  try {
    const txs = await GetTransactionsByUserIdUseCase.execute(req.params.userId);
    res.status(200).json(txs);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch transactions" });
  }
});

// Get transaction by ID
router.get('/:id', async (req, res) => {
  try {
    const tx = await GetTransactionByIdUseCase.execute(req.params.id);
    res.status(200).json(tx);
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
});

// Create a new transaction
router.post('/', async (req, res) => {
  try {
    const tx = await CreateTransactionUseCase.execute(req.body);
    res.status(201).json(tx);
  } catch (error) {
    res.status(500).json({ error: "Failed to create transaction" });
  }
});

// Update a transaction
router.put('/:id', async (req, res) => {
  try {
    const tx = await UpdateTransactionUseCase.execute(req.params.id, req.body);
    res.status(200).json(tx);
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
});

// Delete a transaction
router.delete('/:id', async (req, res) => {
  try {
    await DeleteTransactionUseCase.execute(req.params.id);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: "Failed to delete transaction" });
  }
});

module.exports = router;
