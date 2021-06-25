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
        number: String,
        species: String,
        health: String,
        size: Number,
        width: Number,
        height: Number,
        gender: String,
        weight: Number,
        old: Number,
        entryCause: String,
        comment: String,
        attachments: [
            {
                type: Schema.Types.ObjectId,
                ref: 'attachment'
            }
        ],
        cards: [
            {
                type: Schema.Types.ObjectId,
                ref: 'card'
            }
        ],
        alerts: [
            {
                type: Schema.Types.ObjectId,
                ref: 'alert'
            }
        ],
        injuries: [
            {
                type: Schema.Types.ObjectId,
                ref: 'injury'
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
    const MyModel = mongoose.model('turtle', MySchema);
    module.exports = MyModel;
//