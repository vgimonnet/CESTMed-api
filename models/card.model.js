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
        num: String ,
        volunteer: String,
        entryDate: {
            type: Date,
            default: null
        },
        releaseDate: {
            type: Date,
            default: null
        },
        isFed: Boolean,
        feedingComment: String,
        foodDetails: [
            {
                type: Schema.Types.ObjectId,
                ref: 'foodDetail'
            }
        ],
        isCleaned: Boolean,
        defecated: Boolean,
        treated: Boolean,
        treatingComment: String,
        otherComment: String,
        attachments: [
            {
                type: Schema.Types.ObjectId,
                ref: 'attachment'
            }
        ],
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
    const MyModel = mongoose.model('card', MySchema);
    module.exports = MyModel;
//