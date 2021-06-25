const { Model } = require('mongoose')

/* 
Definition
*/
    const Models = {
        user: require('./user.model'),
        turtle: require('./turtle.model'),
        attachment: require('./attachment.model'),
        food: require('./food.model'),
        foodDetail: require('./foodDetail.model'),
        card: require('./card.model'),
        alert: require('./alert.model'),
        volunteer: require('./volunteer.model'),
        injury: require('./injury.model'),
    }
//

/* 
Export
*/
    module.exports = Models;
//