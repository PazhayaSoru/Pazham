
const userRepo = require('../../infrastructure/DB/repositories/UserRepo');

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


module.exports = DeleteUserUseCase;