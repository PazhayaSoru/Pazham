
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

module.exports = GetAllUsersUseCase;