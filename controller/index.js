const { Model } = require('mongoose')

/* 
Definition
*/
    const Controllers = {
        auth: require('./auth.controller'),
        user: require('./user.controller'),
        turtle: require('./turtle.controller'),
        attachment: require('./attachment.controller'),
        food: require('./food.controller'),
        foodDetail: require('./foodDetail.controller'),
        card: require('./card.controller'),
        alert: require('./alert.controller'),
        volunteer: require('./volunteer.controller'),
        injury: require('./injury.controller')
    }
//

/* 
Export
*/
    module.exports = Controllers;
//