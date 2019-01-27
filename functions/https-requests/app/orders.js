'use strict';

const functions = require('firebase-functions');
const admin = require('firebase-admin');
const Promise = require('bluebird');

const Pedidos = require('../../models/orders');


module.exports = functions.https.onRequest((request, response) => {

    if (request.method === 'GET') {
        get(request, response);
    }
    else {
        response.status(405).json({error: 'Error 504'});
    }
});


const get = (request, response) => {

    Pedidos.findAll()
        .then(data => {
            return Promise.map(data.docs, (pedidos) => {
                let pedidosData = pedidos.data();

                return {
                    producto: pedidosData.nombre,
                    cliente: pedidosData.cliente,
                    valor: pedidosData.valor
                };
            });
        })
        .then((data) => {
            response.json(data);
            return null;
        })
        .catch(err => {
            response.status(502).json({
                error: '502 - Bad Gateway',
                message: err.message
            });
        });
};