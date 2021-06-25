/* 
Imports
*/
    // Node
    const express = require('express');

    // Inner
    const Controllers = require('../controller/index');
    const Mandatory = require('../services/mandatory.service')
    const { checkFields } = require('../services/request.service');
    const { sendApiSuccessResponse, sendApiErrorResponse } = require('../services/response.service');
//

/* 
Defintiion
*/
    class RouterClass{
        constructor( { passport } ){
            this.router = express.Router();
            this.passport = passport
        }

        routes(){
            // Define API route to register user
            this.router.post('/register', (req, res) => {
                // Check if body contains required data
                const { ok, miss } = checkFields(Mandatory.register, req.body)
                if (!ok) {
                    return sendApiErrorResponse(req, res, { miss }, 'Fields required')
                } else {
                    Controllers.auth.register(req)
                    .then( apiResponse => sendApiSuccessResponse(req, res, apiResponse, 'Request succeed'))
                    .catch( apiError => sendApiErrorResponse(req, res, apiError, 'Request failed'))
                }
            })

            // Define API route to log user
            this.router.post('/login', (req, res) => {
                // Check if body contains required data
                const { ok, miss } = checkFields(Mandatory.login, req.body)
                if (!ok) {
                    return sendApiErrorResponse(req, res, { miss }, 'Fields required')
                } else {
                    Controllers.auth.login(req, res)
                    .then( apiResponse => sendApiSuccessResponse(req, res, apiResponse, 'Request succeed'))
                    .catch( apiError => sendApiErrorResponse(req, res, apiError, 'Request failed'))
                }
            })

            // Define API riute to logout user
            this.router.get('/logout', (req, res) => {
                req.logout();
                req.session = null;
                res.clearCookie(process.env.COOKIE_NAME);
                res.json({});
            })

            // Define AUTH route to get user info from JWT
            this.router.get('/me', this.passport.authenticate('jwt', { session: false, failureRedirect: '/v1/auth/unauth' }), (req, res) => {
                Controllers.auth.info(req)
                .then( apiResponse => sendApiSuccessResponse(req, res, apiResponse, 'Request succeed'))
                .catch( apiError => sendApiErrorResponse(req, res, apiError, 'Request failed'))
                // return sendApiSuccessResponse(req, res, req.user, 'Request succeed')
            })

            this.router.get('/unauth', (req, res) => {
                return sendApiSuccessResponse(req, res, {}, 'Unauthenticated', 'Unauthenticated')
            })

            this.router.post('/changePassword/:id', this.passport.authenticate('jwt', { session: false }), (req, res) => {
                // Check if body contains required data
                const { ok, miss } = checkFields(Mandatory.login, req.body)
                if (!ok) {
                    return sendApiErrorResponse(req, res, { miss }, 'Fields required')
                } else {
                    Controllers.auth.changePassword(req)
                    .then( apiResponse => sendApiSuccessResponse(req, res, apiResponse, 'Request succeed'))
                    .catch( apiError => sendApiErrorResponse(req, res, apiError, 'Request failed'))
                }
            })
        }

        init(){
            // Get route fonctions
            this.routes();

            // Sendback router
            return this.router;
        }
    }

//

/* 
Export
*/
    module.exports = RouterClass;
//