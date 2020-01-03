const express = require('express');
const fs = require('fs');
const soap = require('soap');
const verifier = require('./verifier');
const services = require('./services');

const xml = fs.readFileSync('./wsdl/ViranomaisPaluukanava.wsdl', 'utf8');

const app = express();

app.use((req, res, next) => {
    req.rawBody = '';
    req.setEncoding = 'utf8';

    req.on('data', (chunk) => {
        req.rawBody += chunk;
    });

    req.on('end', () => {
        next();
    });
});
app.listen(8080, () => {
    const server = soap.listen(app, '/paluukanava', services, xml, (() => {

    }));
    server.authorizeConnection = (req) => {
        // return true;
        return verifier.verifyXmlSignature(req.rawBody);
    };
});