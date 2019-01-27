'use strict';

const functions = require('firebase-functions');
const admin = require('firebase-admin');

admin.initializeApp();


// App
exports.appOrders = require('./https-requests/app/orders');
exports.appOrdersCU = require('./https-requests/app/orders-create-update');


exports.helloWorld = functions.https.onRequest((request, response) => {
    response.send("Hello from Firebase 2!");
});
