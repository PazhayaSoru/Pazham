const User = require('../models/UserModel');

class UserRepository {
  async findAll() {
    try {
      const users = await User.findAll();
      console.log(typeof(users));
      return users;
    } catch (error) {
      throw new Error('Error fetching users: ' + error.message);
    }
  }

  async findById(id) {
    try {
      const user = await User.findByPk(id);
      if (!user) {
        throw new Error('User not found');
      }
      return user;
    } catch (error) {
      throw new Error('Error fetching user: ' + error.message);
    }
  }
  async create(userData) {
    try {
      const newUser = await User.create(userData);
      return newUser;
    } catch (error) {
      throw new Error('Error creating user: ' + error.message);
    }
  }
  async update(id, userData) {
    try {
      const user = await User.findByPk(id);
      if (!user) {
        throw new Error('User not found');
      }
      await user.update(userData);
      return user;
    } catch (error) {
      throw new Error('Error updating user: ' + error.message);
    }
  }
  async delete(id) {
    try {
      const user = await User.findByPk(id);
      if (!user) {
        throw new Error('User not found');
      }
      await user.destroy();
      return user;
    } catch (error) {
      throw new Error('Error deleting user: ' + error.message);
    }
  }

  async findByUsernameAndPassword(username, password) {
    try {
      const user = await User.findOne({ where: { username, password } });
      return user;
    } catch (error) {
      throw new Error('Error verifying user: ' + error.message);
    }
  }
}

// This code defines a UserRepository class that interacts with the User model to perform CRUD operations. It includes methods to find all users, find a user by ID, create a new user, update an existing user, and delete a user. Each method handles errors and returns the appropriate result or throws an error if something goes wrong.
module.exports = new UserRepository();
