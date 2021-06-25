/* 
Imports
*/
    const Models = require('../models/index')
    const multer = require('multer')
//

/* 
Functions
*/
    const createOne = req => {
        return new Promise( (resolve, reject) => {
            const now = new Date()
            req.body.number = `${req.body.species}.${now.getFullYear()}.${now.getMonth() < 9 ? `0${(now.getMonth() + 1)}` : (now.getMonth() + 1)}.${now.getDate()}`
            Models.turtle.find().count((err, count) => {
                nbTurtles = count
                if (count < 10) {
                    req.body.number += `.00${count}`
                } else if (count < 100) {
                    req.body.number += `.0${count}`
                } else {
                    req.body.number += `.${count}`
                }

                Models.turtle.create(req.body)
                .then(newTurtle => {
                    let dataInjuries = []
                    if (req.body.injuriesData.length > 0) {
                        req.body.injuriesData.forEach( (injury) => {
                            injury.turtle = newTurtle._id
                            Models.injury.create(injury)
                            .then((newInjury) => {
                                Models.turtle.findByIdAndUpdate(newTurtle._id, { $push: { injuries: newInjury._id}}, (err, data) => {
                                    if (err) {
                                        return reject(err)
                                    } else {
                                        dataInjuries.push(data)
                                    }
                                });
                            })
                        })
                    }

                    let dataAttachments = []
                    if (req.body.picturesData.length > 0) {
                        req.body.picturesData.forEach( (attachment) => {
                            attachment.turtle = newTurtle._id
                            Models.attachment.create(attachment)
                            .then((newAttachment) => {
                                Models.turtle.findByIdAndUpdate(newTurtle._id, { $push: { attachments: newAttachment._id}}, (err, data) => {
                                    if (err) {
                                        return reject(err)
                                    } else {
                                        dataAttachments.push(data)
                                    }
                                });
                            })
                        })
                    }

                    return resolve({turtle: newTurtle, injuries: dataInjuries})
                } )
                .catch( err => reject(err) )
            })
        })
    }

    const readAll = () => {
        return new Promise( (resolve, reject) => {
            Models.turtle.find()
            .populate({
                path: 'injuries',
            })
            .populate({
                path: 'alerts',
            })
            .populate({
                path: 'cards',
            })
            .populate({
                path: 'attachments',
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
            Models.turtle.findById(req.params.id)
            .populate({
                path: 'injuries',
            })
            .populate({
                path: 'alerts',
            })
            .populate({
                path: 'cards',
            })
            .populate({
                path: 'attachments',
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

            Models.turtle.findByIdAndUpdate(req.params.id, req.body, (err, turtle) => {
                return err
                ? reject(err)
                : resolve(turtle)                
            })
        })
    }

    const deleteOne = req => {
        return new Promise( (resolve, reject) => {
            Models.turtle.deleteOne({ _id: req.params.id }, (err, data) => {
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