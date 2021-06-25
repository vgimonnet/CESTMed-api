/* 
Imports
*/
    const bcrypt = require('bcryptjs');
    const Models = require('../models/index');
    const { cryptData, decryptData } = require('../services/crypto.service');
//

/* 
Functions
*/
    // CRUD: create one
    const register = req => {
        return new Promise( (resolve, reject) => {
            // [RGPD] crypt user data
            // req.body.firstname = cryptData(req.body.firstname);
            // req.body.lastname = cryptData(req.body.lastname);

            // [Bcrypt] password
            bcrypt.hash( req.body.password, 10 )
            .then( hashedPassword => {
                // Change user password
                req.body.password = hashedPassword;

                // Register new user
                Models.user.create(req.body)
                .then( data => resolve(data) )
                .catch( err => reject(err) )
            })
            .catch( bcryptError => reject(bcryptError))
        })
    }

    const login = (req, res) => {
        return new Promise( (resolve, reject) => {
            // Get all post from MongoDB
            Models.user.findOne( { $or: [{email: req.body.identifiant}, {username: req.body.identifiant}] } )
            .then( data => {
                // Check password
                const passwordValidation = bcrypt.compareSync( req.body.password, data.password );
                if( passwordValidation) {
                    // Decrypt user info
                    const decryptedUser = decryptData(data, 'firstname', 'lastname');

                    // Set user JWT
                    const userToken = data.generateJwt(data);

                    // Save JWT in the cookie response
                    res.cookie(process.env.COOKIE_NAME, userToken, { httpOnly: true });

                    // Return data
                    return resolve(decryptedUser)
                }
                else{ return reject('Password not valid') }
            })
            .catch( err => reject(err) )
        })
    }

    
    // change user password
    const changePassword = req => {
        return new Promise( (resolve, reject) => {
            if (req.user._id == req.params.id) { // check if same user                
                const passwordValidation = bcrypt.compareSync( req.body.password, req.user.password )
                if (passwordValidation) { //check correct password
                    if (req.body.password !== req.body.newPassword) {
                        if (req.body.newPassword === req.body.newPasswordRepeat) {
                            bcrypt.hash( req.body.newPassword, 10 )
                            .then((hashedPassword) => {
                                Models.user.findByIdAndUpdate(req.params.id, { $set: { password: hashedPassword } }, (err, data) => {
                                    // Check err
                                    return err
                                    ? reject(err)
                                    : resolve(data)
                                })
                            })                            
                        } else {
                            reject('Passwords are different')
                        } 
                    } else {
                        reject('The old and new passwords are the same')
                    }
                                       
                } else {
                    reject('Invalid password')
                }                
            } else {
                reject('Unauthorized')
            }
        })
    }

    // Method to get user info
    const info = req => {   
        return new Promise((resolve, reject) => {
            Models.user.findById(req.user._id)
            .populate({
                path: 'opinions',
                populate: {
                    path: 'beer',
                }
            })
            .populate({
                path: 'collections',
                populate: {
                    path: 'beers',
                }
            })
            .populate({
                path: 'favorites'
            })
            .exec((err, data) => {
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
        register,
        login,
        changePassword,
        info
    }
//