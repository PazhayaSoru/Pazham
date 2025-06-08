const userRepo = require('../../infrastructure/DB/repositories/UserRepo');

class GetAllUsersUseCase {
  static async execute(){
    try{
      const users = await userRepo.findAll();
      return users;
    }
    catch(error){
      throw new Error("Error fetching users");
    }
  }
}

class GetUserByIdUseCase{
  async execute(id){
    try{
      const user = await userRepo.findById(id);
      return user;
    }
    catch(error){
      throw new Error("Error fetching user by ID");
    }
  }
}

class CreateUserUseCase{
  static async execute(userData){
    try{
      const newUser = await userRepo.create(userData);
      return newUser;
    }
    catch(error){
      throw new Error("Error creating user");
    }
  }
}

class UpdateUserUseCase{
  static async execute(id, userData){
    try{
      const updatedUser = await userRepo.update(id, userData);
      return updatedUser;
    }
    catch(error){
      throw new Error("Error updating user");
    }
  }
}

class DeleteUserUseCase{
  static async execute(id){
    try{
      const deletedUser = await userRepo.delete(id);
      return deletedUser;
    }
    catch(error){
      throw new Error("Error deleting user");
    }
  }
}


class VerifyUserUseCase{
  static async execute(username, password) {
    const user = await userRepo.findByUsernameAndPassword(username, password);
    if (!user) {
      throw new Error('Invalid username or password');
    }
    return user.id;
  }
}


// This code defines a UserService class that provides methods to interact with the user repository. It includes methods to get all users, get a user by ID, create a new user, update an existing user, and delete a user. Each method handles errors and returns the appropriate result or throws an error if something goes wrong.
module.exports = {
  CreateUserUseCase,
  UpdateUserUseCase,
  DeleteUserUseCase,
  GetAllUsersUseCase,
  GetUserByIdUseCase,
  VerifyUserUseCase
}
