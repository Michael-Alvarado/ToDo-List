const bootstrap = require('bootstrap');
const express = require('express');

app.use('/css', express.static(__dirname + '/node_modules/bootstrap/dist/css'));
