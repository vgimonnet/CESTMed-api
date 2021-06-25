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
        name: String,
        foodDetails: [
            {
                type: Schema.Types.ObjectId,
                ref: 'food'
            }
        ],
        
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
    const MyModel = mongoose.model('food', MySchema);
    module.exports = MyModel;
//