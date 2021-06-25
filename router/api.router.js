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
        constructor({ passport }){
            this.router = express.Router();
            this.passport = passport;
        }

        routes(){
            // TODO: create service to send data
            
            // Define API route
            this.router.get('/', (req, res) => {
                // Rerturn JSON data
                return res.json( { msg: "Hello CESTMed API" } )
            })

            // Define API route to create on data
            this.router.post('/:endpoint', (req, res) => {
            // this.router.post('/:endpoint', this.passport.authenticate('jwt', { session: false }), (req, res) => {
                // Inject user _id in body author value
                // req.body.author = req.user._id;
                
                // Check if body contains required data
                const { ok, miss } = checkFields(Mandatory[req.params.endpoint], req.body)
                if (!ok) {
                    return sendApiErrorResponse(req, res, { miss }, 'Fields required')
                } else {
                    Controllers[req.params.endpoint].createOne(req, res)
                    .then( apiResponse => sendApiSuccessResponse(req, res, apiResponse, 'Request succeed'))
                    .catch( apiError => sendApiErrorResponse(req, res, apiError, 'Request failed'))
                }
            })

            // Define API route to get all data
            this.router.get('/:endpoint', (req, res) => {
                // User the controller to get data
                Controllers[req.params.endpoint].readAll()
                .then( apiResponse => sendApiSuccessResponse(req, res, apiResponse, 'Request succeed'))
                .catch( apiError => sendApiErrorResponse(req, res, apiError, 'Request failed'))
            })

            // Define API route to get one data
            this.router.get('/:endpoint/:id', (req, res) => {
                // User the controller to get data
                Controllers[req.params.endpoint].readOne(req)
                .then( apiResponse => sendApiSuccessResponse(req, res, apiResponse, 'Request succeed'))
                .catch( apiError => sendApiErrorResponse(req, res, apiError, 'Request failed'))
            })

            // Define API route to update one data
            this.router.put('/:endpoint/:id', (req, res) => {
                // req.body.author = req.user._id;
                // TODO: check body data
                // User the controller to get data
                Controllers[req.params.endpoint].updateOne(req)
                .then( apiResponse => sendApiSuccessResponse(req, res, apiResponse, 'Request succeed'))
                .catch( apiError => sendApiErrorResponse(req, res, apiError, 'Request failed'))
            })

            // Define API route to delete one data
            this.router.delete('/:endpoint/:id', (req, res) => {
                // req.body.author = req.user._id;
                // User the controller to get data
                // TODO: check id user can update
                Controllers[req.params.endpoint].deleteOne(req)
                .then( apiResponse => sendApiSuccessResponse(req, res, apiResponse, 'Request succeed'))
                .catch( apiError => sendApiErrorResponse(req, res, apiError, 'Request failed'))
            })

            this.router.patch('/:endpoint/:id', (req, res) => {
                // TODO: check body data
                Controllers[req.params.endpoint].patchOne(req)
                .then( apiResponse => sendApiSuccessResponse(req, res, apiResponse, 'Request succeed'))
                .catch( apiError => sendApiErrorResponse(req, res, apiError, 'Request failed'))
            })

            // Define API route to add beer in collection
            this.router.put('/collection/:id/:beerId', this.passport.authenticate('jwt', { session: false }), (req, res) => {
                req.body.author = req.user._id;
                // User the controller to get data
                // TODO: check id user can update
                Controllers.collection.addBeer(req)
                .then( apiResponse => sendApiSuccessResponse(req, res, apiResponse, 'Request succeed'))
                .catch( apiError => sendApiErrorResponse(req, res, apiError, 'Request failed'))
            })

            // Define API route to remove beer in collection
            this.router.delete('/collection/:id/:beerId', this.passport.authenticate('jwt', { session: false }), (req, res) => {
                req.body.author = req.user._id;
                // User the controller to get data
                // TODO: check id user can update
                Controllers.collection.addBeer(req)
                .then( apiResponse => sendApiSuccessResponse(req, res, apiResponse, 'Request succeed'))
                .catch( apiError => sendApiErrorResponse(req, res, apiError, 'Request failed'))
            })

            // Define API route to read random beer
            this.router.get('/beer/random/:limit', (req, res) => {
                Controllers.beer.getRandom(req)
                .then(apiResponse => sendApiSuccessResponse(req, res, apiResponse, 'Request succeed'))
                .catch(apiError => sendApiErrorResponse(req, res, apiError, 'Request failed'))
            })

            this.router.get('/collections/collection/mine', this.passport.authenticate('jwt', { session: false }), (req, res) => {
                Controllers.collection.readMyCollections(req)
                .then(apiResponse => sendApiSuccessResponse(req, res, apiResponse, 'Request succeed'))
                .catch(apiError => sendApiErrorResponse(req, res, apiError, 'Request failed'))
            })

            this.router.get('/collections/collection/shared', this.passport.authenticate('jwt', { session: false, failureRedirect: '/v1/collections/collection/shared/unauthenticated' }), (req, res) => {
                Controllers.collection.readSharedCollections(req)
                .then(apiResponse => sendApiSuccessResponse(req, res, apiResponse, 'Request succeed'))
                .catch(apiError => sendApiErrorResponse(req, res, apiError, 'Request failed'))
            })

            this.router.get('/collections/collection/shared/unauthenticated', (req, res) => {
                Controllers.collection.readSharedCollections(req, false)
                .then(apiResponse => sendApiSuccessResponse(req, res, apiResponse, 'Request succeed'))
                .catch(apiError => sendApiErrorResponse(req, res, apiError, 'Request failed'))
            })

            this.router.post('/collection/:id/addBeer/:beerId', this.passport.authenticate('jwt', { session: false }), (req, res) => {
                Controllers.collection.addBeer(req)
                .then(apiResponse => sendApiSuccessResponse(req, res, apiResponse, 'Request succeed'))
                .catch(apiError => sendApiErrorResponse(req, res, apiError, 'Request failed'))
            })

            this.router.delete('/collection/:id/removeBeer/:beerId', this.passport.authenticate('jwt', { session: false }), (req, res) => {
                Controllers.collection.removeBeer(req)
                .then(apiResponse => sendApiSuccessResponse(req, res, apiResponse, 'Request succeed'))
                .catch(apiError => sendApiErrorResponse(req, res, apiError, 'Request failed'))
            })

            this.router.get('/search/beers/:limit/:page/:name/:style/:country', (req, res) => {
                Controllers.beer.searchBeer(req)
                .then(apiResponse => sendApiSuccessResponse(req, res, apiResponse, 'Request succeed'))
                .catch(apiError => sendApiErrorResponse(req, res, apiError, 'Request failed'))
            })

            this.router.get('/search/breweries/:limit/:page/:name/:country', (req, res) => {
                Controllers.brewery.searchBrewery(req)
                .then(apiResponse => sendApiSuccessResponse(req, res, apiResponse, 'Request succeed'))
                .catch(apiError => sendApiErrorResponse(req, res, apiError, 'Request failed'))
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