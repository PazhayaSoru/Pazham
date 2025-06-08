class User {
  constructor({ id, username, email, password, city, montly_income }) {
    this.id = id;
    this.username = username;
    this.email = email;
    this.password = password;
    this.city = city;
    this.montly_income = montly_income;
  }
}
module.exports = User;