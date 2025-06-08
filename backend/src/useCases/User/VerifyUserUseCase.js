
const userRepo = require('../../infrastructure/DB/repositories/UserRepo');

class VerifyUserUseCase{
  static async execute(username, password) {
    const user = await userRepo.findByUsernameAndPassword(username, password);
    if (!user) {
      throw new Error('Invalid username or password');
    }
    return user.id;
  }
}

module.exports = VerifyUserUseCase;