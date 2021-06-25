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
            Models.food.create(req.body)
            .then(data => resolve(data) )
            .catch( err => reject(err) )
        })
    }

    const readAll = () => {
        return new Promise( (resolve, reject) => {
            Models.food.find()
            .populate({
                path: 'foodDetails',                
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
            Models.food.findById(req.params.id)
            .populate({
                path: 'foodDetails',
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

            Models.food.findByIdAndUpdate(req.params.id, req.body, (err, data) => {
                return err
                ? reject(err)
                : resolve(data)
            })
        })
    }

    const deleteOne = req => {
        return new Promise( (resolve, reject) => {
            Models.food.deleteOne({ _id: req.params.id }, (err, data) => {
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