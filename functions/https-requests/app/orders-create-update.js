'use strict';

const functions = require('firebase-functions');
const admin = require('firebase-admin');
const Promise = require('bluebird');

const Pedidos = require('../../models/orders');


module.exports = functions.https.onRequest((request, response) => {

    if (request.method === 'POST') {
        post(request, response);
    }
    else {
        response.status(405).json({error: 'Error 504'});
    }
});


const post = (request, response) => {

    Pedidos.create(request.get('cliente'), request.get('nombre'), request.get('valor'))
        .then(result => response.json(result))
        .catch(err => response.status(err.status || 502).json({
            error: err.error || '502 - Bad Gateway',
            message: err.message
        }));
};