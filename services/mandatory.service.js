/*
  Defintion
*/
  const Mandatory = {
    register: ['username', 'email', 'password'],
    login: ['identifiant', 'password'],
    changePassword: ['password', 'newPassword', 'newPasswordRepeat'],
    user: ['username', 'email', 'role'],
    turtle: ['name', 'species', 'health', 'size', 'width', 'height', 'weight', 'old', 'gender'],
    food: ['name'],
    alert: ['title', 'text', 'turtle'],
    injury: ['coordX', 'coordY', 'side']
  }
//

/*
  Export
*/
  module.exports = Mandatory
//