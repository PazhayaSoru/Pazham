const express = require('express');
const router = express.Router();
const User = require('../../infrastructure/DB/models/UserModel');

const {
  CreateUserUseCase,
  UpdateUserUseCase,
  DeleteUserUseCase,
  GetAllUsersUseCase,
  GetUserByIdUseCase,
  VerifyUserUseCase
} = require('../../useCases/User/index'); // Assuming your usecase file is here

// Get all users
router.get('/', async (req, res) => {
  try {
    const users = await GetAllUsersUseCase.execute();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ failure: "Error fetching users" });
  }
});

// Get user by ID
router.get('/:id', async (req, res) => {
  try {
    const usecase = new GetUserByIdUseCase();
    const user = await usecase.execute(req.params.id);
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ failure: error.message });
  }
});

// Create a new user
router.post('/', async (req, res) => {
  try {
    const userWithMaxId = await User.findOne({ order: [['id', 'DESC']] });
    const nextId = userWithMaxId ? userWithMaxId.id + 1 : 1;

    const user = await CreateUserUseCase.execute({ id: nextId, ...req.body });
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ failure: "Unable to create user" });
  }
});

// Update a user
router.put('/:id', async (req, res) => {
  try {
    const updatedUser = await UpdateUserUseCase.execute(req.params.id, req.body);
    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(500).json({ failure: "Unable to update user" });
  }
});

// Delete a user
router.delete('/:id', async (req, res) => {
  try {
    await DeleteUserUseCase.execute(req.params.id);
    res.status(204).json({ success: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ failure: "Unable to delete user" });
  }
});

// Login
router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    const userId = await VerifyUserUseCase.execute(username, password);
    res.status(200).json({ userId });
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
});

module.exports = router;
