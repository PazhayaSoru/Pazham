
const userRepo = require('../../infrastructure/DB/repositories/UserRepo');

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

module.exports = GetUserByIdUseCase;