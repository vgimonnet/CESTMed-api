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
            Models.card.create(req.body)
            .then(data => resolve(data) )
            .catch( err => reject(err) )
        })
    }

    const readAll = () => {
        return new Promise( (resolve, reject) => {
            Models.card.find()
            .populate({
                path: 'turtle',
            })
            .populate({
                path: 'attachments',
            })
            .populate({
                path: 'foodDetails',
                populate: {
                    path: 'food',
                }
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
            Models.card.findById(req.params.id)
            .populate({
                path: 'turtle',
            })
            .populate({
                path: 'attachments',
            })
            .populate({
                path: 'foodDetails',
                populate: {
                    path: 'food',
                }
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

            Models.card.findByIdAndUpdate(req.params.id, req.body, (err, data) => {
                return err
                ? reject(err)
                : resolve(data)                
            })
        })
    }

    const deleteOne = req => {
        return new Promise( (resolve, reject) => {
            Models.card.deleteOne({ _id: req.params.id }, (err, data) => {
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