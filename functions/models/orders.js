'use strict';

const functions = require('firebase-functions');
const admin = require('firebase-admin');


// Instancia de la DB.
const db = admin.firestore();

// Modelo.
let Orders = {};


// Obtiene todos los datos.
Orders.findAll = () => {
    return db.collection('pedidos').get();
};

Orders.create = (params) => {

    const id = (Number.MAX_SAFE_INTEGER - Date.now()).toString(16);

    return db.collection('pedidos').doc(id)
        .create({
            cliente: params.cliente,
            nombre: params.nombre,
            valor: params.valor
        })
        .then(() => {
            return {id};
        });
};

module.exports = Orders;