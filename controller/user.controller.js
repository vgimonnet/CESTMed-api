/* 
Imports
*/
    const Models = require('../models/index');
    const { cryptData, decryptData } = require('../services/crypto.service');
//

/* 
Functions
*/
    // CRUD: create one
    const createOne = req => {
        return new Promise( (resolve, reject) => {
            // TODO : check if user has role before creating new user
            // Create new object
            Models.user.create(req.body)
            .then( data => resolve(data) )
            .catch( err => reject(err) )
        })
    }

    // CRUD: read all
    const readAll = () => {
        return new Promise( (resolve, reject) => {
            // TODO : check if user has role before return all users
            Models.user.find((err, data) => {
                // Check err
                return err
                ? reject(err)
                : resolve(data);
            })
        })
    }

    // CRUD: read one
    const readOne = req => {
        return new Promise( (resolve, reject) => {
            // TODO : check if user has role or is owner before return user
            Models.user.findById(req.params.id, (err, data) => {
                // Check err
                return err
                ? reject(err)
                : resolve(data)
            })
        })
    }

    // CRUD: update one
    const updateOne = req => {
        return new Promise( (resolve, reject) => {
            // TODO : check if user has role or is owner before update
            //checkIsInRole(ROLES.Contributor, ROLES.Moderator, ROLES.Admin)
            Models.user.findByIdAndUpdate(req.params.id, req.body, (err, data) => {
                // Check err
                return err
                ? reject(err)
                : resolve(data)
            })
        })
    }

    // CRUD: delete one
    const deleteOne = req => {
        return new Promise( (resolve, reject) => {
            // TODO : check if user has role or is owner before delete
            // TODO : If user's associated to beer, remove link on beer
            // TODO : If user's associated to beer, remove his collection
            // TODO : If user's associated to beer, remove his opinion
            req.body.dateUpdated = new Date();
            
            Models.user.deleteOne({ _id: req.params.id }, (err, data) => {
                // Check err
                return err
                ? reject(err)
                : resolve(data)
            })
        })
    }

    // patch one
    const patchOne = req => {
        return new Promise( (resolve, reject) => {
            // TODO : check if user has role or is owner before update
            //checkIsInRole(ROLES.Contributor, ROLES.Moderator, ROLES.Admin)
            Models.user.findByIdAndUpdate(req.params.id, { $set: req.body }, (err, data) => {
                // Check err
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
        deleteOne,
        patchOne
    }
//