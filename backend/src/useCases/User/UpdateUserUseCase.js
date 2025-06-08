
const userRepo = require('../../infrastructure/DB/repositories/UserRepo');

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

module.exports = UpdateUserUseCase;