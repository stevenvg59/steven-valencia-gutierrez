const express = require('express');
const router = express.Router();

const pool = require('../dbConfig');

router.get('/', (req, res) => {
    res.render('index');
});

router.get('/register', (req, res) => {
    res.render('register');
});

router.get('/login', (req, res) => {
    res.render('login');
});

router.get('/dashboard', (req, res) => {
    res.render('dashboard', { user: 'Steven' });
});

module.exports = router;