/* 
Imports
*/
    const Models = require('../models/index');
//

/* 
Functions
*/
    const createOne = req => {
        return new Promise( (resolve, reject) => {
            Models.alert.create(req.body)
            .then(newAttachment => resolve(newAttachment) )
            .catch( err => reject(err) )
        })
    }

    const readAll = () => {
        return new Promise( (resolve, reject) => {
            Models.alert.find()
            .populate({
                path: 'turtle',
            })
            .exec((err, data) => {
                return err
                ? reject(err)
                : resolve(data);
            })
        })
    }

    const readOne = req => {
        return new Promise( (resolve, reject) => {
            Models.alert.findById(req.params.id)
            .populate({
                path: 'turtle',
            })
            .exec((err, data) => {
                return err
                ? reject(err)
                : resolve(data)
            })
        })
    }

    const updateOne = req => {
        return new Promise( (resolve, reject) => {
            req.body.dateUpdated = new Date();

            Models.alert.findByIdAndUpdate(req.params.id, req.body, (err, turtle) => {
                return err
                ? reject(err)
                : resolve(turtle)                
            })
        })
    }

    const deleteOne = req => {
        return new Promise( (resolve, reject) => {
            Models.alert.deleteOne({ _id: req.params.id }, (err, data) => {
                return err
                ? reject(err)
                : resolve(data)
            })
        })
    }


//

/* 
Export
*/
    module.exports = {
        createOne,
        readAll,
        readOne,
        updateOne,
        deleteOne
    }
//