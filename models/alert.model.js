/* 
Imports
*/
    const mongoose = require('mongoose');  //=> https://www.npmjs.com/package/mongoose
    const { Schema } = mongoose;
//

/* 
Definition
*/
    const MySchema = new Schema({
        title: String,
        text: String,
        endDate: {
            type: Date,
            default: null
        },
        turtle: {
            type: Schema.Types.ObjectId,
            ref: 'turtle'
        },
        
        
        // Always use those properties
        author: {
            type: Schema.Types.ObjectId,
            ref: 'user'
        },
        dateCreated: {
            type: Date,
            default: new Date()
        },
        dateUpdated: {
            type: Date,
            default: null
        }
    })
//

/* 
Exports
*/
    const MyModel = mongoose.model('alert', MySchema);
    module.exports = MyModel;
//