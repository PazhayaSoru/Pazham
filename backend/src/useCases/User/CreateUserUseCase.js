
const userRepo = require('../../infrastructure/DB/repositories/UserRepo');

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

module.exports = CreateUserUseCase;