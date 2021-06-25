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
        path: String,
        isMedicalDoc: Boolean,
        turtle: {
            type: Schema.Types.ObjectId,
            ref: 'turtle'
        },
        card: {
            type: Schema.Types.ObjectId,
            ref: 'card'
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
    const MyModel = mongoose.model('attachment', MySchema);
    module.exports = MyModel;
//